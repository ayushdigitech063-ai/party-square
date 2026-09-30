"use client";

import React from "react";

export interface TermsAndConditionsProps {
    number: number;
    title: string;
    content: React.ReactNode;
}
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const termsSections = [
  {
    number: 1,
    title: "User Eligibility",
    content: (
      <p>
        You must be at least <strong>18 years old</strong> to use this Platform
        or enter into a booking contract.
      </p>
    ),
  },

  {
    number: 2,
    title: "Nature of Services",
    content: (
      <p>
        DreamDeco provides celebration décor, surprise experiences, venue-based
        dinners, event setups, artists and personalized gifting services,
        either through in-house teams or trusted partners. Execution depends on
        venue feasibility, availability, and safety.
      </p>
    ),
  },

  {
    number: 3,
    title: "Communication Consent",
    content: (
      <p>
        You agree to receive transactional messages including calls, SMS,
        WhatsApp and email related to confirmations, coordination, reminders
        and feedback.
      </p>
    ),
  },

  {
    number: 4,
    title: "Intellectual Property",
    content: (
      <p>
        All photos, décor concepts, product descriptions, brand elements and
        content on the Platform belong to DreamDeco. Any reproduction, copying
        or commercial use without permission is prohibited.
      </p>
    ),
  },

  {
    number: 5,
    title: "Payments",
    content: (
      <p>
        Payments are processed via secure payment gateways. DreamDeco does not
        store card or UPI credentials.
      </p>
    ),
  },

  {
    number: 6,
    title: "Service-Specific Policies",
    content: (
      <p>
        Each experience may have specific cancellation and rescheduling
        policies listed on its product page. If the product-page policy differs
        from the general policy, the product-page policy applies.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#202020]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7e6] via-white to-[#fffaf1]">

        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff9f1c]/10" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#ffd95a]/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

          <div className="max-w-3xl">

            {/* Small label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff9f1c]" />

              <span className="text-sm font-semibold text-[#e98c00]">
                Legal & Information
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#171717] md:text-5xl lg:text-6xl">
              Terms &{" "}
              <span className="text-[#ff9718]">
                Conditions
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Please read these terms carefully before using DreamDeco,
              booking a service, or purchasing a celebration experience.
            </p>

            {/* Updated date */}
            <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#fff1d6] px-4 py-3 text-sm text-[#744600]">
              <span>Last Updated:</span>
              <strong>2026</strong>
            </div>
          </div>
        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">

        {/* Intro Card */}
        <div className="mb-8 rounded-3xl border border-[#f1e6d5] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0d1] text-lg">
              📋
            </div>

            <h2 className="text-xl font-bold text-[#222]">
              Agreement to Terms
            </h2>
          </div>

          <p className="text-[15px] leading-7 text-gray-600 md:text-base">
            These Terms and Conditions govern your access to and use of the
            DreamDeco Platform and the booking of celebration décor and
            experience services. By using the Platform or making a booking, you
            agree to these Terms.
          </p>
        </div>


        {/* ================= SECTIONS 1-6 ================= */}
        <div className="space-y-5">

          {termsSections.map((section) => (
            <section
              key={section.number}
              className="group rounded-3xl border border-[#eee5d8] bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffbd59] hover:shadow-[0_10px_30px_rgba(255,159,28,0.10)] md:p-8"
            >
              <div className="flex gap-4 md:gap-6">

                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0d2] text-sm font-extrabold text-[#ef8d00] md:h-12 md:w-12">
                    {section.number}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">

                  <h2 className="text-lg font-bold text-[#222] md:text-xl">
                    {section.title}
                  </h2>

                  <div className="mt-3 text-[15px] leading-7 text-gray-600 md:text-base">
                    {section.content}
                  </div>

                </div>
              </div>
            </section>
          ))}


          {/* ================= SECTION 7 ================= */}
          <section className="rounded-3xl border border-[#eee5d8] bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.035)] md:p-8">

            <div className="flex gap-4 md:gap-6">

              <div className="flex-shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0d2] text-sm font-extrabold text-[#ef8d00] md:h-12 md:w-12">
                  7
                </div>
              </div>

              <div className="min-w-0 flex-1">

                <h2 className="text-lg font-bold text-[#222] md:text-xl">
                  Generic Cancellation & Refund Policy
                </h2>

                <p className="mt-2 text-sm italic text-gray-500">
                  Where no custom policy applies
                </p>

                {/* Table */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#eadfce]">

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] border-collapse">

                      <thead>
                        <tr className="bg-[#ff9f1c] text-white">
                          <th className="px-5 py-4 text-left text-sm font-bold md:px-6">
                            Time Before Event
                          </th>

                          <th className="px-5 py-4 text-left text-sm font-bold md:px-6">
                            Refund Eligibility
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#eadfce]">

                        <tr className="bg-white">
                          <td className="px-5 py-4 text-sm text-gray-700 md:px-6">
                            More than 48 hours
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-[#e88b00] md:px-6">
                            90% refund
                          </td>
                        </tr>

                        <tr className="bg-[#fffaf2]">
                          <td className="px-5 py-4 text-sm text-gray-700 md:px-6">
                            24 to 48 hours
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-[#e88b00] md:px-6">
                            50% refund
                          </td>
                        </tr>

                        <tr className="bg-white">
                          <td className="px-5 py-4 text-sm text-gray-700 md:px-6">
                            Less than 24 hours
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-gray-700 md:px-6">
                            No refund
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="mt-5 rounded-2xl bg-[#fff8eb] p-4 text-sm leading-6 text-gray-600">
                  Non-refundable situations include personalized items,
                  confirmed venue reservations, and cases where the service
                  team is already dispatched.
                </div>

              </div>
            </div>
          </section>


          {/* ================= SECTION 8 ================= */}
          <TermsSection
            number={8}
            title="Return Policy"
            content={
              <p>
                All purchased items must be returned in their original packaging    
            and condition. DreamDeco reserves the right to refuse returns that
                are damaged, altered, or missing components. Return shipping costs
                are the responsibility of the customer unless otherwise specified.
              </p>
            }
          ></TermsSection>
    
          {/* ================= SECTION 9 ================= */}
          <TermsSection
            number={9}
            title="Rental Items (Stands, Frames, Lights, Neon Signs, Panels, Props)"
            content={
             <div>
             <p>
              Certain decor items are provided on a{" "}
              <strong>rental basis</strong>, including but not limited to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Stand frames</li>
              <li>Backdrops & decorative panels</li>
              <li>Neon or LED signage</li>
              <li>Professional lighting elements</li>
              <li>Easels, display structures, signage boards</li>
            </ul>

            <h3 className="mt-6 font-bold text-[#222]">
              Customer Responsibility:
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                The customer must <strong>safeguard</strong> these items during
                the event.
              </li>

              <li>
                Items must be returned to the pickup team in the{" "}
                <strong>same condition</strong>.
              </li>

              <li>
                The customer must <strong>confirm a pickup time</strong> within
                24 hours of service completion.
              </li>
            </ul>

            <p className="mt-5">
              If pickup is delayed beyond 24 hours, damaged, missing, or not
              returned:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                DreamDeco may raise an{" "}
                <strong>additional invoice</strong> for repair, replacement, or
                extended rental charges.
              </li>

              <li>
                The customer agrees to pay such charges upon receipt of the
                invoice.
              </li>
            </ul>

            </div>
            }
          >

          </TermsSection>


          {/* ================= SECTION 10 ================= */}
          <TermsSection
            number={10}
            title="Wall, Paint & Surface Disclaimer"
            content={
                <div>
                <p>
              Decorations often involve the use of tapes, hooks or adhesives.
              While we use industry-standard materials suitable for most walls:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>DreamDeco cannot guarantee zero impact</strong> on
                paint, wallpaper, textured surfaces, or previously weakened
                walls.
              </li>

              <li>
                Any peeling or damage caused due to{" "}
                <strong>existing surface fragility</strong> is not the
                responsibility of DreamDeco.
              </li>
            </ul>

            <div className="mt-5 rounded-2xl bg-[#fff8eb] p-4 text-sm text-gray-600">
              This statement is made in good faith and does not imply
              negligence.
            </div>
                </div>
            }
          >

          </TermsSection>


          {/* ================= SECTION 11 ================= */}
          <TermsSection
            number={11}
            title="Setup Lifespan Expectation"
            content={
                <div>
                    <p>
              Our experiences are designed to look their best{" "}
              <strong>during the event timeframe</strong>.
            </p>

            <p className="mt-3">
              Certain decorative materials may naturally change due to
              temperature, humidity, sunlight, wind, handling or environmental
              conditions.
            </p>
                </div>
            }
          >
          </TermsSection>


          {/* ================= SECTION 12 ================= */}
          <TermsSection
            number={12}
            title="Customer Responsibilities"
            content={
                <div>
                <p>
              Customers are responsible for providing accurate booking
              information and ensuring that the event location is accessible
              and suitable for the booked service.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Provide accurate contact and venue information.
              </li>

              <li>
                Ensure required permissions are obtained from the venue or
                property management.
              </li>

              <li>
                Follow reasonable safety instructions provided by the service
                team.
              </li>

              <li>
                Avoid moving or modifying installed décor without permission.
              </li>
            </ul>
            </div>
            }
          >
          </TermsSection>


          {/* ================= SECTION 13 ================= */}
          <TermsSection
            number={13}
            title="Misuse of Services & Content"
            content={
                <div>
                     <p>
              Customers may not misuse DreamDeco's services, content,
              photographs, designs, branding or platform functionality.
            </p>

            <p className="mt-3">
              Unauthorized reproduction, commercial use or misuse of the
              platform may result in appropriate legal action and recovery of
              associated business losses.
            </p>
                </div>
            }
          >
          </TermsSection>


          {/* ================= SECTION 14 ================= */}
          <TermsSection
            number={14}
            title="Liability Limitation"
            content={
                <div>
                    <p>
              In any circumstance, DreamDeco's maximum liability shall be
              limited to the{" "}
              <strong>
                portion of the service fee retained by DreamDeco
              </strong>{" "}
              after deducting vendor and material costs.
            </p>

            <p className="mt-3">
              DreamDeco is not liable for indirect, incidental, special,
              consequential, or punitive damages.
            </p>
                </div>
            }
          >
          </TermsSection>


          {/* ================= SECTION 15 ================= */}
          <TermsSection
            number={15}
            title="Dinner & Venue-Based Experience Disclaimer"
            content={
                <div><p>
              For candlelight dinners, private dining setups, restaurant
              bookings, resort experiences or any service conducted at a
              partner venue:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                The <strong>food and beverages</strong> are prepared, handled,
                and served directly by the respective venue.
              </li>

              <li>
                DreamDeco acts as a{" "}
                <strong>facilitator / booking coordinator</strong> and does not
                control kitchen, hygiene processes, ingredient sourcing, or
                service quality of the venue.
              </li>

              <li>
                <strong>DreamDeco shall not be held responsible for:</strong>

                <ul className="mt-3 list-[circle] space-y-2 pl-6">
                  <li>
                    Food allergies, reactions, infections, stomach illnesses,
                    or health concerns caused by food or beverages served.
                  </li>

                  <li>
                    Claims arising from service delays, staff behavior, or
                    table service quality at the venue.
                  </li>
                </ul>
              </li>
            </ul>

            <p className="mt-5">
              The customer agrees to raise all food and hospitality-related
              concerns directly with the venue management at the time of the
              experience.
            </p></div>
            }
          >

        
          </TermsSection>


          {/* ================= SECTION 16 ================= */}
          <TermsSection
            number={16}
            title="Indemnification"
            content={
                <div>
                  <p>
              The customer agrees to fully{" "}
              <strong>indemnify and hold harmless</strong> DreamDeco, its
              employees, service partners, vendors, decorators, artists, venue
              partners, and representatives from and against any claims,
              losses, liabilities, damages, complaints, legal actions, expenses
              or costs arising from:
            </p>

            <ol className="mt-4 list-decimal space-y-4 pl-6">
              <li>
                Any <strong>misconduct, misunderstanding, conflict, misbehavior
                or dispute</strong> between the customer or their guests and:
                
                <ul className="mt-3 list-[circle] space-y-2 pl-6">
                  <li>Venue staff</li>
                  <li>Partner restaurant/hotel staff</li>
                  <li>Decorators / Service crew</li>
                  <li>Artists / Performers</li>
                  <li>Delivery personnel or logistics partners</li>
                </ul>
              </li>

              <li>
                Any <strong>accident, injury, damage or loss</strong> that
                occurs due to:

                <ul className="mt-3 list-[circle] space-y-2 pl-6">
                  <li>
                    The venue environment, including unsafe floors, low
                    ceilings, slippery surfaces, electrical load conditions,
                    etc.
                  </li>

                  <li>
                    Customer-provided electrical sockets, wiring, switches,
                    open joints, wet walls, or overloading when connecting
                    lighting or décor equipment.
                  </li>

                  <li>
                    Handling, touching, moving, or altering décor elements
                    after installation.
                  </li>
                </ul>
              </li>

              <li>
                Any <strong>misuse or mishandling</strong> of:

                <ul className="mt-3 list-[circle] space-y-2 pl-6">
                  <li>Neon lights</li>
                  <li>Frames / stands / panels</li>
                  <li>Floral arrangements</li>
                  <li>Props or decorative installations</li>
                  <li>
                    Candles, diyas, pyrotechnics, confetti cannons, or open
                    flame elements, if applicable
                  </li>
                </ul>
              </li>

              <li>
                Any complaint or legal claim initiated by guests or third
                parties invited by the customer.
              </li>

              <li>
                Any <strong>damage to rental items</strong> while in customer
                custody.
              </li>

              <li>
                Any claims, fines, penalties, or charges imposed by a venue,
                RWA, hotel, apartment association or landlord due to event
                setup or gathering unless pre-approved in writing.
              </li>
            </ol>

            <div className="mt-6 rounded-2xl border border-[#ffd48a] bg-[#fff8e9] p-5">
              <p className="text-sm leading-6 text-gray-600">
                The customer understands that DreamDeco operates as a{" "}
                <strong>service coordinator</strong>, and certain aspects of
                the experience are delivered by independent partner entities
                who are responsible for their conduct and operational safety.
              </p>
            </div>
                </div>
            }
          >

          </TermsSection>


          {/* ================= SECTION 17 ================= */}
          <TermsSection
            number={17}
            title="Force Majeure"
            content={
                   <p>
              Delays or cancellations due to weather, government restrictions,
              accidents or emergencies are exempt from liability.
            </p>

            }
          >
          </TermsSection>


          {/* ================= SECTION 18 ================= */}
          <TermsSection
            number={18}
            title="Governing Law & Jurisdiction"
            content={
                <div>
                 <p>
              These Terms shall be governed by the laws of{" "}
              <strong>India</strong>.
            </p>

            <p className="mt-3 font-semibold text-[#222]">
              All disputes shall be subject exclusively to the jurisdiction of
              Courts in New Delhi, India.
            </p>
            </div>
            }
          >

          </TermsSection>


          {/* ================= SECTION 19 ================= */}
          <TermsSection
            number={19}
            title="Contact for Support"
            content={
                <div>
                <p className="mb-5">
              For assistance, concerns or clarifications, please contact us
              through the following channels:
            </p>

            <div className="grid gap-4 md:grid-cols-3">

              <ContactCard
                icon="✉️"
                label="Email"
                value="contact@dreamdeco.com"
              />

              <ContactCard
                icon="💬"
                label="WhatsApp"
                value="+91 8010679679"
              />

              <ContactCard
                icon="📞"
                label="Phone"
                value="+91 9828236069"
              />

            </div>
            </div>
            }
          >
          </TermsSection>


          {/* ================= FINAL NOTE ================= */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#ff9f1c] to-[#ffb52e] p-6 text-white shadow-[0_12px_35px_rgba(255,159,28,0.20)] md:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h3 className="text-xl font-bold">
                  Questions about these Terms?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Our support team is available to help with bookings,
                  cancellations and service-related questions.
                </p>
              </div>

              <a
                href="mailto:contact@dreamdeco.com"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#e98c00] transition hover:bg-[#fff8eb]"
              >
                Contact Support →
              </a>

            </div>
          </div>

        </div>
      </section>


      {/* ================= WHATSAPP ================= */}
      <a
        href="https://wa.me/918010679679"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition duration-300 hover:scale-110 md:bottom-7 md:right-7"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.88 11.88 0 005.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.43zM12.07 21.8h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.87 9.87 0 01-1.51-5.28C2.19 6.45 6.62 2.02 12.07 2.02c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.43 9.89-9.88 9.89zm5.43-7.4c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </a>

    </main>
  );
}


/* =========================================================
   REUSABLE TERMS SECTION
========================================================= */

function TermsSection({ number, title, content }: TermsAndConditionsProps) {
  return (
    <section className="group rounded-3xl border border-[#eee5d8] bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffbd59] hover:shadow-[0_10px_30px_rgba(255,159,28,0.10)] md:p-8">

      <div className="flex gap-4 md:gap-6">

        {/* Number */}
        <div className="flex-shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0d2] text-sm font-extrabold text-[#ef8d00] md:h-12 md:w-12">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <h2 className="text-lg font-bold text-[#222] md:text-xl">
            {title}
          </h2>

          <div className="mt-3 text-[15px] leading-7 text-gray-600 md:text-base">
            {content}
          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({ icon, label, value }: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-[#eee4d5] bg-[#fffaf2] p-4 transition hover:border-[#ffb84d]">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-[#333]">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}