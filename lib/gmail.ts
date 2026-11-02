"use client";

// User ki apni Gmail se email bhejna (browser se seedha Google ko).
// Screenshots hamare server par nahi jaate.

declare global {
  interface Window {
    google?: any;
  }
}

export const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.send";

export function getAccessToken(clientId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const g = window.google;
    if (!g?.accounts?.oauth2) {
      reject(new Error("Google abhi load nahi hua. Page refresh karke dobara koshish karein."));
      return;
    }
    const client = g.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: GMAIL_SCOPE,
      callback: (resp: any) => {
        if (resp?.error) reject(new Error("Google ne permission nahi di: " + resp.error));
        else if (!String(resp?.scope || "").includes(GMAIL_SCOPE))
          reject(new Error("Email bhejne ki permission par tick nahi lagaya gaya. Dobara koshish karein aur permission allow karein."));
        else resolve(resp.access_token);
      },
      error_callback: (err: any) =>
        reject(new Error(err?.type === "popup_closed" ? "Google ki window band ho gayi. Dobara koshish karein." : "Google se judne mein dikkat aayi.")),
    });
    client.requestAccessToken({ prompt: "consent" });
  });
}

function b64Utf8(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function wrap76(s: string) {
  return s.replace(/.{1,76}/g, "$&\r\n");
}

function encodeHeader(s: string) {
  return /^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64Utf8(s)}?=`;
}

async function fileToB64(file: Blob) {
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

export type Attachment = { name: string; type: string; blob: Blob };

export async function buildMime(opts: {
  to: string[];
  cc: string[];
  subject: string;
  body: string;
  attachments: Attachment[];
}) {
  const boundary = "arzi_" + Math.random().toString(36).slice(2);
  const parts: string[] = [];
  parts.push(
    `To: ${opts.to.join(", ")}`,
    ...(opts.cc.length ? [`Cc: ${opts.cc.join(", ")}`] : []),
    `Subject: ${encodeHeader(opts.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(b64Utf8(opts.body)),
  );
  for (const [i, a] of opts.attachments.entries()) {
    const ext = (a.name.match(/\.\w{2,4}$/) || [""])[0] || (a.type === "application/pdf" ? ".pdf" : ".jpg");
    const base = a.name.replace(/\.\w{2,4}$/, "");
    const safe = /^[\w.\- ]+$/.test(base) ? (base.replace(/\s+/g, "_") + ext) : `saboot-${i + 1}${ext}`;
    parts.push(
      `--${boundary}`,
      `Content-Type: ${a.type || "application/octet-stream"}; name="${safe}"`,
      `Content-Disposition: attachment; filename="${safe}"`,
      "Content-Transfer-Encoding: base64",
      "",
      wrap76(await fileToB64(a.blob)),
    );
  }
  parts.push(`--${boundary}--`, "");
  return parts.join("\r\n");
}

// MIME text pura ASCII hai (headers + base64 parts), isliye seedha btoa chal jaata hai
function toBase64Url(ascii: string) {
  return btoa(ascii).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendViaGmail(token: string, mime: string) {
  let res: Response;
  try {
    if (mime.length < 4_500_000) {
      // Chhoti email: JSON endpoint (browser se CORS ke saath sahi chalta hai)
      res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ raw: toBase64Url(mime) }),
      });
    } else {
      // Badi email: upload endpoint
      res = await fetch("https://www.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=multipart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/related; boundary=arzi_up" },
        body:
          "--arzi_up\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{}\r\n" +
          "--arzi_up\r\nContent-Type: message/rfc822\r\n\r\n" + mime + "\r\n--arzi_up--",
      });
    }
  } catch {
    throw new Error("Gmail tak connection nahi ho paaya. Internet check karke dobara 'भेजें' dabayein.");
  }
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gmail ne email nahi bheja (${res.status}). ${t.slice(0, 200)}`);
  }
  return (await res.json()) as { id: string; threadId: string };
}

// Badi photo ko chhota karna (1600px, JPEG), taaki email halki rahe
export async function shrinkImage(file: File): Promise<Attachment> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return { name: file.name, type: file.type, blob: file };
  }
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b || file), "image/jpeg", 0.85));
    if (blob.size >= file.size) return { name: file.name, type: file.type, blob: file };
    return { name: file.name.replace(/\.\w+$/, "") + ".jpg", type: "image/jpeg", blob };
  } catch {
    return { name: file.name, type: file.type, blob: file };
  }
}

export function gmailComposeUrl(to: string[], cc: string[], subject: string, body: string) {
  const p = new URLSearchParams({ view: "cm", fs: "1", to: to.join(","), cc: cc.join(","), su: subject, body });
  return `https://mail.google.com/mail/?${p.toString()}`;
}
