import { cookies } from "next/headers";
import { isLang, Lang } from "./i18n";

// Server components ke liye: cookie se bhasha
export async function getLang(): Promise<Lang> {
  try {
    const v = (await cookies()).get("lang")?.value;
    return isLang(v) ? v : "hi";
  } catch {
    return "hi";
  }
}
