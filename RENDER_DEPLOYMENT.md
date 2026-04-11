## 🚀 Deployment pe Render - Ghid Complet

### 📋 Checklist Înainte de Deploy

✅ **backend/server.js**: `__dirname` e definit corect  
✅ **package.json (root)**: Scripturi build și start configurate  
✅ **Backend/package.json**: Postinstall Prisma configurat  
✅ **Frontend/package.json**: Build script configurat  
✅ **.gitignore**: .env e ignorat  
✅ **.env nu e commituit pe GitHub** (sehr important!)  
✅ **render.yaml**: Creat cu configurația necesară

---

## 📝 Pași pentru Deploy pe Render

### 1. **Push codul pe GitHub**

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

⚠️ **Verifică** să nu fie .env commituit!

### 2. **Logare pe [render.com](https://render.com)**

- Create Account / Login
- Connect GitHub account

### 3. **Creează New Web Service**

- Click "New +" → "Web Service"
- Select repositoryul tău `MusicDNA`
- Name: `musicdna-backend`
- Runtime: **Node**
- Build Command: `npm run build`
- Start Command: `npm start`
- Plan: Free (sau Paid dacă vrei)

### 4. **Configurează Environment Variables** ⚠️ IMPORTANT

Adaugă variabilele în Render dashboard (NOT în .env file):

```
DATABASE_URL=mongodb+srv://...
GOOGLE_CLIENT_ID=356398658812-...
JWT_SECRET=supersecrekey123
HUGGINGFACE_API_KEY=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
SPOTIFY_CLIENT_ID=7e8244080bce41b29673b86bc3a945b7
SPOTIFY_CLIENT_SECRET=a8758325db2f4fbf851cc9d18234afb6
NODE_ENV=production
```

### 5. **Deploy**

- Click "Create Web Service"
- Render va:
  1. Clona repo-ul
  2. Rula `npm run build` (construiește Frontend + Backend)
  3. Rula `npm start` (pornește server-ul)
  4. Asigna URL: `https://musicdna-backend.onrender.com`

---

## ✔️ Ce se întâmplă la Deploy

1. **npm install** - instalează dependențe (root + Backend + Frontend)
2. **prisma generate** - generat Prisma client (postinstall)
3. **npm run build --prefix frontend** - construiește React app
4. **npm start** - pornește Express server pe port 8000
5. Express serve-ază Frontend la `/` și API la `/api/*`

---

## 🔍 Debugging pe Render

### Dacă ceva merge greșit:

1. Click pe serviciu → "Logs"
2. Caută eroare în output
3. Check Environment Variables
4. Check dacă MongoDB URL e corect

### Erori frecvente:

| Eroare                       | Soluție                                           |
| ---------------------------- | ------------------------------------------------- |
| `Cannot find module`         | Missing `npm install` - Check postinstall scripts |
| `__dirname is not defined`   | Fixed în server.js ✅                             |
| `CORS error`                 | Check `CLIENT_URL` în env vars                    |
| `MongoDB connection timeout` | Asigură IP whitelist pe MongoDB Atlas             |
| `Port already in use`        | Render asigna automat PORT - OK ✅                |

---

## 🌐 URLs după Deploy

- **Frontend**: `https://musicdna-backend.onrender.com/`
- **API**: `https://musicdna-backend.onrender.com/api/*`
- **Auth**: `https://musicdna-backend.onrender.com/api/auth/*`

Frontend va face requests la aceeași URL (same origin = zero CORS) ✅

---

## 💾 Important Notes

- **Free tier** pe Render hibernează după 15 min inactivitate (OK pentru testing)
- **Paid tier** e mereu activ
- Render auto-deploy pe fiecare push la GitHub (puteți disabla în settings)
- Fiecare deployment ia ~1-2 minute

---

## ✨ Status Check

După deployment, verifică:

```bash
# Din browser console:
fetch('https://musicdna-backend.onrender.com/api/music/search?query=test')
  .then(r => r.json())
  .then(d => console.log(d))
```

Dacă primești date - **e gata!** 🎉
