import Link from "next/link";

interface PrivacySection {
  number: number;
  title: string;
  content: React.ReactNode;
}

const privacySections: PrivacySection[] = [
  {
    number: 1,
    title: "Introduction",
    content: (
      <>
        <p>
          Infureka Technologies Private Limited, a company incorporated under
          the Companies Act, 2013 and having its registered office at{" "}
          <strong>Kirti Nagar, New Delhi – 110015</strong>, operating under
          the brand name <strong>“CherishX”</strong> (hereinafter referred to
          as the “Company”, “CherishX”, “we”, “us”, or “our”), is committed to
          protecting the personally identifiable information and sensitive
          personal data that we collect from you through our website, mobile
          applications, and related services.
        </p>

        <p>
          CherishX processes your data in accordance with applicable Indian
          data protection laws, including the Information Technology Act, 2000,
          the Information Technology (Reasonable Security Practices and
          Procedures and Sensitive Personal Data or Information) Rules, 2011,
          the Digital Personal Data Protection Act, 2023, and other applicable
          laws.
        </p>

        <p>
          This Privacy Policy explains how we collect, use, store, protect,
          and share your Personal Information.
        </p>
      </>
    ),
  },

  {
    number: 2,
    title: "Consent",
    content: (
      <>
        <p>
          By accessing the Platform, sharing your information, or using our
          services, you consent to the collection and use of your Personal
          Information in accordance with this Privacy Policy.
        </p>

        <p>
          If you disclose Personal Information of another individual, you
          represent that you have the authority to do so and that such
          individual consents to our use of their data under this Privacy
          Policy.
        </p>

        <p>
          If you do not agree with the terms of this Privacy Policy, please
          discontinue using our Platform.
        </p>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
          <p className="font-medium text-amber-900">
            Note: This Privacy Policy may be updated periodically without prior
            notice. Please review it periodically for any changes.
          </p>
        </div>
      </>
    ),
  },

  {
    number: 3,
    title: "Scope of This Policy",
    content: (
      <>
        <p>
          This Privacy Policy describes how CherishX collects, uses, stores,
          shares, and protects your information in the course of your use of
          the Platform and purchase of our services or products.
        </p>

        <p>
          The Policy does not cover third-party websites or social media links
          embedded on our Platform. We are not responsible for their privacy
          practices or content.
        </p>
      </>
    ),
  },

  {
    number: 4,
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-5">
          We may collect information in the following categories:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold text-stone-900">
              (a) Personal Information Provided by You
            </h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Name, email, phone number, gender, date of birth, address, and
                event preferences.
              </li>
              <li>
                Payment details, occasion type, special messages, and
                customisation notes.
              </li>
              <li>
                Account credentials such as username/password and communication
                preferences.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-stone-900">
              (b) Automatically Collected Information
            </h3>

            <p className="mb-3">
              When you use our Platform, we may collect data automatically
              through cookies, analytics, and device tracking.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Device type, IP address, browser details, OS version, network,
                location, and time zone.
              </li>
              <li>
                Website interaction data such as pages viewed, search queries,
                cart activity, and similar information.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-stone-900">
              (c) Transaction Information
            </h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Payment gateway details processed through secure third-party
                processors.
              </li>
              <li>
                Order history, cancellations, refunds, and feedback records.
              </li>
            </ul>

            <p className="mt-4">
              We do not store card numbers, CVV, or UPI IDs on our servers.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    number: 5,
    title: "Use of Collected Information",
    content: (
      <>
        <p className="mb-4">
          We use your Personal Information for purposes including:
        </p>

        <ul className="list-disc space-y-3 pl-6">
          <li>
            Processing bookings, orders, payments, and service fulfilment.
          </li>
          <li>
            Providing updates, reminders, and confirmations via email, WhatsApp,
            or SMS.
          </li>
          <li>Personalising content, offers, and experiences.</li>
          <li>Improving the performance and usability of our Platform.</li>
          <li>Responding to customer queries and support requests.</li>
          <li>
            Complying with legal obligations such as tax and recordkeeping
            requirements.
          </li>
        </ul>

        <p className="mt-5">
          If CherishX undergoes a merger, acquisition, or reorganization, your
          data may be transferred to the successor entity, subject to this same
          Privacy Policy.
        </p>
      </>
    ),
  },

  {
    number: 6,
    title: "Communications",
    content: (
      <>
        <p className="mb-4">
          You may receive communications regarding:
        </p>

        <ul className="list-disc space-y-3 pl-6">
          <li>Booking confirmations and updates.</li>
          <li>Payment or refund notifications.</li>
          <li>
            Promotional offers, newsletters, and surveys (optional).
          </li>
        </ul>

        <p className="mt-5">
          You can unsubscribe from marketing communications at any time by
          contacting our support team or using the unsubscribe link provided in
          our emails.
        </p>
      </>
    ),
  },

  {
    number: 7,
    title: "Security of Personal Information",
    content: (
      <>
        <p>
          CherishX takes reasonable measures to ensure that your Personal
          Information is protected from unauthorized access, modification,
          loss, or disclosure.
        </p>

        <p className="mt-5 mb-4">We use security measures including:</p>

        <ul className="list-disc space-y-3 pl-6">
          <li>Secure servers using HTTPS / SSL encryption.</li>
          <li>Limited employee access.</li>
          <li>Regular security audits.</li>
          <li>Strong password and data encryption protocols.</li>
        </ul>

        <p className="mt-5">
          While we follow reasonable security practices, no online system is
          entirely secure. Users are responsible for safeguarding their account
          credentials and logging out after use.
        </p>

        <p className="mt-4">
          We do not sell, rent, or lease your Personal Information to any third
          party.
        </p>
      </>
    ),
  },

  {
    number: 8,
    title: "Sharing of Personal Information",
    content: (
      <>
        <p className="mb-4">
          We may share your Personal Information with:
        </p>

        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <strong>Vendors and Service Partners</strong> who perform
            functions such as decoration setup, product delivery, venue
            management, photography, or courier services.
          </li>

          <li>
            <strong>Payment gateways and financial processors</strong> for
            secure transactions.
          </li>

          <li>
            <strong>Technology partners</strong> for analytics, marketing, and
            support operations.
          </li>

          <li>
            <strong>Government authorities</strong> when legally required.
          </li>
        </ol>

        <p className="mt-5">
          These entities are expected to maintain confidentiality and use your
          data only for the purposes defined.
        </p>
      </>
    ),
  },

  {
    number: 9,
    title: "Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          CherishX may use cookies, beacons, and analytics tools such as
          Google Analytics and similar technologies to enhance user experience
          and analyse site traffic.
        </p>

        <p className="mt-4">
          You can control cookie settings through your browser, although
          disabling cookies may affect certain Platform functionality.
        </p>
      </>
    ),
  },

  {
    number: 10,
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain your Personal Information only for as long as reasonably
          necessary for:
        </p>

        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>Providing services and resolving disputes.</li>
          <li>Complying with legal and financial recordkeeping.</li>
          <li>Retaining proof of consent and tax compliance.</li>
        </ul>

        <p className="mt-5">
          After the applicable retention period, data may be deleted or
          securely anonymized.
        </p>
      </>
    ),
  },

  {
    number: 11,
    title: "Access, Correction, and Deletion Rights",
    content: (
      <>
        <p>You may:</p>

        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>Request access to the Personal Information we hold.</li>
          <li>Request corrections or updates.</li>
          <li>Withdraw consent or request data deletion.</li>
        </ul>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
          <p>
            To submit a data access or deletion request, please contact our
            support team with the subject{" "}
            <strong>“Data Access Request”</strong>.
          </p>
        </div>

        <p className="mt-5">
          We may verify your identity before processing the request.
        </p>
      </>
    ),
  },

  {
    number: 12,
    title: "Use by Minors",
    content: (
      <>
        <p>
          Our Platform is intended for users aged 18 and above. We do not
          knowingly collect information from minors.
        </p>

        <p className="mt-4">
          If you believe that a minor's data has been shared with us, please
          contact us so that appropriate action can be taken.
        </p>
      </>
    ),
  },

  {
    number: 13,
    title: "Links to Other Sites",
    content: (
      <p>
        Our Platform may include links to third-party websites or social media
        pages. CherishX is not responsible for the content, security, or
        privacy practices of such websites.
      </p>
    ),
  },

  {
    number: 14,
    title: "Advertisements",
    content: (
      <p>
        We may use trusted advertising networks to display advertisements.
        These networks may use non-identifiable information to provide relevant
        advertisements. Such information does not include directly identifying
        details such as your name, email address, or phone number unless
        otherwise permitted by applicable law.
      </p>
    ),
  },

  {
    number: 15,
    title: "International Transfers",
    content: (
      <p>
        In limited cases, data may be processed or stored on servers outside
        India. Where applicable, such transfers will be subject to appropriate
        contractual, organizational, and technical safeguards.
      </p>
    ),
  },

  {
    number: 16,
    title: "Grievance Officer",
    content: (
      <>
        <p className="mb-5">
          For questions, complaints, or to exercise your data rights, please
          contact:
        </p>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
          <p className="font-bold text-stone-900">
            Grievance Officer
          </p>

          <p className="mt-2">
            Customer Operations &amp; Support Head – CherishX
          </p>

          <div className="mt-4 space-y-2">
            <p>📍 Infureka Technologies Pvt. Ltd., Kirti Nagar, New Delhi – 110015</p>
            <p>
              ✉️{" "}
              <a
                href="mailto:contact@cherishx.com"
                className="font-semibold text-amber-700 transition hover:text-amber-900"
              >
                contact@cherishx.com
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href="tel:+918081833833"
                className="font-semibold text-amber-700 transition hover:text-amber-900"
              >
                +91 8081833833
              </a>
            </p>
          </div>

          <p className="mt-5">
            We aim to acknowledge your query within 48 hours and work toward
            resolving it within a reasonable period.
          </p>
        </div>
      </>
    ),
  },

  {
    number: 17,
    title: "Amendments to This Policy",
    content: (
      <>
        <p>
          CherishX reserves the right to modify this Privacy Policy at any
          time. Updates will be posted on this page with the revised
          “Last Updated” date.
        </p>

        <p className="mt-4">
          Continued use of the Platform after changes are posted signifies
          acceptance of the updated Privacy Policy, to the extent permitted by
          applicable law.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-white px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Main Privacy Policy Card */}
        <section className="overflow-hidden rounded-3xl border border-amber-200/80 bg-white/95 shadow-[0_10px_40px_rgba(120,80,20,0.08)] backdrop-blur">

          {/* Header */}
          <div className="border-b border-amber-200/70 bg-gradient-to-r from-amber-100/90 via-amber-50/90 to-orange-50/80 px-6 py-10 text-center md:px-12 md:py-14">

            <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-amber-300/80 bg-white/70 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm">
              Privacy &amp; Data Protection
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
              Your privacy matters to us. This policy explains how we collect,
              use, protect, and manage your information when you use our
              platform and services.
            </p>

            {/* Last Updated */}
            <div className="mx-auto mt-7 inline-flex rounded-full border border-amber-200 bg-white/80 px-5 py-2.5 text-sm text-stone-700 shadow-sm">
              <span className="font-semibold text-stone-900">
                Last Updated:
              </span>
              <span className="ml-2">October 2026</span>
            </div>
          </div>

          {/* Important Notice */}
          <div className="px-6 pt-8 md:px-12 md:pt-10">
            <div className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-5 md:p-6">
              <p className="text-sm leading-7 text-stone-700 md:text-base">
                <span className="font-bold text-amber-900">
                  Important:
                </span>{" "}
                This Privacy Policy forms an integral part of the Terms &amp;
                Conditions, Payment &amp; Refund Policy, and all other policies,
                disclaimers, or terms available on the website.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="px-6 py-8 md:px-12 md:py-12 lg:px-16">

            <div className="space-y-8">
              {privacySections.map((section) => (
                <article
                  key={section.number}
                  className="group rounded-3xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/30 p-6 transition-all duration-300 hover:border-amber-200 hover:shadow-[0_8px_30px_rgba(120,80,20,0.06)] md:p-8"
                >
                  {/* Section heading */}
                  <div className="mb-5 flex items-start gap-4">

                    {/* Number */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100/80 text-sm font-bold text-amber-800">
                      {section.number}
                    </div>

                    {/* Title */}
                    <div className="pt-1">
                      <h2 className="text-xl font-bold tracking-tight text-stone-900 md:text-2xl">
                        {section.title}
                      </h2>

                      <div className="mt-2 h-1 w-12 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-20" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 text-[15px] leading-7 text-stone-600 md:text-base">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-orange-50/50 px-6 py-8 md:px-12">
            <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

              <div>
                <h3 className="font-semibold text-stone-900">
                  Have questions about our policies?
                </h3>

                <p className="mt-1 text-sm text-stone-600">
                  Please contact our support team for assistance.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">

                <Link
                  href="/terms-and-condition"
                  className="rounded-xl border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                  Terms &amp; Conditions
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
                >
                  Contact Us
                </Link>

              </div>
            </div>
          </div>

        </section>

        {/* Footer note */}
        <p className="px-4 py-8 text-center text-xs leading-5 text-stone-500">
          By using our Platform, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </div>
    </main>
  );
}