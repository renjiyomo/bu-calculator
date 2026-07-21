// ========================================
// BUeño Calculator — Download Page
// Android APK download & installation guide
// ========================================

import { useState } from 'react';
import {
  Smartphone,
  Download,
  WifiOff,
  Zap,
  HardDrive,
  ChevronDown,
  ChevronUp,
  Shield,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

// ── Config ──────────────────────────────────────────────────────────────────
// Replace this URL with the direct GitHub Releases APK download link
// after you build and upload your APK (see docs/android-build-guide.md).
const APK_DOWNLOAD_URL = 'https://github.com/renjiyomo/bu-calculator/releases/download/v1.0.0/app-release-signed.apk'; // e.g. 'https://github.com/yourusername/bu-calculator/releases/latest/download/bueno-calculator.apk'
const APK_VERSION = '1.0.0';
const APK_SIZE_MB = '~2.17 MB';
const GITHUB_RELEASES_URL = 'https://github.com/renjiyomo/bu-calculator/releases/tag/v1.0.0'; // Replace with your repo URL

const isApkReady = APK_DOWNLOAD_URL !== 'https://github.com/renjiyomo/bu-calculator/releases/download/v1.0.0/app-release-signed.apk';

// ── Feature Cards Data ───────────────────────────────────────────────────────
const features = [
  {
    icon: WifiOff,
    title: 'Works 100% Offline',
    description:
      'No internet required after installation. Compute your GWA anytime, anywhere — even with no signal or mobile data.',
    color: 'text-forest-600 dark:text-sage-400',
    bg: 'bg-forest-50 dark:bg-forest-900/30',
    border: 'border-forest-100 dark:border-forest-700',
  },
  {
    icon: Zap,
    title: 'Fast & Lightweight',
    description:
      `Only ${APK_SIZE_MB}. Installs in seconds and launches instantly. No heavy frameworks, no bloat.`,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-100 dark:border-amber-700',
  },
  {
    icon: HardDrive,
    title: 'Auto-Saves Your Data',
    description:
      'All your subjects, semesters, and custom rules are saved locally on your device. Your data is never sent to any server.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-100 dark:border-blue-700',
  },
];

// ── Installation Steps Data ──────────────────────────────────────────────────
const installSteps = [
  {
    number: 1,
    title: 'Download the APK',
    description:
      'Tap the "Download APK" button above. Your browser will download a file named bueno-calculator.apk to your phone\'s Downloads folder.',
    tip: 'Make sure you have at least 10 MB of free storage.',
  },
  {
    number: 2,
    title: 'Open the Downloaded File',
    description:
      'Open your phone\'s file manager or notification drawer and tap the downloaded APK file to begin installation.',
    tip: 'On most Android phones, you can find it at: Files → Downloads → bueno-calculator.apk',
  },
  {
    number: 3,
    title: 'Allow Installation from Unknown Sources',
    description:
      'Android may show a security prompt since this APK is not from the Play Store. Tap "Settings" → enable "Install from this source" → go back and tap "Install".',
    tip: 'This is safe to do. You can disable it again after installation. This app contains the exact same code as the website.',
  },
  {
    number: 4,
    title: 'Install and Open',
    description:
      'Tap "Install" and wait a few seconds. Once done, tap "Open" — or find the BUeño Calculator icon on your home screen or app drawer.',
    tip: 'The app icon looks exactly like the one on the website.',
  },
];

// ── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'Is this APK safe to install?',
    answer:
      'Yes. This APK is the exact same code as the website you are using right now — just packaged as an Android app using Google\'s official PWA-to-Android technology (Trusted Web Activity). No additional code or trackers are added. The source code is publicly available on GitHub.',
  },
  {
    question: 'Does the app need internet to work?',
    answer:
      'No. The app is fully offline after the first launch. All calculator logic runs on your device. Your data (subjects, semesters, custom rules) is saved locally using your phone\'s storage — no server required.',
  },
  {
    question: 'How do I update the app when a new version is released?',
    answer:
      'Simply come back to this Download page, download the new APK, and install it over your existing installation. Your data will be preserved. We\'ll always post new versions on this page and on GitHub Releases.',
  },
  {
    question: 'Will this drain my battery or use mobile data?',
    answer:
      'No. The app runs entirely offline with no background processes, no push notifications, and no network activity. It uses as little battery as a simple offline calculator.',
  },
  {
    question: 'Can I still use the website on my browser?',
    answer:
      'Yes! The website and the app are completely independent. You can use both. Note that data saved on the website (in your browser) is separate from data saved in the app (on your phone\'s storage).',
  },
  {
    question: 'Why is this not on the Google Play Store?',
    answer:
      'The Google Play Store requires a one-time $25 registration fee. To keep everything free and accessible to all Bicolano students, we distribute the APK directly from GitHub. You can install it safely in under a minute.',
  },
];

// ── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-charcoal-100 dark:border-charcoal-700 rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-charcoal-800 hover:bg-cream-50 dark:hover:bg-charcoal-750 transition-colors duration-150"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-100 pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 text-charcoal-400 dark:text-charcoal-500">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-cream-50 dark:bg-charcoal-900/40 border-t border-charcoal-100 dark:border-charcoal-700 animate-slide-down">
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export function DownloadPage() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Page Header ── */}
      <div>
        <h2 className="text-xl font-bold text-charcoal-800 dark:text-charcoal-50">
          Download for Android
        </h2>
        <p className="text-sm text-charcoal-400 dark:text-charcoal-500 mt-1">
          Take BUeño Calculator offline — install the app directly on your Android device.
        </p>
      </div>

      {/* ── Hero Card ── */}
      <div className="card border-forest-100 dark:border-forest-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* App Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-forest-50 dark:bg-forest-900/40 border border-forest-100 dark:border-forest-800 flex items-center justify-center">
            <img
              src="/favicon/favicon.svg"
              alt="BUeño Calculator App Icon"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-charcoal-800 dark:text-charcoal-50">
                BUeño Calculator
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 text-2xs font-semibold rounded-sm bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-700">
                v{APK_VERSION}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 text-2xs font-medium rounded-sm bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-500 dark:text-charcoal-400 border border-charcoal-200 dark:border-charcoal-600">
                {APK_SIZE_MB}
              </span>
            </div>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-snug">
              Bicol University GWA Calculator · Android APK · Offline
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              <span className="flex items-center gap-1 text-2xs text-charcoal-400 dark:text-charcoal-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-500 dark:text-sage-400" />
                No internet required
              </span>
              <span className="flex items-center gap-1 text-2xs text-charcoal-400 dark:text-charcoal-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-500 dark:text-sage-400" />
                No account needed
              </span>
              <span className="flex items-center gap-1 text-2xs text-charcoal-400 dark:text-charcoal-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-500 dark:text-sage-400" />
                100% free, always
              </span>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0 w-full sm:w-auto">
            {isApkReady ? (
              <a
                href={APK_DOWNLOAD_URL}
                download
                id="btn-download-apk"
                className="btn-primary gap-2 w-full sm:w-auto justify-center px-6 py-2.5 text-sm"
              >
                <Download className="w-4 h-4" />
                Download APK
              </a>
            ) : (
              <button
                disabled
                id="btn-download-apk-coming-soon"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-charcoal-100 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 text-sm font-medium rounded-sm cursor-not-allowed w-full sm:w-auto border border-charcoal-200 dark:border-charcoal-600"
              >
                <Download className="w-4 h-4" />
                Coming Soon
              </button>
            )}
            <a
              href={GITHUB_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="link-github-releases"
              className="flex items-center gap-1 text-2xs text-charcoal-400 dark:text-charcoal-500 hover:text-forest-600 dark:hover:text-sage-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View all releases on GitHub
            </a>
          </div>
        </div>

        {/* Coming soon notice */}
        {!isApkReady && (
          <div className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              <strong>APK coming soon.</strong> The Android app is being built using the PWA + TWA method. 
              In the meantime, you can{' '}
              <strong>install this website as an app</strong> directly from Chrome:{' '}
              tap the ⋮ menu → "Add to Home screen" — it works fully offline too!
            </p>
          </div>
        )}
      </div>

      {/* ── Feature Cards ── */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal-600 dark:text-charcoal-300 mb-3 uppercase tracking-wide text-xs">
          Why use the app?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`card ${feature.bg} ${feature.border} !bg-opacity-50`}
              >
                <div className={`w-8 h-8 rounded-sm ${feature.bg} border ${feature.border} flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${feature.color}`} />
                </div>
                <h4 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-100 mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-charcoal-400 dark:text-charcoal-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Installation Guide ── */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal-600 dark:text-charcoal-300 mb-3 uppercase tracking-wide text-xs">
          How to install
        </h3>
        <div className="card space-y-0 !p-0 overflow-hidden">
          {installSteps.map((step, index) => (
            <div
              key={step.number}
              className={`flex gap-4 px-5 py-4 ${
                index !== installSteps.length - 1
                  ? 'border-b border-charcoal-100 dark:border-charcoal-700'
                  : ''
              }`}
            >
              {/* Step Number */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-700 dark:bg-sage-700 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-100 mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed mb-2">
                  {step.description}
                </p>
                <div className="flex items-start gap-1.5 text-xs text-charcoal-400 dark:text-charcoal-500">
                  <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-sage-500 dark:text-sage-400" />
                  <span className="italic">{step.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PWA Alternative ── */}
      <div className="card bg-sage-50 dark:bg-sage-900/20 border-sage-100 dark:border-sage-800 !bg-opacity-60">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-sage-100 dark:bg-sage-800/50 border border-sage-200 dark:border-sage-700 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-100 mb-1">
              No APK? Install from Chrome instead
            </h4>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed mb-3">
              You can also install this website directly as an app from your Chrome browser — no APK download needed. It works offline too!
            </p>
            <ol className="space-y-1.5">
              {[
                'Open this website in Chrome on your Android phone',
                'Tap the ⋮ (three-dot menu) in the top-right corner',
                'Tap "Add to Home screen" or "Install app"',
                'Tap "Install" to confirm',
                'Find BUeño Calculator on your home screen!',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-charcoal-500 dark:text-charcoal-400">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sage-200 dark:bg-sage-800 text-sage-700 dark:text-sage-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* ── Updates Section ── */}
      <div className="card">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-charcoal-50 dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-600 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-charcoal-500 dark:text-charcoal-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-100 mb-1">
              How updates work
            </h4>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
              When a new version is available, it will appear on this page and on our{' '}
              <a
                href={GITHUB_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-600 dark:text-sage-400 hover:underline font-medium"
              >
                GitHub Releases
              </a>
              . Simply download the new APK and install it over the existing one — your data is always preserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal-600 dark:text-charcoal-300 mb-3 uppercase tracking-wide text-xs">
          Frequently asked questions
        </h3>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* ── Footer Note ── */}
      <div className="pb-4">
        <p className="text-[10px] text-charcoal-300 dark:text-charcoal-600 text-center leading-relaxed">
          BUeño Calculator is an independent, open-source project and is not officially affiliated with or endorsed by Bicol University.
          Results are for reference only. Always verify with the official university registrar.
        </p>
      </div>

    </div>
  );
}
