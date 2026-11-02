# Arzinawees: website live karne ka tareeka

Ye code poori website hai. Ise live karne ke liye neeche ke accounts **aapke naam par** banane honge.
Har account banane ke baad jo "key" milegi, use hosting (Vercel/Netlify) ke **Environment Variables** mein daalna hai.
Saari keys ke naam `.env.example` file mein hain.

---

## 1. Domain (zaroori)
- GoDaddy / Hostinger / BigRock se **arzinawees.in** lein (aur ho sake to arzinawees.com, arzinavees.in).

## 2. Code GitHub par daalein
1. github.com par free account banayein.
2. Naya repository banayein: `arzinawees` (Private).
3. Is folder ki saari files usme upload karein ("Add file → Upload files").

## 3. Hosting: Vercel (free)
1. vercel.com par GitHub se login karein.
2. "Add New → Project" → `arzinawees` repository chunein → **Deploy**.
3. Project → Settings → **Domains** → `arzinawees.in` jodein. Vercel jo DNS record bataye, wahi apne domain provider (GoDaddy aadi) mein daalein.
4. Project → Settings → **Environment Variables** mein neeche ki keys daalein. Har baar keys badalne ke baad **Redeploy** karein.

> Website bina kisi key ke bhi khul jaayegi. AI ke bina complaint template se banegi, aur Google key ke bina "khud bhejein" wala option chalega.

## 4. AI key (Anthropic / Claude)
1. console.anthropic.com par account banayein, billing mein thode paise daalein.
2. **API Keys → Create Key**.
3. Vercel mein: `ANTHROPIC_API_KEY` = wo key. `ANTHROPIC_MODEL` = `claude-haiku-5-5` (sasta aur tez).
4. Billing mein **monthly limit** zaroor lagayein, taaki kharcha kabhi hadd se na badhe.

## 5. Database
Netlify par website chalne par cases apne aap **Netlify Blobs** mein save hote hain. Koi setup nahi chahiye.
Neeche ka Supabase sirf tab chahiye jab aap baad mein bada database chahein (vaikalpik).

### Supabase (vaikalpik)
1. supabase.com par account → **New project** (region: Mumbai).
2. Left menu **SQL Editor** → is folder ki `supabase/schema.sql` file ka poora text paste karke **Run**.
3. Project Settings → **API**:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = **service_role** key (ye secret hai, kabhi kisi ko na dein)
4. `ADMIN_PASSWORD` = koi lamba password (kam se kam 10 akshar). Admin panel: `arzinawees.in/admin`

## 6. Google se Gmail bhejna (sabse zaroori feature)
1. console.cloud.google.com → naya project "Arzinawees".
2. **APIs & Services → Library → Gmail API → Enable**.
3. **OAuth consent screen**:
   - User type: **External**
   - App name: Arzinawees, support email, logo
   - App domain: `https://arzinawees.in`, privacy: `https://arzinawees.in/privacy`, terms: `https://arzinawees.in/terms`
   - Authorized domain: `arzinawees.in`
   - Scopes: sirf **`https://www.googleapis.com/auth/gmail.send`**
   - Test users: apna aur 2-3 doston ka Gmail (testing ke liye)
4. **Credentials → Create credentials → OAuth client ID → Web application**
   - Authorized JavaScript origins: `https://arzinawees.in` (aur testing ke liye Vercel ka `https://....vercel.app`)
5. Jo **Client ID** mile, use Vercel mein `NEXT_PUBLIC_GOOGLE_CLIENT_ID` mein daalein → Redeploy.
6. Testing mode mein sirf "Test users" (100 tak) bhej sakte hain. Sabke liye kholne ke liye:
   - OAuth consent screen → **Publish app** → **Verification** ke liye apply karein.
   - Google maangega: verified domain (Google Search Console mein arzinawees.in verify karein), privacy policy, aur ek chhota YouTube video (unlisted) jisme dikhe: form bharna → "Google se jodein" → permission screen → email bhejna.
   - gmail.send "sensitive" scope hai: verification free hai, security audit nahi lagta. Kuch din se kuch hafte lag sakte hain.

## 7. Launch se pehle checklist
- [ ] `lib/lenders.ts` mein top 15 loan apps ke **grievance email** jodein, har ek ko company ki official website se verify karke.
- [ ] Privacy policy aur Terms **vakil se jaanch** karwayein (`app/privacy`, `app/terms`).
- [ ] Apne Gmail se ek poori test complaint khud ko bhej kar dekhein (To mein apna hi email daal kar "कोई और ऐप" option se).
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` mein apni support email daalein.
- [ ] Google Search Console mein site jodein (search mein aane ke liye).

## Website ke hisse
| Page | Kaam |
|---|---|
| `/` | Home |
| `/shikayat` | 5 kadam ka form → AI complaint → Gmail se bhejna |
| `/status` | Arzi number + mobile se status |
| `/haq` | Borrower ke haq |
| `/faq`, `/privacy`, `/terms` | Jaankari |
| `/admin` | Saare cases, status badalna, notes, kaunsi company/number sabse zyada |

## Suraksha ke niyam (code mein pehle se)
- Screenshots server par nahi jaate. Browser se seedha user ki Gmail mein attach hote hain.
- Google token save nahi hota, email bhejte hi revoke ho jaata hai.
- Aadhaar/PAN/card number AI ko jaane se pehle hata diye jaate hain.
- AI aur form par rate limit hai.
- Database Row Level Security ke saath, sirf server padh sakta hai.
