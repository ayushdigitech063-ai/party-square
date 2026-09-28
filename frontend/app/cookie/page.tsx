"use client";

import { useState } from "react";

type CookieCategory = {
  id: string;
  title: string;
  description: string;
  required?: boolean;
};

const cookieCategories: CookieCategory[] = [
  {
    id: "necessary",
    title: "Strictly Necessary Cookies",
    description:
      "These cookies are essential for the website to function properly. They help with security, session management, navigation, and other basic website features.",
    required: true,
  },
  {
    id: "preferences",
    title: "Preference Cookies",
    description:
      "These cookies remember your choices and preferences, such as language, location, and other settings, to provide a more personalized experience.",
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description:
      "These cookies help us understand how visitors use our website, including which pages are visited and how users interact with different features.",
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "These cookies may be used to understand your interests and provide more relevant advertisements, offers, and promotional communications.",
  },
];

export default function CookieSettingsPage() {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleCookie = (id: string) => {
    if (id === "necessary") return;

    setCookieSettings((previous) => ({
      ...previous,
      [id]: !previous[id as keyof typeof previous],
    }));
  };

  const acceptAll = () => {
    setCookieSettings({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectOptional = () => {
    setCookieSettings({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  const saveSettings = () => {
    // Add your cookie-storage/API logic here.
    localStorage.setItem("cookie preference", JSON.stringify(cookieSettings));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 5000);
    console.log("Cookie settings saved:", cookieSettings);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <section className="overflow-hidden rounded-3xl border border-amber-200/80 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-amber-100 bg-gradient-to-r from-amber-100/90 to-amber-50/90 px-6 py-10 text-center md:px-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300 bg-white text-2xl shadow-sm">
              🍪
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Cookie Settings
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              Manage how cookies and similar technologies are used when you
              visit our website. You can choose which optional cookies you would
              like to allow.
            </p>

            <p className="mt-3 text-sm font-medium text-amber-700">
              Last Updated: October 2026
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 md:px-12 md:py-12">
            {/* Introduction */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                1. What Are Cookies?
              </h2>

              <p className="leading-7 text-gray-600">
                Cookies are small text files stored on your device when you
                visit a website. They help websites remember information about
                your visit, improve functionality, understand how the website is
                being used, and provide a better experience.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                We may use cookies, pixels, local storage, and similar
                technologies to operate and improve our platform.
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="mb-10">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                  2. Manage Your Cookie Preferences
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  You can control which optional cookie categories you allow.
                  Strictly necessary cookies cannot be disabled because they are
                  required for essential website functionality.
                </p>
              </div>

              <div className="space-y-5">
                {cookieCategories.map((cookie) => {
                  const enabled =
                    cookieSettings[cookie.id as keyof typeof cookieSettings];

                  return (
                    <div
                      key={cookie.id}
                      className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 transition-all duration-200 hover:border-amber-300 hover:bg-amber-50/70 md:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        {/* Text */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-gray-900 md:text-lg">
                              {cookie.title}
                            </h3>

                            {cookie.required && (
                              <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                                Always Active
                              </span>
                            )}
                          </div>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                            {cookie.description}
                          </p>
                        </div>

                        {/* Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleCookie(cookie.id)}
                          disabled={cookie.required}
                          aria-label={`Toggle ${cookie.title}`}
                          aria-pressed={enabled}
                          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
                            enabled ? "bg-amber-500" : "bg-gray-300"
                          } ${
                            cookie.required
                              ? "cursor-not-allowed opacity-80"
                              : "cursor-pointer"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              enabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-10">
              <h2 className="mb-5 text-xl font-bold text-gray-900 md:text-2xl">
                3. How We Use Cookies
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    ⚙️
                  </div>

                  <h3 className="font-bold text-gray-900">
                    Website Functionality
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    We use necessary cookies to keep essential website functions
                    working properly.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    📊
                  </div>

                  <h3 className="font-bold text-gray-900">Website Analytics</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Analytics cookies help us understand website usage and
                    improve our services.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    ✨
                  </div>

                  <h3 className="font-bold text-gray-900">Personalization</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Preference cookies allow us to remember certain choices and
                    provide a more personalized experience.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    🎯
                  </div>

                  <h3 className="font-bold text-gray-900">
                    Relevant Communications
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Marketing cookies may help us provide more relevant
                    promotional content and offers.
                  </p>
                </div>
              </div>
            </div>

            {/* Third Party Cookies */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                4. Third-Party Cookies
              </h2>

              <p className="leading-7 text-gray-600">
                Some cookies may be placed by third-party services that we use
                for analytics, payments, marketing, customer support, or other
                website functionality. These third parties may process
                information according to their own privacy policies.
              </p>
            </div>

            {/* Browser Controls */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                5. Browser Cookie Controls
              </h2>

              <p className="leading-7 text-gray-600">
                You can also manage or delete cookies through your browser
                settings. Please note that disabling certain cookies may affect
                some features or functionality of the website.
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-100/80 to-yellow-50 p-6 md:p-8">
              <h2 className="text-lg font-bold text-gray-900 md:text-xl">
                Your Privacy Matters
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-700 md:text-base">
                We use information collected through cookies in accordance with
                our Privacy Policy. You can review our Privacy Policy to learn
                more about how we collect, use, store, and protect your
                information.
              </p>
            </div>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)]">
              <div className="relative flex items-start gap-4 rounded-2xl border border-amber-300 bg-white p-5 shadow-2xl">
                {/* Success Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-base font-bold text-white shadow-sm">
                  ✓
                </div>

                {/* Message */}
                <div className="pr-5">
                  <p className="font-semibold text-gray-900">
                    Cookie preferences saved
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    Your cookie preferences have been successfully updated.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSaved(false)}
                  className="absolute right-4 top-4 text-lg leading-none text-gray-400 transition hover:text-gray-700"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="border-t border-amber-100 bg-amber-50/50 px-6 py-6 md:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                You can change your cookie preferences at any time.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-xl border border-amber-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-amber-50"
                >
                  Reject Optional
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
                >
                  Accept All
                </button>

                <button
                  type="button"
                  onClick={saveSettings}
                  className="rounded-xl border border-amber-500 bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-200"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs leading-6 text-gray-500">
            By continuing to use our website, you acknowledge the use of cookies
            as described in our Cookie Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
