// Simple per-IP limit (ek server instance ke andar). Badhne par Upstash/Redis lagayein.
const hits = new Map<string, number[]>();

export function allow(ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(ip, list);
    return false;
  }
  list.push(now);
  hits.set(ip, list);
  return true;
}

export function ipOf(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
}
