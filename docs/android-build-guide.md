# BUeño Calculator — Android APK Build Guide

> **💰 Total cost: ₱0 / $0.** Every tool used here is free and open source.  
> **Platform:** Windows (the machine you are developing on right now)  
> **Estimated time:** 1–2 hours on first setup, ~10 minutes for subsequent builds

---

## Overview

This guide converts your deployed BUeño Calculator PWA into a signed Android APK using:

- **[Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)** — Google's official tool to wrap PWAs into Android apps using Trusted Web Activity (TWA)
- **[Adoptium JDK 17](https://adoptium.net/)** — Free, open-source Java runtime required by the Android build tools
- **[GitHub Releases](https://github.com)** — Free APK hosting with direct download links

---

## Part 1: Prerequisites (Do This Once)

### Step 1.1 — Verify Node.js is Installed

Open PowerShell and run:

```powershell
node --version
npm --version
```

Expected output (your version may differ, 18+ is fine):
```
v20.11.0
10.2.4
```

If Node.js is not installed: download from [nodejs.org](https://nodejs.org) (LTS version, free).

---

### Step 1.2 — Install Java JDK 17 (Free)

Bubblewrap requires Java 17 or newer.

1. Go to **[adoptium.net](https://adoptium.net/temurin/releases/?version=17)**
2. Download **Temurin 17 LTS** → Windows → x64 → `.msi` installer
3. Run the installer with default settings
4. ✅ During installation, check **"Set JAVA_HOME variable"** — this is important!

Verify in a **new** PowerShell window:
```powershell
java -version
```

Expected output:
```
openjdk version "17.0.x" ...
OpenJDK 64-Bit Server VM (build 17.0.x+xx, mixed mode, sharing)
```

> **Troubleshooting:** If `java` is not found after installing, manually set `JAVA_HOME`:
> 1. Search "Environment Variables" in Windows Start menu
> 2. Under "System Variables", click "New"
> 3. Variable name: `JAVA_HOME`
> 4. Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x.x-hotspot` (check the actual path in Program Files)
> 5. Edit the `Path` variable → Add `%JAVA_HOME%\bin`
> 6. Open a **new** PowerShell window and try `java -version` again

---

### Step 1.3 — Install Bubblewrap CLI (Free)

```powershell
npm install -g @bubblewrap/cli
```

Verify:
```powershell
bubblewrap --version
```

Expected output:
```
1.x.x
```

---

### Step 1.4 — Deploy Your PWA First

> ⚠️ **IMPORTANT:** Bubblewrap needs your **live deployed URL**, not `localhost`. The PWA must already be deployed and accessible.

If using Vercel (free):
1. Push your latest code to GitHub: `git push origin main`
2. Vercel auto-deploys. Wait ~1 minute.
3. Verify your site is live at `https://bueno-calculator.vercel.app/`
4. Open Chrome → visit your site → open DevTools (F12) → **Application** tab
5. Click **Manifest** → Confirm it shows "Installable" with ✅ green checkmarks

---

## Part 2: Initialize the TWA Project (Do This Once)

### Step 2.1 — Create a New Directory for the APK Build

> Do NOT put this inside your `bu-calculator` project folder. Create it alongside it.

```powershell
# Navigate to your projects root (wherever bu-calculator is)
cd C:\Users\marke\.gemini\antigravity-ide\scratch

# Create a new directory for the Android build
mkdir bueno-twa
cd bueno-twa
```

---

### Step 2.2 — Initialize Bubblewrap

Run this command (it reads your live manifest automatically):

```powershell
bubblewrap init --manifest="https://bueno-calculator.vercel.app/favicon/site.webmanifest"
```

**What happens next:** Bubblewrap will ask you a series of questions. Here are the **exact answers** to enter:

| Prompt | Your Answer |
|--------|------------|
| `Application name` | `BUeño Calculator` |
| `Short name` | `BUeño Calc` |
| `Package name (e.g. com.example.app)` | `app.vercel.bueno_calculator.twa` |
| `Web app start URL` | `https://bueno-calculator.vercel.app/` |
| `Host` | `bueno-calculator.vercel.app` |
| `Launcher icon source` | *(press Enter to use default from manifest)* |
| `Maskable icon source` | *(press Enter to use default from manifest)* |
| `Splash screen color` | `#FAF9F6` |
| `Splash screen dark mode color` | `#141414` |
| `Status bar color` | `#1F4A1F` |
| `Navigation bar color` | `#FAF9F6` |
| `Navigation bar dark mode color` | `#141414` |
| `Display mode` | `standalone` |
| `Orientation` | `portrait` |
| `Enable notifications` | `No` |
| `Enable location delegation` | `No` |
| `Signing key path` | *(press Enter for default: `./android.keystore`)* |
| `Key alias` | `bueno-key` |
| `Store password` | *(choose a password and remember it! e.g. `buenocalc2024`)* |
| `Key password` | *(same password as above)* |

> **⚠️ SAVE YOUR PASSWORDS.** Write them down. If you lose them, you cannot update the APK with the same signing key.

**On first run**, Bubblewrap will automatically download:
- Android SDK command-line tools (~100MB)
- Gradle build system

This takes 5–15 minutes depending on your internet speed. Let it finish.

---

### Step 2.3 — Review the Generated Files

After `bubblewrap init` completes, your `bueno-twa` folder should contain:

```
bueno-twa/
├── android.keystore          ← Your signing key (keep this safe!)
├── twa-manifest.json         ← TWA configuration file
├── app/
│   ├── build.gradle
│   ├── src/
│   │   └── main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   │           └── values/
│   │               └── strings.xml
├── build.gradle
├── gradle/
└── settings.gradle
```

---

## Part 3: Build the APK

### Step 3.1 — Build

```powershell
# Make sure you are inside the bueno-twa directory
cd C:\Users\marke\.gemini\antigravity-ide\scratch\bueno-twa

bubblewrap build
```

**What this does:**
- Compiles the TWA Android project
- Signs the APK with your keystore
- Outputs the final APK file

**Expected output (last few lines):**
```
✔ Build successful!
Build output: app-release-signed.apk
```

**How long it takes:** 3–8 minutes on first build (downloads Gradle dependencies). Subsequent builds: ~1 minute.

---

### Step 3.2 — Find Your APK

```powershell
# Find the generated APK
ls *.apk
# or
dir *.apk
```

You should see: `app-release-signed.apk` (approximately 3–6 MB)

---

## Part 4: Test the APK on Your Phone

### Step 4.1 — Transfer the APK to Your Phone

Choose any of these free methods:

**Option A — Google Drive (Easiest)**
1. Upload `app-release-signed.apk` to Google Drive
2. Open Google Drive on your phone → download the file

**Option B — USB Cable**
1. Connect your phone to your PC via USB
2. Select "File Transfer" on your phone
3. Copy the APK to your phone's Downloads folder

**Option C — Email to Yourself**
1. Email `app-release-signed.apk` to your own email
2. Open on your phone and download the attachment

---

### Step 4.2 — Install the APK on Your Phone

1. Open your phone's **Files** or **File Manager** app
2. Navigate to **Downloads** → tap `app-release-signed.apk`
3. If prompted: tap **Settings** → enable **"Install from unknown sources"** for your file manager app
4. Go back → tap **Install** → wait 10–30 seconds
5. Tap **Open**

**✅ Success indicators:**
- App opens and shows BUeño Calculator exactly like the website
- App icon appears on your home screen/app drawer
- ~~Chrome address bar~~ is **hidden** (shows as a native app, not a browser)

---

### Step 4.3 — Test Offline Mode

1. Open the BUeño Calculator app
2. Turn on **Airplane Mode** on your phone (swipe down → Airplane Mode)
3. Use the app — add subjects, compute GWA, switch between views
4. **Everything should work with no internet** ✅

---

## Part 5: Get Your SHA-256 Fingerprint (For Digital Asset Links)

This step is needed so Android hides Chrome's address bar inside the app (makes it look truly native).

### Step 5.1 — Extract the Fingerprint

```powershell
# Run from inside the bueno-twa directory
cd C:\Users\marke\.gemini\antigravity-ide\scratch\bueno-twa

# Windows PowerShell (using Java's keytool)
keytool -list -v -keystore android.keystore -alias bueno-key
# Enter your keystore password when prompted
```

Look for the line that says:
```
SHA256: AB:CD:EF:12:34:56:... (64 hex characters separated by colons)
```

Copy the entire SHA256 fingerprint.

---

### Step 5.2 — Update assetlinks.json

Open this file in your BUeño Calculator project:

`bu-calculator/public/.well-known/assetlinks.json`

Replace `REPLACE_WITH_YOUR_SHA256_FINGERPRINT_AFTER_BUILDING_APK` with your actual fingerprint.

The final file should look like:
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "app.vercel.bueno_calculator.twa",
      "sha256_cert_fingerprints": [
        "AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78"
      ]
    }
  }
]
```

Commit and push to GitHub → Vercel will redeploy automatically.

Verify it's live at: `https://bueno-calculator.vercel.app/.well-known/assetlinks.json`

---

## Part 6: Host the APK on GitHub Releases (Free)

### Step 6.1 — Create a GitHub Release

1. Go to your GitHub repository (e.g., `https://github.com/yourusername/bu-calculator`)
2. Click **"Releases"** on the right sidebar (or go to the "Releases" tab)
3. Click **"Create a new release"** or **"Draft a new release"**
4. Fill in:
   - **Tag version:** `v1.0.0`
   - **Release title:** `BUeño Calculator v1.0.0 — Initial Android Release`
   - **Description:**
     ```
     ## What's New
     - First Android release!
     - Full offline support (works without internet after install)
     - Same features as the website: Semester Honors, Latin Honors, Custom Rules
     
     ## Installation
     1. Download `bueno-calculator.apk` below
     2. Open the file on your Android phone
     3. Enable "Install from unknown sources" if prompted
     4. Tap Install
     
     ⚡ Size: ~4.5 MB | Android 7.0+ required
     ```
5. Under **"Assets"**, drag and drop your `app-release-signed.apk` file
   - Rename it to `bueno-calculator.apk` before uploading (easier name for users)
6. Click **"Publish release"**

---

### Step 6.2 — Get the Direct Download URL

After publishing, right-click the APK in the "Assets" section → "Copy link address".

It will look like:
```
https://github.com/yourusername/bu-calculator/releases/download/v1.0.0/bueno-calculator.apk
```

---

### Step 6.3 — Update the Download Button URL

Open this file:

`bu-calculator/src/components/download/DownloadPage.tsx`

Find line (near the top):
```ts
const APK_DOWNLOAD_URL = '#'; // e.g. 'https://github.com/...'
```

Replace with your real URL:
```ts
const APK_DOWNLOAD_URL = 'https://github.com/yourusername/bu-calculator/releases/download/v1.0.0/bueno-calculator.apk';
const GITHUB_RELEASES_URL = 'https://github.com/yourusername/bu-calculator/releases';
```

Also update `APK_SIZE_MB` with the actual file size if different.

---

### Step 6.4 — Commit and Deploy

```powershell
cd C:\Users\marke\.gemini\antigravity-ide\scratch\bu-calculator

git add .
git commit -m "feat: add download page and PWA offline support"
git push origin main
```

Vercel auto-deploys within 1–2 minutes. Your download button is now live! 🎉

---

## Part 7: Updating the APK in the Future

When you make changes to the website and want to release a new APK version:

### Step 7.1 — Rebuild the APK

```powershell
cd C:\Users\marke\.gemini\antigravity-ide\scratch\bueno-twa
bubblewrap build
```

No re-initialization needed. Your keystore and config are saved.

### Step 7.2 — Create a New GitHub Release

Same as Part 6, but use a new tag (e.g., `v1.1.0`) and upload the new APK.

### Step 7.3 — Update the URL in DownloadPage.tsx

Update `APK_DOWNLOAD_URL` and `APK_VERSION` constants → push to GitHub → Vercel deploys automatically.

---

## Troubleshooting

### ❌ `bubblewrap: command not found`
- Close PowerShell and open a new window
- Try: `npx @bubblewrap/cli --version`
- If that works, use `npx @bubblewrap/cli init` instead of `bubblewrap init`

### ❌ `JAVA_HOME is not set`
- Follow Step 1.2 troubleshooting section above
- Make sure to open a **new** PowerShell window after setting environment variables

### ❌ `Manifest could not be fetched` during init
- Your site might not be deployed yet, or the manifest URL is wrong
- Verify: `https://bueno-calculator.vercel.app/favicon/site.webmanifest` opens in your browser
- Check that the manifest contains all required fields (id, name, icons, start_url)

### ❌ Build fails with Gradle errors
- Run: `bubblewrap build --verbose` to see detailed error messages
- Common fix: delete the `build/` and `.gradle/` folders and retry

### ❌ APK installs but shows address bar in the app
- The `assetlinks.json` is not set up correctly (Part 5)
- Verify the file is accessible at: `https://bueno-calculator.vercel.app/.well-known/assetlinks.json`
- The SHA256 fingerprint must match your keystore exactly

### ❌ App shows "Your connection is not private" warning
- Your deployed site must use **HTTPS** (Vercel provides this automatically for free)
- Never test TWA against HTTP URLs

---

## Quick Reference Summary

```
STEP 1  Install: JDK 17 (adoptium.net) + bubblewrap (npm install -g @bubblewrap/cli)
STEP 2  mkdir bueno-twa && cd bueno-twa
STEP 3  bubblewrap init --manifest="https://bueno-calculator.vercel.app/favicon/site.webmanifest"
STEP 4  bubblewrap build  →  app-release-signed.apk
STEP 5  Test on phone (transfer APK, install, test offline)
STEP 6  keytool → get SHA256 → update assetlinks.json
STEP 7  GitHub Releases → upload APK → copy download URL
STEP 8  Update APK_DOWNLOAD_URL in DownloadPage.tsx → git push
STEP 9  Done! Share the download page with your classmates 🎉
```

---

*Guide version: 1.0 | Created for BUeño Calculator | All tools used are free and open-source.*
