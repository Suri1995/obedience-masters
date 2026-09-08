"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Check, Copy, Printer } from "lucide-react";

export const policySections = [
  { id: "interpretation", label: "Interpretation and Definitions" },
  { id: "collection", label: "Collecting Personal Information" },
  { id: "cookies", label: "Tracking Technologies and Cookies" },
  { id: "use", label: "Use of Your Personal Data" },
  { id: "sms", label: "Text Messages Privacy Notice" },
  { id: "retention", label: "Retention of Your Personal Data" },
  { id: "transfer", label: "Transfer of Your Personal Data" },
  { id: "rights", label: "Your Data Rights" },
  { id: "disclosure", label: "Disclosure of Your Personal Data" },
  { id: "security", label: "Security of Your Personal Data" },
  { id: "children", label: "Children's and Minors' Privacy" },
  { id: "changes", label: "Changes to this Privacy Policy" },
  { id: "contact", label: "Contact Us" },
];

export function PrivacyPolicyClient() {
  const [activeId, setActiveId] = useState(policySections[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    policySections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
      <aside className="top-28 hidden w-64 shrink-0 lg:sticky lg:block">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">On this page</p>
        <nav aria-label="Privacy policy sections" className="flex flex-col gap-1 border-l border-black/10">
          {policySections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`-ml-px border-l-2 px-4 py-2 text-sm leading-5 transition-colors ${activeId === section.id ? "border-yellow-dark font-semibold text-black" : "border-transparent text-ink-muted hover:border-yellow hover:text-black"}`}
            >
              {section.label}
            </a>
          ))}
        </nav>
        <div className="mt-8 flex gap-2">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold transition hover:border-black/30" aria-label="Print this privacy policy">
            <Printer size={14} /> Print
          </button>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold transition hover:border-black/30" aria-label="Copy privacy policy link">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Share"}
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor="policy-sections">Jump to a section</label>
        <select id="policy-sections" value={activeId} onChange={(event) => { setActiveId(event.target.value); document.getElementById(event.target.value)?.scrollIntoView({ behavior: "smooth" }); }} className="mb-8 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold lg:hidden">
          {policySections.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}
        </select>

        <article className="policy-copy rounded-[2rem] border border-black/10 bg-white px-5 py-8 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.4)] sm:px-10 sm:py-12 lg:px-14">
          <section id="interpretation" className="policy-section">
            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <dl className="definition-grid">
              <div><dt>Account</dt><dd>means a unique account created for You to access Our Service or parts of Our Service.</dd></div>
              <div><dt>Affiliate</dt><dd>means an entity that controls, is controlled by, or is under common control with a party, where control means ownership of 50% or more of the shares, equity interest or other securities entitled to vote.</dd></div>
              <div><dt>Company</dt><dd>referred to as the Company, We, Us or Our, means obediencemasters.</dd></div>
              <div><dt>Cookies</dt><dd>are small files placed on Your computer, mobile device or other device by a website, containing details of Your browsing history on that website.</dd></div>
              <div><dt>Country/State</dt><dd>refers to Telangana, India.</dd></div>
              <div><dt>Device</dt><dd>means any device that can access the Service, such as a computer, cell phone or digital tablet.</dd></div>
              <div><dt>Personal Data</dt><dd>is any information that relates to an identified or identifiable individual. We use Personal Data and Personal Information interchangeably unless a law uses a specific term.</dd></div>
              <div><dt>Service</dt><dd>refers to the Website.</dd></div>
              <div><dt>Service Provider</dt><dd>means any person or entity who processes data on behalf of the Company to facilitate, provide, or analyze the Service.</dd></div>
              <div><dt>Usage Data</dt><dd>refers to data collected automatically from use of the Service or its infrastructure.</dd></div>
              <div><dt>User</dt><dd>means any individual who accesses or uses the Service.</dd></div>
              <div><dt>Website</dt><dd>refers to obediencemasters, accessible from https://www.obediencemasters.com/.</dd></div>
              <div><dt>You</dt><dd>means the individual accessing or using the Service, or the company or legal entity on whose behalf they do so.</dd></div>
            </dl>
          </section>

          <section id="collection" className="policy-section"><h2>Collecting and Using Your Personal Information</h2><h3>Types of Data Collected</h3><h3>Personal Data</h3><p>While using Our Service, We may ask You to provide personally identifiable information that can be used to contact or identify You. This may include:</p><ul><li>Email address</li></ul><h3>Usage Data</h3><p>Usage Data is collected automatically when using the Service. It may include Your Device's IP address, browser type and version, pages visited, the time and date of Your visit, time spent on pages, unique device identifiers and other diagnostic data.</p><p>When You access the Service through a mobile device, We may collect the type of mobile device, its unique ID, IP address, operating system, mobile browser type, unique device identifiers and other diagnostic data. We may also collect information Your browser sends whenever You visit Our Service.</p></section>

          <section id="cookies" className="policy-section"><h2>Tracking Technologies and Cookies</h2><p>We use tracking technologies such as cookies to track activity and improve Our Service.</p><div className="policy-callout"><h3>Cookie categories</h3><ul><li><strong>Necessary / Essential Cookies:</strong> Session cookies administered by Us to authenticate users, prevent fraudulent use and provide requested services.</li><li><strong>Cookies Policy / Notice Acceptance Cookies:</strong> Persistent cookies that record whether users have accepted cookie use and their consent choices.</li><li><strong>Functionality Cookies:</strong> Persistent cookies that remember choices such as account login details or language preference.</li></ul></div><p>Where required by law, We use non-essential cookies only with Your consent. You may withdraw or change consent through Our cookie preferences tool, if available, or your browser/device settings.</p></section>

          <section id="use" className="policy-section"><h2>Use of Your Personal Data</h2><p>The Company may use Personal Data:</p><ul><li>To provide and maintain Our Service, including monitoring usage.</li><li>To manage Your Account and provide registered-user functionality.</li><li>For the performance of a contract for products, items or services purchased through the Service.</li><li>To contact You by email, telephone, SMS or equivalent electronic communication about updates, services and security.</li><li>To provide news and special offers where permitted by applicable law, until You opt out.</li><li>To manage Your requests and support needs.</li><li>For business transfers, including mergers, restructuring or sale of assets.</li><li>For analysis, usage trends, campaign effectiveness and improving Our Service and Your experience.</li></ul><p>We may share Your Personal Data with Service Providers, in business transfers, with Affiliates, with other users where public areas are offered, and with Your consent.</p></section>

          <section id="sms" className="policy-section"><h2>Text Messages Privacy Notice</h2><p>You may opt in to receive text messages from Us. If You do, We collect and store information such as Your phone number, date and method of consent, and message delivery and read information.</p><p><strong>No mobile information will be shared with or sold to third parties or affiliates for marketing or promotional purposes.</strong> Phone numbers and consent records are never shared except with Service Providers that technically handle message delivery.</p><p>Messages may relate to customer care, account notifications, delivery updates, authentication, security alerts and marketing offers. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for support. Message and data rates may apply.</p></section>

          <section id="retention" className="policy-section"><h2>Retention of Your Personal Data</h2><p>The Company retains Your Personal Data only as long as necessary for the purposes in this Privacy Policy, legal obligations, dispute resolution and enforcement of agreements.</p><p>Where possible, We apply shorter retention periods and reduce identifiability by deleting, aggregating or anonymizing data. Maximum periods include:</p><ul><li><strong>User Accounts:</strong> duration of the Account relationship plus up to 24 months after closure.</li><li><strong>Support tickets and correspondence:</strong> up to 24 months after ticket closure.</li><li><strong>Chat transcripts:</strong> up to 24 months for quality assurance and staff training.</li><li><strong>Website analytics data and server logs:</strong> up to 24 months from collection.</li></ul><p>Data may be retained longer for legal obligations, legal claims, an explicit request or technical backup limitations. When periods expire, We securely delete, retain encrypted backup copies for a limited period or anonymize data.</p></section>

          <section id="transfer" className="policy-section"><h2>Transfer of Your Personal Data</h2><p>Your information may be processed at the Company's operating offices and other locations where processors are located. This may involve transfers outside Your state, province, country or jurisdiction where data protection laws differ.</p><p>Where required by law, We ensure international transfers are subject to appropriate safeguards and supplementary measures. We take reasonable steps to ensure Your data is treated securely and in accordance with this Privacy Policy.</p></section>

          <section id="rights" className="policy-section"><h2>Delete Your Personal Data</h2><p>You have the right to delete or request assistance deleting Personal Data We have collected about You. Where available, You may update, amend or delete information through Your Account settings. You may also contact Us to request access to, correction or deletion of Personal Data.</p><p>We may need to retain certain information when We have a legal obligation or lawful basis to do so.</p></section>

          <section id="disclosure" className="policy-section"><h2>Disclosure of Your Personal Data</h2><h3>Business Transactions</h3><p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before it becomes subject to a different Privacy Policy.</p><h3>Law Enforcement</h3><p>We may disclose Your Personal Data when required by law or in response to valid requests by public authorities.</p><h3>Other Legal Requirements</h3><p>We may disclose Your Personal Data in good faith when necessary to comply with a legal obligation, protect Company rights or property, prevent wrongdoing, protect Users or the public, or protect against legal liability.</p></section>

          <section id="security" className="policy-section"><h2>Security of Your Personal Data</h2><p>The security of Your Personal Data is important to Us. However, no method of transmission over the Internet or electronic storage is 100% secure. While We use commercially reasonable means to protect Your Personal Data, We cannot guarantee absolute security.</p><h3>Detailed Information on Processing</h3><p>Service Providers may access Your Personal Data. These vendors collect, store, use, process and transfer information about Your activity in accordance with their own Privacy Policies.</p><h3>Google Places</h3><p>Google Places returns information about places using HTTP requests and may collect information from You and Your Device for security. Its information is handled according to the <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</p></section>

          <section id="children" className="policy-section"><h2>Children's and Minors' Privacy</h2><p>The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under 16. If You believe a child has provided Personal Information, please contact Us. Where applicable law sets a higher age for consent, We may require parental or guardian consent.</p><h3>Links to Other Websites</h3><p>Our Service may contain links to websites not operated by Us. We strongly advise reviewing each third party's Privacy Policy. We have no control over and assume no responsibility for their content, policies or practices.</p></section>

          <section id="changes" className="policy-section"><h2>Changes to this Privacy Policy</h2><p>We may update this Privacy Policy from time to time by posting the new policy on this page. We will let You know by email and/or a prominent notice before changes become effective and update the Last updated date.</p><p>You are advised to review this Privacy Policy periodically. Changes are effective when posted on this page.</p></section>

          <section id="contact" className="policy-section"><h2>Contact Us</h2><p>If You have questions about this Privacy Policy, contact Us:</p><ul><li>By email: <a href="mailto:obediencemasters@gmail.com">obediencemasters@gmail.com</a></li><li>By visiting: <a href="https://www.obediencemasters.com/" target="_blank" rel="noreferrer">https://www.obediencemasters.com/</a></li></ul></section>
        </article>

        <a href="#top" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-black transition hover:text-yellow-dark"><ArrowUp size={16} /> Back to top</a>
      </div>
    </div>
  );
}

export default PrivacyPolicyClient;
