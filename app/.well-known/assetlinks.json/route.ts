// Android app (TWA) ko verify karne ke liye Digital Asset Links.
// Ye file URL par seedha JSON deni chahiye: /.well-known/assetlinks.json
// Agar apk ki signing key badle to neeche ka fingerprint bhi badalna hoga.
export const dynamic = "force-static";

const LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "in.arzinawees.app",
      sha256_cert_fingerprints: [
        "2C:CD:0E:63:BC:C5:93:5F:25:20:4F:9E:81:74:A6:FA:1D:C2:15:7D:3D:7D:73:99:D0:D5:B9:6E:7C:0A:9F:99",
      ],
    },
  },
];

export function GET() {
  return new Response(JSON.stringify(LINKS, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
}
