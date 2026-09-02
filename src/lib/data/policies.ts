/** Customer-facing legal policies, transcribed from the master text in
 *  addons/Policies.docx. The internal pre-publication checklist that
 *  follows the policies in the source document is intentionally NOT included —
 *  it is marked "not part of the customer-facing terms". */

export interface PolicySection {
  heading: string;
  clauses: string[];
}

export interface Policy {
  slug: string;
  title: string;
  /** Short label for nav/footer where the full title is too long. */
  shortTitle: string;
  lastUpdated: string;
  /** One-line summary for the legal index and metadata description. */
  summary: string;
  sections: PolicySection[];
}

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    shortTitle: "Terms",
    lastUpdated: "31 August 2026",
    summary:
      "The contract that governs purchases from and use of velusim.com and the travel eSIM services sold by COMPANY NAME LTD.",
    sections: [
      {
        heading: "About Velusim and these Terms",
        clauses: [
          "These Terms & Conditions govern purchases from and use of velusim.com (the Website) and the travel eSIM services sold by COMPANY NAME LTD (Velusim, we, us or our). COMPANY NAME LTD is a company registered under company number COMPANY NUMBER. Our registered office is COMPANY ADDRESS. Contact us at support@velusim.com.",
          "COMPANY NAME LTD sells eSIMs in its own name and is your contractual seller. We use telecommunications infrastructure and technical contractors to deliver the service, but this does not transfer our obligations as seller to you or remove rights you have against us.",
          "An eSIM is a digital SIM profile installed on a compatible device. A Plan is the prepaid package of mobile data, calls and SMS described in your order. Installation means successfully downloading the eSIM profile to your device. Activation means the start of the Plan's validity period, which occurs on successful installation. A Top-up is a separately purchased addition to an eligible existing Plan or eSIM.",
          "These Terms should be read with our Refund & Cancellation Policy, Digital Delivery & Activation Policy and Acceptable Use & Fair Usage Policy. Our Privacy Policy and Cookie Policy explain personal data and website technologies; they are notices, not a blanket request for consent. Our Complaints Handling Policy explains how to raise concerns. Specific Plan features disclosed before purchase form part of your contract. Mandatory law prevails over any conflicting provision.",
        ],
      },
      {
        heading: "Eligibility and account security",
        clauses: [
          "You must be at least 18 years old to purchase or use our services. You must have legal capacity to enter into the contract and be authorised to use the payment method you provide. Do not create an account or place an order using another person's identity without lawful authority.",
          "Provide accurate contact, billing and account information and keep it up to date. Your email address is used for order communications and eSIM delivery. Check it carefully before payment. If you discover an error, contact us promptly so we can help after reasonably verifying the order.",
          "Keep your login details and eSIM installation credentials secure. Notify us promptly if you suspect unauthorised access or use. Responsibility for an unauthorised transaction will be assessed under the applicable law and the circumstances; it does not automatically fall on you solely because your account was used.",
          "Some destinations or Plans may require identity information or registration under local telecommunications rules. Any requirement relevant to a purchase should be disclosed before payment or, if newly imposed, promptly afterwards. We will explain what is needed and why. We will not assume that every customer must supply a passport. If an undisclosed requirement prevents provision of the purchased service, contact us for an appropriate remedy.",
        ],
      },
      {
        heading: "Restricted countries and sanctions compliance",
        clauses: [
          "Velusim does not make its services available in the following restricted countries: Sudan; Democratic Republic of the Congo; Iran; Mali; Myanmar (Burma); North Korea; South Sudan; Syria; Yemen; Afghanistan; Belarus; Central African Republic; Cuba; Haiti; Iraq; Russia; Somalia; Venezuela; and Zimbabwe. Do not place an order from, or seek to use a Plan in, a restricted country. Regional and global Plan descriptions do not override this restriction.",
          "This is Velusim's service-restriction list for sanctions compliance and risk management. It is not a representation that a universal legal embargo applies to every listed country or every person of that nationality. Separately, we cannot enter into a transaction or provide a service where doing so would breach sanctions, export controls or other laws applicable to us, including restrictions concerning designated persons and entities they own or control.",
          "Do not conceal your location, supply false billing details, use another person's identity or otherwise circumvent an applicable restriction. We may request proportionate information to resolve a genuine compliance concern and may decline, delay or suspend an affected transaction. We will explain our decision where legally permitted. Any return or restriction of funds will follow applicable law; a compliance review does not give us an unrestricted right to keep your money.",
        ],
      },
      {
        heading: "Plans, coverage and device requirements",
        clauses: [
          "Velusim offers prepaid internet Plans with calls and SMS, including eligible Top-ups and Unlimited options. The destination, data allowance, call allowance, SMS allowance, validity period and any feature-specific restrictions are those shown for the selected Plan before purchase. Do not assume that every package has identical allowances or that international, premium-rate or special-service numbers are included.",
          "An Unlimited description applies only to the feature expressly described as unlimited. It does not automatically mean unlimited calls, SMS, hotspot use or uninterrupted maximum-speed data. Any high-speed allowance, speed reduction, daily reset or tethering restriction must be disclosed in the relevant Plan information before you pay. We will not rely on an undisclosed numerical fair-use limit to change what you purchased.",
          "Your device must support the relevant eSIM, be unlocked for use with other networks and meet the Plan's technical requirements. Compatibility may depend on the exact model, regional version, software and network settings. Check these details before purchase; general compatibility guidance is not a guarantee for every variant. Contact us if you are unsure.",
          "Coverage, available network technology, speed, call quality and SMS delivery depend on the destination, local network, signal, congestion, device and other operating conditions. A country appearing in a Plan does not guarantee service at every address, indoors, at sea or in the air. We remain responsible for the service description and for providing the remedies required if the service does not conform to the contract.",
          "Calls and SMS work only to the extent included in the selected Plan and supported in the relevant location. Do not assume support for emergency calling, short codes, bank verification messages, number portability, a particular number format or retaining a number after expiry unless that feature is expressly confirmed. Before relying on emergency connectivity, check the Plan's emergency-calling information and maintain another reliable way to contact emergency services. This warning does not exclude any statutory emergency-access duty applicable to us.",
        ],
      },
      {
        heading: "Orders, prices and payment",
        clauses: [
          "Review the selected destination, allowances, validity, compatibility, total price and currency before placing your order. Submitting an order is your offer to buy. We accept it when we send an order acceptance or make the purchased eSIM available in your dashboard, whichever occurs first. A payment-authorisation notice alone does not mean acceptance. If an order cannot be accepted after payment has been taken, we will return the amount paid, subject to any legal restriction.",
          "We accept Visa and Mastercard. Purchases are available in EUR, GBP and USD. The final checkout amount and selected currency govern your purchase; prices displayed in different currencies need not be simple conversions of one another. Your card issuer may apply its own exchange rate or charges if your card currency differs. Such charges are not imposed by Velusim.",
          "The total price, including any applicable taxes and unavoidable charges payable to us, will be shown before payment. COMPANY NAME LTD is not currently registered for UK VAT and does not issue UK VAT invoices. This statement is not a claim that every cross-border supply is exempt from all taxes. Any tax legally applicable to a transaction must be handled under the relevant rules and accurately reflected in the price information.",
          "Plans and Top-ups are prepaid one-off purchases. There are no automatically renewing subscriptions or automatic Top-ups. A further purchase requires your instruction and payment authorisation. Expiry or exhaustion does not authorise us to charge for a new package automatically.",
          "We may correct genuine pricing or description errors before accepting an order and give you the choice to proceed on the corrected basis or cancel. We will not impose a higher price after acceptance without your agreement. Promotional conditions, exclusions and expiry dates will be disclosed with the offer; promotions do not reduce mandatory consumer rights.",
        ],
      },
      {
        heading: "Delivery, installation and validity",
        clauses: [
          "After a successful order, the QR code and installation instructions are made available in your account dashboard and sent to your order email address. Delivery is electronic; no physical SIM is shipped. The delivery process and steps for missing or delayed credentials are explained in the Digital Delivery & Activation Policy. A failure to deliver a usable eSIM is not cured merely by recording that an email was sent.",
          "Your Plan's validity period starts immediately after successful installation of the eSIM, not when you arrive at your destination or first use data, calls or SMS. Installing before travel can therefore use up part or all of the validity period before arrival. Read the instructions before installing. The stated duration runs continuously and is not paused by switching off the device, turning off the eSIM or leaving the coverage area.",
          "There is no fixed deadline for installing an uninstalled eSIM after purchase, and Velusim does not impose a separate pre-installation expiry period. This does not extend the 14-day change-of-mind refund period. If a later technical or regulatory change makes an uninstalled purchased eSIM unusable, contact us: we will offer a suitable replacement with your agreement or an appropriate refund where lawful, rather than treat the purchase as forfeited simply because it was not installed sooner.",
          "A Plan ends when its validity expires. An individual allowance may be exhausted earlier, in which case the affected feature may stop until an eligible Top-up is purchased; the remaining included features continue where supported and within the Plan's validity. Unused allowances do not roll over unless this is expressly included in the Plan. Removing the profile does not pause validity or restore used allowances.",
          "Top-ups are available for eligible eSIMs. Before you buy, the offer must explain what is added, when it starts, how long it lasts and whether it changes the existing expiry date. A Top-up does not automatically renew or extend every component of a Plan. If an existing profile has been deleted, contact us before buying more allowances for it.",
          "Treat your QR code and manual installation credentials as confidential. Reinstallation, transfer to another device or replacement after deletion may be technically restricted. Do not delete a working profile or share its QR code without checking the instructions or contacting support. We will assess any replacement request on its facts and preserve any applicable consumer remedy.",
          "Your normal mobile subscription remains separate. Calls, data or messages routed through your home SIM can attract your home operator's charges. Select the correct SIM for data, calls and SMS and review automatic data switching and roaming settings. A Velusim Plan does not cancel charges under another subscription.",
        ],
      },
      {
        heading: "Cancellation, faults and support",
        clauses: [
          "Contact support@velusim.com to request a cancellation or refund. Our Refund & Cancellation Policy provides a 14-day request period for change-of-mind cancellations, measured from the day after the purchase contract is concluded. An uninstalled and unused eSIM is eligible for a full refund under that policy. Installed Plans and technical faults are assessed as described there, with mandatory rights preserved.",
          "Where applicable consumer law requires an express request to begin a service during a cancellation period, we must obtain that request before beginning early performance. Installation or supply of a QR code does not by itself waive all cancellation rights. Any lawful payment for service already supplied must be proportionate, and the loss of a statutory cancellation right on full performance requires the conditions imposed by applicable law to be satisfied.",
          "Report delivery, installation or connectivity problems promptly so we can investigate while useful diagnostic information is available. We may request relevant device settings, an error message, the eSIM identifier and approximate location, but not your account password, full card details or card security code. Troubleshooting must be reasonable and must not be used to obstruct a cancellation or remedy.",
          "We will provide the remedies required by applicable law when a service is faulty, misdescribed or not supplied as agreed. Depending on the circumstances, this may include correction, repeat performance, an agreed replacement, a price reduction or a refund. A general network disclaimer does not remove those rights.",
        ],
      },
      {
        heading: "Acceptable use and suspension",
        clauses: [
          "Use the service lawfully and in accordance with the Acceptable Use & Fair Usage Policy. You must not use it for fraud, unsolicited bulk communications, network interference, unauthorised access, unlawful surveillance or circumvention of applicable service restrictions. Any action we take must be proportionate to the conduct and the risk.",
          "We may suspend an account or affected service where reasonably necessary to address a material breach, suspected fraud, a security incident, a legal obligation or a serious network-integrity risk. Where practicable, we will explain the issue and provide a reasonable opportunity to resolve it. Immediate action may be necessary for urgent risks or where disclosure is prohibited. We will review disputed decisions on request.",
          "Suspension does not automatically forfeit all prepaid amounts. Refunds and any lawful deductions will depend on the reason, service already provided and applicable law. If we permanently discontinue a purchased service for reasons not attributable to you, we will provide an appropriate remedy for the unprovided service, subject to legal restrictions on payments.",
        ],
      },
      {
        heading: "Intellectual property and responsibility",
        clauses: [
          "The Website, branding, text and software are owned by or licensed to Velusim. You may use them to browse, buy and manage your service and retain copies of your contract. No ownership of our intellectual property is transferred. Do not reproduce the Website commercially, impersonate Velusim or misuse access credentials. This does not restrict rights that cannot lawfully be restricted.",
          "Nothing in these policies excludes or limits liability for death or personal injury caused by negligence, fraud, fraudulent misrepresentation, or any other liability or consumer right that cannot lawfully be excluded or limited. We remain responsible for losses for which we are liable under applicable law, including foreseeable loss caused by our breach or failure to use reasonable care and skill.",
          "Subject to the preceding clause, we are not responsible for losses that were not reasonably foreseeable, losses caused solely by your unlawful misuse or failure to follow reasonable instructions, or independent charges under another mobile contract that are not attributable to our breach. Plans are offered for personal travel use, not as a business continuity or safety-critical service; we do not accept liability for business losses to the extent lawfully excludable. You should take reasonable steps to limit avoidable loss.",
          "Events outside our reasonable control may delay or interrupt service. We will take reasonable steps to reduce their impact and inform you where appropriate. Such events do not automatically remove a right to cancel or obtain a remedy for service that cannot be supplied. We will not require you to indemnify us for our own breach, negligence or failure to comply with law.",
        ],
      },
      {
        heading: "Changes, disputes and contact",
        clauses: [
          "Changes to these policies will be identified by an updated date. The version agreed when an order is accepted governs that order. We will not use a later revision to retroactively reduce purchased allowances or mandatory rights. If a material change to an existing service is necessary, we will give any notice, explanation and cancellation rights required by law.",
          "These Terms are governed by the laws of England and Wales, without depriving a consumer of mandatory protections available under the law of their habitual residence where applicable. Courts of England and Wales have jurisdiction, but this does not prevent a consumer from using another court available to them under mandatory law. Nothing requires you to waive a lawful complaint, chargeback, regulatory report or access to justice.",
          "If a provision is unenforceable, the remaining provisions continue to apply so far as legally possible. A delay in enforcing a right does not waive it. We may transfer the contract only without reducing your rights and with any notice or consent required by law. Contact COMPANY NAME LTD at support@velusim.com or our registered office above. Our Complaints Handling Policy explains the review process.",
        ],
      },
    ],
  },
  {
    slug: "refund-cancellation",
    title: "Refund & Cancellation Policy",
    shortTitle: "Refund Policy",
    lastUpdated: "31 August 2026",
    summary:
      "How change-of-mind cancellations work, the 14-day request period, and remedies for faulty or undelivered eSIMs.",
    sections: [
      {
        heading: "Scope and contact",
        clauses: [
          "This policy applies to eSIMs and Top-ups purchased directly from COMPANY NAME LTD through velusim.com. COMPANY NAME LTD, company number COMPANY NUMBER, is the seller. Our registered office is COMPANY ADDRESS. Send refund and cancellation requests to support@velusim.com.",
          "This policy distinguishes change-of-mind cancellations from remedies for faulty, misdescribed or undelivered services. It does not exclude mandatory consumer rights. The 14-day period below is not a universal deadline for reporting faults, unauthorised payments or other legal claims.",
        ],
      },
      {
        heading: "The 14-day cancellation period",
        clauses: [
          "You may request a change-of-mind cancellation within 14 calendar days, counted from the day after the purchase contract is concluded. Email us before the period ends. The date you send a clear cancellation request determines whether it was made in time, not the date support responds or finishes investigating.",
          "If the eSIM has not been installed and none of the purchased service has been used, we will provide a full refund under this policy. This includes changing your travel plans, purchasing the wrong destination or discovering an incompatible device before installation. Merely receiving the QR code in the dashboard or by email does not disqualify an otherwise eligible request.",
          "There is no fixed deadline for installing an eSIM, but this does not extend the 14-day change-of-mind period. Outside that period, a change-of-mind refund is not automatically available. You can still contact us, and any rights concerning non-delivery, faults, misdescription or other mandatory remedies remain unaffected.",
        ],
      },
      {
        heading: "Installed Plans and early performance",
        clauses: [
          "The Plan validity period begins on successful installation and runs continuously. If you request cancellation after installation, contact us within the 14-day period wherever possible. Installation is not treated as an automatic waiver of every refund or cancellation right.",
          "Where a statutory service-cancellation right applies and you expressly requested early performance after receiving the required information, a lawful deduction may reflect service supplied up to the cancellation request. The amount must be proportionate to the contract and explained; it is not an arbitrary activation or administration fee. Depending on the Plan and applicable law, service supplied may include the period of availability as well as allowances used.",
          "Where the law permits a cancellation right to end after full performance, that occurs only when all required conditions have been met, including any express request and acknowledgement. If the required early-performance request or information was not obtained, we will not charge for early supply where the law prohibits it. Where no statutory right applies, a refund for an installed or used Plan is assessed on the facts rather than guaranteed solely because the request is within 14 days.",
          "After requesting cancellation, stop using the affected Plan if reasonably possible and follow our instructions for deactivation. We may disable a cancelled or refunded profile. We will not require you to delete diagnostic evidence or disable essential communications before arranging a reasonable way to investigate the issue.",
        ],
      },
      {
        heading: "Technical problems and incorrect orders",
        clauses: [
          "Contact us promptly if your QR code is missing or invalid, installation fails, a purchased feature does not work, the wrong Plan is supplied or service materially differs from its description. Provide the order reference, affected destination, device model, installation status and a short account of the problem. We will request only additional information reasonably needed to investigate.",
          "We may first help correct settings or a provisioning problem, or offer an appropriate replacement with your agreement. If the service cannot be brought into conformity within the time and on the conditions required by law, we will provide the applicable price reduction, cancellation or refund. A partial refund must reasonably reflect the affected or unprovided part; a full refund may be due where the whole service has failed or the law requires it.",
          "An incompatible or locked device, accidental profile deletion, lack of local coverage or incorrect settings does not produce the same outcome in every case. We will consider the information given before purchase, whether our compatibility or coverage statement was inaccurate, what was actually supplied and your legal rights. We will not reject a genuine fault claim solely because the eSIM was installed or some allowances were consumed.",
          "Report connection problems while you are in the affected destination when reasonably possible. This can help us diagnose them, but contacting us after travel does not automatically extinguish a statutory claim. Screenshots or other evidence may be requested proportionately; support contact is not a requirement to surrender legal rights.",
          "For duplicate, incorrect or suspected unauthorised charges, email us promptly with the transaction date, amount, currency and order reference if known. Do not send a full card number or security code. We will investigate and correct charges for which we are responsible. You may also contact your card issuer; we do not require you to withdraw a genuine payment dispute before considering your complaint.",
        ],
      },
      {
        heading: "Top-ups and refund payments",
        clauses: [
          "A Top-up is a separate purchase with its own 14-day request period. We will consider whether it has already started or been consumed and whether it can be separated from the underlying Plan. The same statutory early-performance and fault rules apply. A Top-up does not restart the original Plan's cancellation period.",
          "Refunds are made to the original payment method in the currency of the original transaction, unless another lawful method is expressly agreed or the original method cannot receive the refund. We do not substitute store credit without your agreement. A refund cannot exceed the amount actually paid for the affected purchase, except where a separate legal entitlement applies.",
          "For a valid statutory cancellation, we will issue the refund without undue delay and within the deadline required by law, generally no later than 14 days after being informed of the cancellation. For other approved refunds, we will issue payment without undue delay and aim to do so within 14 calendar days of approval, unless a shorter legal deadline applies. Your card issuer's posting time is separate; we cannot guarantee the date it will appear on your statement.",
          "We do not impose a cancellation-processing fee under this policy. Any lawful deduction for service already supplied will be identified and explained. Your card issuer may apply exchange-rate differences or independent fees; this does not limit any amount we must reimburse under law. We will not pay the same loss twice where a refund or chargeback has already resolved it.",
          "If a sanctions rule or other legal restriction prevents a payment, we must follow it and will explain the position where permitted. An unsupported suspicion does not create a right to confiscate a refund. If you disagree with a decision, request a review under our Complaints Handling Policy.",
        ],
      },
      {
        heading: "How to send your request",
        clauses: [
          "Email support@velusim.com with your name, order email, order number if available, the Plan concerned and a clear statement that you wish to cancel or request a refund. A reason helps with a fault investigation but is not required to exercise an applicable change-of-mind cancellation right. No particular subject line or form is compulsory. If email is unavailable, you may send a clear cancellation notice to our registered office; mandatory rights to notify us by other effective means are preserved.",
          "You may use the following optional cancellation wording: \"To COMPANY NAME LTD, COMPANY ADDRESS; support@velusim.com. I/We hereby give notice that I/We cancel my/our contract for the supply of the following service: [identify service]. Ordered on: [date]. Order reference: [if available]. Name of consumer(s): [name]. Address of consumer(s): [address]. Date: [date]. Signature of consumer(s): [only if sent on paper].\" Delete whichever wording does not apply.",
        ],
      },
    ],
  },
  {
    slug: "delivery-activation",
    title: "Digital Delivery & Activation Policy",
    shortTitle: "Delivery & Activation",
    lastUpdated: "31 August 2026",
    summary:
      "How your eSIM is delivered electronically, what to do if credentials are missing, and when your Plan's validity begins.",
    sections: [
      {
        heading: "Electronic fulfilment",
        clauses: [
          "COMPANY NAME LTD, company number COMPANY NUMBER, supplies the eSIMs sold at velusim.com electronically. Our registered office is COMPANY ADDRESS. Delivery and installation support is available at support@velusim.com. No physical SIM, parcel or postal delivery is included.",
          "Following a successful order, your QR code and installation instructions are made available in your account dashboard and sent to the email address used for the order. We also provide order information identifying the purchased Plan. Keep your confirmation and the policy version supplied with your purchase for future reference.",
          "Fulfilment is intended to occur promptly after successful payment and order processing. Payment verification, security checks, technical provisioning or email delivery problems may cause a delay. We will not represent an unfulfilled order as successfully delivered merely because payment was authorised. Any specific delivery time shown before purchase forms part of the order information.",
        ],
      },
      {
        heading: "Missing credentials and delivery problems",
        clauses: [
          "Check your dashboard, inbox and spam or junk folder if the email does not arrive. Verify the address used for the order. If the eSIM is absent, inaccessible or unusable, email support with your order reference and a description of the problem. Avoid purchasing a duplicate solely to resolve a delivery delay unless you have first checked the order status.",
          "If you entered an incorrect email address, contact us promptly. We may ask for proportionate evidence that you own the order before correcting the address or resending credentials. We will not disclose QR codes to an unverified requester. If credentials were exposed, tell us so that we can assess whether they can be secured or replaced.",
          "Access to a working QR code in your dashboard can allow installation even if the email is delayed. However, inaccessible or invalid installation credentials are a delivery issue. Where we cannot supply the purchased service as agreed, the Refund & Cancellation Policy and applicable legal remedies apply.",
        ],
      },
      {
        heading: "Installation and the start of your Plan",
        clauses: [
          "Before installing, confirm that your device is eSIM-compatible, network-unlocked and able to maintain an internet connection during setup. Follow the instructions provided with your specific order. Your device's regional version or software may affect compatibility. Contact us before installation if you are uncertain.",
          "Successful installation starts the Plan's validity period immediately. It does not wait for arrival at your destination, connection to a foreign network or your first call, SMS or data session. Install only when you are ready for the stated validity period to begin. Downloading an instruction email or viewing a QR code is not itself successful installation.",
          "There is no fixed deadline to install an uninstalled eSIM after purchase. The purchased validity period does not start while the profile remains uninstalled. This absence of an installation deadline is separate from the 14-day change-of-mind refund period and does not promise that every underlying network arrangement will exist forever. If a later change prevents installation of an uninstalled purchase, we will offer an appropriate agreed replacement or refund where lawful.",
          "After installation, validity runs continuously. Switching off the phone, disabling the profile, leaving the destination, not consuming allowances or deleting the eSIM does not stop the clock. Check the expiry information in your order and account. If the timing shown is inconsistent with the purchased duration, contact us for correction.",
          "An installed Plan may require you to enable the profile, select it for mobile data, calls or SMS, enable the settings specified in the instructions and connect to a supported network. These settings enable use; they do not postpone the start of validity. Do not change unrelated security settings or install software from an unverified source to troubleshoot an eSIM.",
        ],
      },
      {
        heading: "QR-code security, deletion and Top-ups",
        clauses: [
          "Your QR code, activation details and manual installation credentials allow access to the purchased eSIM. Keep them private. They are not intended to be publicly shared or installed on multiple devices. The number of permitted installations and any transfer option depend on the profile's technical capabilities, not on how many copies of the QR image you retain.",
          "Do not delete an eSIM as a troubleshooting step unless the instructions or support team direct you to do so. A deleted profile may not be reinstallable, and a QR code may cease to work after its permitted installation. Before replacing a device, resetting it or attempting a transfer, contact support. Replacement availability and any proposed charge must be explained before you agree, without limiting mandatory remedies.",
          "Top-ups apply only to eligible profiles and have the start, validity and allowance conditions shown before their purchase. They may not repair a deleted or incompatible profile. No Top-up is purchased or charged automatically. Confirm that you are adding allowances to the intended eSIM before payment.",
        ],
      },
      {
        heading: "Availability and assistance",
        clauses: [
          "Service depends on the Plan's permitted destinations and features. Calls and SMS allowances, supported number types, hotspot availability and any fair-use conditions must be checked for the selected Plan. An installed eSIM does not guarantee a signal or emergency-call capability everywhere. Follow the emergency and compatibility information in the Terms & Conditions and the Plan description.",
          "When requesting help, provide the order reference, device model, relevant error message, installation status and destination. Share only diagnostic information needed for the issue and obscure unrelated personal data in screenshots. Never send account passwords, full card details or security codes. Cancellation and refund rights are governed by the Refund & Cancellation Policy, not by the mere fact that an email or QR code was delivered.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    lastUpdated: "31 August 2026",
    summary:
      "What personal information COMPANY NAME LTD processes, why, the legal bases, sharing, retention, and your rights.",
    sections: [
      {
        heading: "Who is responsible for your information",
        clauses: [
          "COMPANY NAME LTD is the controller of personal information used to operate velusim.com, manage customer accounts, sell eSIMs and handle related customer communications. Our company number is COMPANY NUMBER and our registered office is COMPANY ADDRESS. For privacy matters or to exercise a right, email support@velusim.com and identify your request as a privacy matter.",
          "This policy explains the processing associated with our Website and services. It does not mean that every category of information described below is collected from every visitor. The information needed depends on whether you browse, create an account, purchase a Plan, use a particular feature or contact support. A specific collection notice will supplement this policy where an additional process requires further information.",
        ],
      },
      {
        heading: "Information used in providing the service",
        clauses: [
          "Account and contact information includes the name, email address, account credentials or authentication information and other details you provide when registering or communicating with us. Order and billing information includes the purchased Plan, destination, currency, price, transaction reference, payment status and any billing information required at checkout. Do not send full card details or card security codes by email.",
          "Payment information is used to authorise and reconcile purchases, refunds and disputed transactions. The exact payment information entered and any limited card information made available to us depend on the checkout process. This policy does not represent that Velusim receives or stores every item entered into a payment form, nor that payment processing occurs without any external recipient.",
          "Service and technical information may include the eSIM or subscription identifier, assigned number where relevant, profile status, installation and expiry information, purchased and remaining allowances, device model, operating system, network information, IP address, timestamps and connection or error records. We use the information made available to us where needed to provision, administer, secure and troubleshoot the purchased service.",
          "Providing data, voice and SMS services involves the processing of telecommunications information by the networks carrying the service. Depending on the feature and applicable law, this can include calling or called numbers, message-routing details, session times, duration, data volumes and network-derived location. Velusim's access to such information depends on what is supplied for service administration, billing, support or compliance. This is not a statement that we routinely read message content, record calls or receive your browsing history.",
          "Support information includes your correspondence, complaint details and any screenshots or diagnostic evidence you choose to provide or that we reasonably request. Remove unrelated contacts, messages, payment information and precise location from screenshots where they are not needed. We will request identity evidence only where proportionate to verification, fraud prevention or an applicable legal requirement and explain the request.",
          "Website usage and preference information can include pages visited, interaction events, browser and device details, referral information and cookie choices. Optional analytics or marketing processing is subject to the technologies actually enabled and the relevant consent rules. See the Cookie Policy. Subscription to promotional emails is separate from the information required to fulfil an order.",
        ],
      },
      {
        heading: "Sources, purposes and legal bases",
        clauses: [
          "We obtain information directly from you, from your use of the Website and account, and from the payment, network and technical organisations involved in delivering the purchase. Where a legal or fraud-prevention check is needed, relevant information may also come from identity or sanctions-checking sources and public official records. We limit checks to a justified purpose and provide further information where required.",
          "We use information where necessary to enter into or perform our contract with you: creating and managing your account, processing the order, delivering the eSIM, administering allowances, providing requested Top-ups, answering service enquiries and handling contractual cancellations or refunds. If essential information is not supplied, we may be unable to complete the purchase or provide the affected feature; we will explain which information is required.",
          "We process information where necessary to comply with legal obligations, including applicable accounting and tax requirements, binding sanctions restrictions, telecommunications requirements and valid demands from competent authorities. We do not rely on a vague legal obligation to justify collecting unrelated information.",
          "We may rely on legitimate interests for proportionate fraud prevention, account and network security, prevention of misuse, service reliability, handling disputes and establishing or defending legal claims. We consider the need for the processing and its impact on individuals and do not rely on this basis where your interests or rights override ours. The relevant interest is the protection and responsible operation of our business and services, not unrestricted commercial use of your data.",
          "Where consent is required for optional technologies or electronic marketing, we will seek it separately and allow you to withdraw it. Where the law permits marketing about our own similar services without a new consent, we will use that route only when all conditions, including an appropriate opt-out, are met. Accepting the Terms or purchasing an eSIM is not blanket consent to advertising or disclosure for unrelated marketing.",
        ],
      },
      {
        heading: "Sharing and international processing",
        clauses: [
          "We disclose information only as relevant to the purpose to categories of recipients such as payment-processing and card-network organisations; eSIM provisioning and telecommunications network operators; hosting, security and technical-support contractors; email delivery and customer-support contractors; professional advisers; and competent authorities where disclosure is lawful. Optional analytics or advertising recipients, if enabled, must be covered by the relevant notice and consent arrangements. We do not sell your personal information.",
          "Recipients acting on our instructions must be subject to appropriate contractual and security requirements. Some recipients, particularly telecommunications networks, payment organisations and authorities, may determine their own legally permitted purposes and act as independent controllers. Their involvement does not remove Velusim's responsibility for its own collection, disclosures and controller obligations.",
          "Travel connectivity can require information to be processed in your destination and in countries where relevant networks or technical recipients operate. A UK registered office does not mean all data stays in the UK. Where a restricted international transfer is involved, a valid legal transfer mechanism is required, such as applicable adequacy arrangements or approved contractual safeguards with any necessary supplementary measures. We do not treat acceptance of these Terms as blanket consent to unrestricted international transfers.",
          "You may ask support@velusim.com which recipients, destination countries and transfer arrangements are relevant to your service and request information about applicable safeguards. We will provide the information required by law, including access to a copy of safeguards where applicable, with necessary protection for confidential information. Additional destination-specific privacy information will be provided where required.",
        ],
      },
      {
        heading: "Retention and protection",
        clauses: [
          "We retain account information for as long as needed to maintain the account and provide outstanding purchases, then assess whether a specific legal, security or dispute-related purpose requires continued retention. The absence of an installation deadline does not justify retaining every category of information indefinitely; only records needed to administer the outstanding entitlement or another justified purpose should remain.",
          "Order, transaction and refund records are retained for applicable accounting, tax and claims periods. Support and complaint records are kept for the period reasonably needed to resolve the matter and any related challenge. Technical and security logs are retained according to their troubleshooting or security purpose and any applicable legal requirement, not simply for as long as the account exists. Marketing preference records may be retained in a minimal form to honour an opt-out.",
          "Retention decisions consider the category and sensitivity of the information, the service and contract status, mandatory record-keeping periods, limitation periods, open disputes and whether the purpose can be achieved with less information. When no justified purpose remains, information should be deleted or irreversibly anonymised. A lawful hold may temporarily delay deletion of specifically relevant records. Contact us for the retention criteria applicable to a particular record.",
          "We take reasonable and appropriate organisational and technical measures to protect information, proportionate to the processing and risks. No online service can promise absolute security. Keep your account and eSIM credentials private and report suspected misuse. Where a personal data breach occurs, we will meet applicable duties to assess, record and, where required, notify the relevant authority and affected individuals.",
        ],
      },
      {
        heading: "Your rights and choices",
        clauses: [
          "Depending on the applicable law and circumstances, you may request access to your information, correction of inaccurate data, erasure, restriction of processing and a portable copy of data where the portability right applies. These rights are not absolute; for example, some transaction information may need to be retained to meet a legal obligation or defend a claim. We will explain a refusal or limitation and available complaint routes.",
          "You have the right to object to processing based on legitimate interests where the applicable conditions are met. You can object to direct marketing at any time, including associated profiling. We will stop processing for direct marketing when you object. Use the unsubscribe mechanism in the message or email support@velusim.com. Necessary order, security and service communications are not marketing and may still be sent.",
          "You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal. For optional technologies, use the Website's consent controls where provided or the further options explained in our Cookie Policy. You do not have to accept optional marketing to buy an eSIM.",
          "Send rights requests to support@velusim.com. We may ask for proportionate verification, without demanding unnecessary identity documents. Requests are generally free and will be handled without undue delay within the applicable legal time limit, normally one month, subject to lawful extensions and procedural rules. We will explain any permitted extension, fee or refusal. You may also ask for an explanation and human review of an automated eligibility or fraud decision affecting you; additional safeguards apply where required by law.",
        ],
      },
      {
        heading: "Complaints, children and updates",
        clauses: [
          "If you believe your information has been mishandled, email support@velusim.com. We will acknowledge a data protection complaint within 30 days, take appropriate steps to investigate it and communicate the outcome without undue delay. A complaint and a request to exercise a data right have different legal requirements; making one does not cancel the other. Our Complaints Handling Policy provides further details.",
          "You can complain to the UK Information Commissioner's Office at ico.org.uk/make-a-complaint/ or to another competent data protection authority where applicable, including the authority in your EEA country of residence. We encourage you to contact us first so we can address the issue, but do not make that a waiver of rights available under law.",
          "Our services are restricted to people aged 18 and over and are not directed to children. If you believe an under-18 account or purchase has resulted in inappropriate collection of personal information, contact us. We will assess the circumstances and take appropriate action, retaining only information needed for a lawful purpose such as addressing the incident or resolving the transaction.",
          "We will update this policy when relevant practices or legal requirements change and identify the revision date. Material new processing may require a specific notice or new consent before it begins. Continued use alone does not supply any consent the law requires us to obtain separately.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    lastUpdated: "31 August 2026",
    summary:
      "The cookies and similar technologies used on velusim.com, which are necessary or optional, and how to control them.",
    sections: [
      {
        heading: "Scope and responsibility",
        clauses: [
          "This Cookie Policy explains cookies and similar storage or access technologies associated with velusim.com. The Website is operated by COMPANY NAME LTD, company number COMPANY NUMBER, at COMPANY ADDRESS. Questions can be sent to support@velusim.com. Our Privacy Policy explains the handling of personal information more generally.",
          "Cookies are small records stored in a browser or device. Related technologies can include browser storage, pixels and identifiers used to remember information or recognise an interaction. Similar legal rules can apply even where a technology is not called a cookie. A first-party or third-party label does not by itself determine whether consent is required.",
        ],
      },
      {
        heading: "Necessary and optional purposes",
        clauses: [
          "Necessary technologies support functions such as account authentication, session security, fraud prevention connected with a requested transaction, order completion and recording privacy choices. We use a consent exemption only where its legal conditions are met. A technology is not essential merely because it is convenient for us or commercially useful.",
          "Preference technologies may remember selections such as currency or display settings. Whether a particular use needs consent depends on its actual purpose and the applicable law. A preference requested by you is distinct from unrelated tracking. Optional preference storage should not be a condition for purchasing a Plan where it is not necessary for the transaction.",
          "If analytics technologies are enabled, their purpose is to understand Website performance and interactions, such as errors or navigation. If advertising technologies are enabled, they may measure campaigns or support audience selection. This description does not mean every category is active. The specific technologies, purposes and choices must be identified in the consent information made available before the relevant optional use.",
          "For technologies requiring consent, we will seek a clear affirmative choice before they operate. Continuing to browse, closing a banner or accepting the Terms does not by itself give valid consent. Where a lawful exception permits a limited use without consent, we must satisfy its conditions, provide the required information and make any required objection mechanism available. We will not apply a UK-specific exception where the rules applicable to your use require consent instead.",
        ],
      },
      {
        heading: "Your choices",
        clauses: [
          "Where optional technologies are offered, the Website's consent interface must let you accept or reject optional use and change relevant category choices without treating rejection as acceptance. Necessary functions remain subject to their legal exemption. Withdrawal should be as easy as giving consent and does not affect the lawfulness of previous processing.",
          "Use the cookie or privacy settings available on the Website to review or withdraw choices. If you cannot locate or use the control, email support@velusim.com for assistance. Your browser can also block or delete cookies and manage site storage. Blocking necessary storage may prevent sign-in or checkout; refusal of optional tracking should not prevent access to the basic purchase service.",
          "Choices may be specific to a browser or device. Clearing storage, changing browser or using another device can remove a stored choice, so the Website may ask again. Removing a cookie is not always the same as withdrawing consent for future use; update the relevant consent setting as well where available.",
        ],
      },
      {
        heading: "Duration, recipients and further information",
        clauses: [
          "Session storage normally lasts for the session, while persistent storage remains until its configured expiry or deletion, subject to browser behaviour. There is no single retention period for all cookies. The live cookie information must identify the technologies in use, their purpose, responsible organisation or sufficiently specific recipient category, duration and the applicable choice.",
          "Where a technology causes information to be disclosed to a payment, security, technical, analytics or advertising recipient, that disclosure must be explained and have an appropriate legal basis. Only categories actually used apply. If the processing involves personal information or an international transfer, the safeguards and rights described in the Privacy Policy also apply. Optional tracking consent is not permission for unrelated processing.",
          "We will review this policy when the Website's technologies change and update the information and consent arrangements before introducing uses requiring a new choice. For information about a specific technology or to raise a concern, contact support@velusim.com. Our Privacy Policy and Complaints Handling Policy describe the available rights and complaint routes.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use & Fair Usage Policy",
    shortTitle: "Acceptable Use",
    lastUpdated: "31 August 2026",
    summary:
      "The rules for lawful use of Velusim eSIMs and networks, how allowances and Unlimited Plans work, and enforcement.",
    sections: [
      {
        heading: "Purpose and scope",
        clauses: [
          "This policy covers COMPANY NAME LTD's eSIMs, Plans, Top-ups, accounts and Website at velusim.com. Company number: COMPANY NUMBER. Registered office: COMPANY ADDRESS. For permitted-use enquiries or restrictions, contact support@velusim.com.",
          "Read this policy with the Terms & Conditions and your Plan description. It protects lawful use and network integrity without creating undisclosed limits, permitting arbitrary cancellation or reducing mandatory rights. Services are restricted to users aged 18 and over.",
        ],
      },
      {
        heading: "Lawful and responsible use",
        clauses: [
          "Do not use the service for fraud, identity theft, payment abuse, harassment, threats, unlawful surveillance, illegal material or infringement of others' rights. Comply with laws applicable to your activity and location. Lawful criticism of Velusim and genuine complaints are not prohibited.",
          "Do not send unsolicited bulk SMS, carry out unlawful automated calling, spoof identities for deceptive purposes, conduct phishing campaigns or distribute malware. Do not use calling or messaging allowances for call pumping, artificial traffic generation, interconnection-revenue manipulation or evasion of charges.",
          "Do not attempt unauthorised access to devices, accounts, networks or systems; disrupt service through denial-of-service activity; tamper with eSIM credentials; clone a profile; or bypass technical protections and properly disclosed Plan limits. Security testing requires express authorisation from the party entitled to grant it.",
          "Do not use false identities or payment details, abuse refunds, create deceptive duplicate accounts to obtain promotional benefits, or resell or commercially redistribute our eSIM profiles without written permission. Sharing a connection through a permitted personal hotspot is not treated as commercial resale merely because another travel companion connects.",
        ],
      },
      {
        heading: "Geographic and compliance restrictions",
        clauses: [
          "You must comply with the restricted-country provisions in the Terms & Conditions. Velusim does not make its services available in Sudan, Democratic Republic of the Congo, Iran, Mali, Myanmar (Burma), North Korea, South Sudan, Syria, Yemen, Afghanistan, Belarus, Central African Republic, Cuba, Haiti, Iraq, Russia, Somalia, Venezuela or Zimbabwe. Regional or global coverage descriptions do not override these restrictions.",
          "Do not circumvent a restriction or use the service for a person or transaction prohibited by sanctions or other applicable law. This policy does not prohibit a lawful privacy tool solely because it is a privacy tool; the prohibited conduct is using it to conceal a disqualifying transaction or evade a restriction. We may ask for proportionate information where a genuine compliance issue needs clarification.",
        ],
      },
      {
        heading: "Allowances, Unlimited Plans and network management",
        clauses: [
          "Each Plan has the allowances and validity shown before purchase. Validity starts after successful installation. Data, voice and SMS allowances are separate unless the Plan expressly combines them. Exhausting one feature does not automatically expand another. Background device activity can consume data, and some calling or messaging destinations may be outside the included allowance.",
          "Unlimited applies only to the feature identified as unlimited. Any high-speed allowance, reduced-speed level, daily reset, hotspot limit, excluded destination or other material restriction must be clearly disclosed before payment. A reference to fair use alone is not a substitute for explaining those limits. Where no numerical restriction was disclosed, we will not invent one retrospectively for an existing purchase.",
          "If a Plan includes a disclosed high-speed allowance followed by lower-speed service, reaching that allowance may trigger the specified reduction for the stated period. Whether speed or allowances reset daily, on another cycle or not at all must be shown for that Plan. Unlimited data does not promise a particular speed at all times or immunity from congestion.",
          "Hotspot and tethering use is permitted only to the extent supported and described for the selected Plan. Any quantitative tethering restriction or exclusion must be disclosed before purchase. We will not describe permitted personal hotspot use as abuse simply because you use a substantial portion of an advertised allowance.",
          "Proportionate network management may address congestion or security risks, subject to telecommunications and open-internet rules. It must not disguise a materially different service from the one sold. Your rights to information and remedies remain in place.",
        ],
      },
      {
        heading: "Investigation, restrictions and review",
        clauses: [
          "We may investigate reasonably suspected prohibited use using lawfully available information, subject to the Privacy Policy and telecommunications confidentiality rules. This is not an unrestricted right to inspect private communications.",
          "Depending on the risk, we may issue a warning, request that the activity stop, restrict the affected feature or temporarily suspend the relevant account or eSIM. We will use a proportionate response and give an explanation and opportunity to correct the issue where practicable. Immediate restriction may be necessary to prevent harm or comply with law, and some details may be legally restricted.",
          "We may terminate an affected service for a serious or repeated material breach where justified. Refunds, any lawful deductions and the treatment of remaining prepaid service will be assessed under the Refund & Cancellation Policy and applicable law. We do not impose an automatic forfeiture of every purchase or a punitive fee simply because an account was reviewed.",
          "To challenge a restriction, email support@velusim.com with the order reference and explanation. We will review it and restore service where appropriate. Further review follows the Complaints Handling Policy. Lawful refunds, complaints and payment disputes are not prohibited use.",
        ],
      },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints Handling Policy",
    shortTitle: "Complaints",
    lastUpdated: "31 August 2026",
    summary:
      "How to raise a complaint with COMPANY NAME LTD, how it is investigated, time limits, and independent routes available to you.",
    sections: [
      {
        heading: "Who handles complaints",
        clauses: [
          "COMPANY NAME LTD handles complaints about purchases and services sold through velusim.com. Our company number is COMPANY NUMBER. Our registered office is COMPANY ADDRESS. Email support@velusim.com to complain about an order, payment, eSIM, connection, customer-support interaction or privacy matter.",
          "We will consider complaints fairly, take reasonable and proportionate steps to investigate them and explain the outcome. Making a complaint does not waive your consumer, privacy, payment-dispute or court rights. We do not charge a fee merely for receiving and investigating a complaint.",
        ],
      },
      {
        heading: "Submitting a complaint",
        clauses: [
          "Include your name, order email, order reference if available, the affected Plan, a description of what happened, relevant dates and the outcome you are seeking. A suggested subject line is \"Complaint - order reference\", but no specific wording or form is required. If you want to cancel or request a refund, say so clearly; the relevant request date is not postponed by our complaint process.",
          "If email is not accessible to you, send your complaint to the registered office above. Tell us if you need information in an accessible format or reasonable assistance communicating with us. An authorised representative may complain for you; we may verify their authority before disclosing personal information. We will not require unnecessary medical or other sensitive information to consider an accessibility request.",
          "Keep evidence that may help, such as order confirmations, relevant error messages or screenshots with unrelated information removed. Do not send passwords, full payment-card details or card security codes. Where a service issue is ongoing, include the destination, device model and installation status so we can investigate promptly.",
        ],
      },
      {
        heading: "Investigation and communication",
        clauses: [
          "We will acknowledge the complaint promptly, request any information reasonably needed and take active steps towards resolution. We will explain the next steps and provide updates where investigation cannot be completed immediately.",
          "We may review the Plan description, fulfilment and installation information, relevant usage, technical and payment records, and earlier correspondence. We may consult involved technical or network organisations, but COMPANY NAME LTD remains responsible for addressing its own contractual obligations.",
          "We will work to resolve the complaint without undue delay and within applicable legal deadlines. If it takes longer, we will explain the outstanding issue and expected next step. Please respond to reasonable information requests; an unanswered request does not automatically extinguish a legal claim.",
          "Our outcome will explain the decision, reasons and any remedy, such as technical correction, an agreed replacement, refund or price adjustment. If we consider no remedy due, we will explain why and how to request a review.",
        ],
      },
      {
        heading: "Refund and privacy time limits",
        clauses: [
          "The 14-day change-of-mind cancellation period is explained in the Refund & Cancellation Policy. A cancellation request made in time remains timely even if support or complaint handling continues beyond the period. Statutory refund deadlines are not extended merely because we have opened an internal investigation.",
          "For a data protection complaint, we will acknowledge receipt within 30 days, take appropriate steps to investigate and communicate the outcome without undue delay. If the correspondence also contains a data-access, erasure or other rights request, we will address it under its separate legal requirements, normally within one month subject to applicable rules. A complaint acknowledgement is not a substitute for a rights-request response.",
        ],
      },
      {
        heading: "Review and independent routes",
        clauses: [
          "If you disagree with our response, reply to support@velusim.com and request a review, identifying what you believe was missed or decided incorrectly. We will arrange an appropriate reconsideration, by another responsible person where practicable, and explain the result. An internal review is not a condition that overrides access to an independent route available under law.",
          "Where your complaint is covered by mandatory telecommunications alternative dispute resolution requirements, we will provide the information and access required by those rules. Under applicable UK telecommunications rules, eligible unresolved complaints can generally be referred after six weeks from the initial complaint, or earlier following a deadlock notice. We will identify the relevant route and provide any required notice for a qualifying complaint. This policy does not claim membership of a particular scheme or remove any obligation to participate where required.",
          "For privacy concerns, you may complain to the UK Information Commissioner's Office through ico.org.uk/make-a-complaint/ or another competent authority where applicable. For other matters, you may use consumer-protection, card-issuer, regulatory or court routes available to you. A regulator may not determine an individual contractual claim; the appropriate route depends on the issue.",
        ],
      },
      {
        heading: "Records and fair treatment",
        clauses: [
          "Complaint information will be used to investigate and document the matter, implement the outcome, identify relevant service improvements and meet legal requirements, in accordance with the Privacy Policy. We will limit disclosure to those who need it and retain records according to the complaint, legal and dispute-related purposes.",
          "Communications must not contain threats, harassment or knowingly false evidence. We may proportionately restrict an unsafe channel while keeping a reasonable way to progress the complaint. Persistence, dissatisfaction or lawful criticism alone are not grounds to reject a genuine complaint.",
        ],
      },
    ],
  },
];

export function policyBySlug(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
