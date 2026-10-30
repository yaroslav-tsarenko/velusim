/** Customer-facing legal policies, transcribed from the master text in
 *  addons/velusim-policies.md. Only the public policy bodies (between the
 *  PUBLIC_POLICY_START/END markers) are included — the internal implementation
 *  appendix is marked "Do not publish this appendix as policy text". */

/** A clause is a paragraph string, or a structured block. Strings support
 *  inline `**bold**` and `[label](href)` markup. */
export type PolicyBlock =
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface PolicySection {
  heading: string;
  clauses: (string | PolicyBlock)[];
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
    lastUpdated: "30 October 2026",
    summary:
      "The contract that governs purchases from and use of velusim.com and the travel eSIM services sold by HARTWICK VENTURES LTD.",
    sections: [
      {
        heading: "About Velusim and these Terms",
        clauses: [
          "These Terms & Conditions govern purchases from and use of velusim.com (the Website) and the travel eSIM services sold by HARTWICK VENTURES LTD (Velusim, we, us or our). HARTWICK VENTURES LTD is a company registered under company number 17206399. Our registered office is Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. Contact us at info@velusim.com.",
          "HARTWICK VENTURES LTD sells eSIMs in its own name and is your contractual seller. We use telecommunications infrastructure and technical contractors to deliver the service, but this does not transfer our obligations as seller to you or remove rights you have against us.",
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
          "We accept Visa and Mastercard. Purchases are available in EUR (€). The final checkout amount and selected currency govern your purchase. Your card issuer may apply its own exchange rate or charges if your card currency differs. Such charges are not imposed by Velusim.",
          "The total price, including any applicable taxes and unavoidable charges payable to us, will be shown before payment. HARTWICK VENTURES LTD is not currently registered for UK VAT and does not issue UK VAT invoices. This statement is not a claim that every cross-border supply is exempt from all taxes. Any tax legally applicable to a transaction must be handled under the relevant rules and accurately reflected in the price information.",
          "Plans and Top-ups are prepaid one-off purchases. There are no automatically renewing subscriptions or automatic Top-ups. A further purchase requires your instruction and payment authorisation. Expiry or exhaustion does not authorise us to charge for a new package automatically.",
          "We may correct genuine pricing or description errors before accepting an order and give you the choice to proceed on the corrected basis or cancel. We will not impose a higher price after acceptance without your agreement. Promotional conditions, exclusions and expiry dates will be disclosed with the offer; promotions do not reduce mandatory consumer rights.",
        ],
      },
      {
        heading: "Delivery, installation and validity",
        clauses: [
          "After a successful order, the QR code and installation instructions are made available in your account dashboard and sent to your order email address. Delivery is electronic; no physical SIM is shipped. The delivery process and steps for missing or delayed credentials are explained in the Digital Delivery & Activation Policy. A failure to deliver a usable eSIM is not cured merely by recording that an email was sent.",
          "We disclose product availability and the applicable delivery timeframe before payment. Standard electronic delivery is within 5 minutes after successful payment confirmation. If a different delivery date is needed because of known unavailability or delay, we disclose it and obtain your express agreement before payment. If an unexpected delay after purchase prevents us from meeting the agreed timeframe, we notify you, provide a revised anticipated delivery date where one can reasonably be established, and offer cancellation of the affected order with the applicable refund under our Digital Delivery & Activation Policy. Internal order acceptance or provisioning steps do not restart the delivery clock after successful payment confirmation.",
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
          "Contact info@velusim.com to request a cancellation or refund. Our Refund & Cancellation Policy provides a 14-day request period for change-of-mind cancellations, measured from the day after the purchase contract is concluded. An uninstalled and unused eSIM is eligible for a full refund under that policy. Installed Plans and technical faults are assessed as described there, with mandatory rights preserved.",
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
          "If a provision is unenforceable, the remaining provisions continue to apply so far as legally possible. A delay in enforcing a right does not waive it. We may transfer the contract only without reducing your rights and with any notice or consent required by law. Contact HARTWICK VENTURES LTD at info@velusim.com or our registered office above. Our Complaints Handling Policy explains the review process.",
        ],
      },
    ],
  },
  {
    slug: "refund-cancellation",
    title: "Refund & Cancellation Policy",
    shortTitle: "Refund Policy",
    lastUpdated: "30 October 2026",
    summary:
      "How change-of-mind cancellations work, the 14-day request period, and remedies for faulty or undelivered eSIMs.",
    sections: [
      {
        heading: "Scope and contact",
        clauses: [
          "This policy applies to eSIMs and Top-ups purchased directly from HARTWICK VENTURES LTD through velusim.com. HARTWICK VENTURES LTD, company number 17206399, is the seller. Our registered office is Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. Send refund and cancellation requests to info@velusim.com.",
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
          "If we cannot meet the delivery timeframe agreed for your order, you may cancel the affected undelivered eSIM or Top-up instead of accepting a revised date. This right is separate from the 14-day change-of-mind policy and does not depend on the expiry of an additional waiting period. We refund the full amount paid for the affected undelivered product, including corresponding refundable tax or delivery charges, without a cancellation or administration fee. We issue the refund without undue delay and no later than 14 calendar days after receiving your cancellation notice, or sooner where applicable law requires. If we establish that we cannot supply the affected product at all, we notify you, cancel it and issue the same refund without undue delay and no later than 14 calendar days after that notification, subject to any shorter legal deadline. The Digital Delivery & Activation Policy explains notification and cancellation procedures.",
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
          "Email info@velusim.com with your name, order email, order number if available, the Plan concerned and a clear statement that you wish to cancel or request a refund. A reason helps with a fault investigation but is not required to exercise an applicable change-of-mind cancellation right. No particular subject line or form is compulsory. If email is unavailable, you may send a clear cancellation notice to our registered office; mandatory rights to notify us by other effective means are preserved.",
          "You may use the following optional cancellation wording: \"To HARTWICK VENTURES LTD, Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH; info@velusim.com. I/We hereby give notice that I/We cancel my/our contract for the supply of the following service: [identify service]. Ordered on: [date]. Order reference: [if available]. Name of consumer(s): [name]. Address of consumer(s): [address]. Date: [date]. Signature of consumer(s): [only if sent on paper].\" Delete whichever wording does not apply.",
        ],
      },
    ],
  },
  {
    slug: "delivery-activation",
    title: "Digital Delivery & Activation Policy",
    shortTitle: "Delivery & Activation",
    lastUpdated: "30 October 2026",
    summary:
      "Availability and delivery timing before payment, electronic delivery within 5 minutes, your options if delivery is delayed, and when your Plan's validity begins.",
    sections: [
      {
        heading: "Seller and scope",
        clauses: [
          "This Policy explains availability, electronic delivery, Installation and Activation of travel eSIMs sold by **HARTWICK VENTURES LTD**, trading as **Velusim**, company number **17206399**. Our registered office is **Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Contact **info@velusim.com** for assistance.",
          "Read this Policy with our [Terms & Conditions](/legal/terms) and [Refund & Cancellation Policy](/legal/refund-cancellation). Nothing in this Policy limits rights that applicable consumer law does not allow us to exclude.",
        ],
      },
      {
        heading: "Product availability and delivery information before payment",
        clauses: [
          "Before you complete payment, we will inform you whether the selected eSIM Plan is available and disclose the anticipated delivery timeframe and the delivery deadline applicable to your order. This information will be presented on the relevant product page or during checkout, in time for you to decide whether to proceed.",
          "**Our standard delivery timeframe is within 5 minutes after successful payment confirmation.** For this purpose, successful payment confirmation means that the payment has been confirmed as successful in our checkout or order system. Merely submitting payment details, an unsuccessful payment attempt or a pending authorisation does not begin this timeframe.",
          "If we know that the selected product is unavailable or cannot be delivered within the standard timeframe, we will tell you before payment. We will either make the product unavailable for purchase or offer it with a clearly disclosed revised anticipated delivery date or deadline, including the applicable time zone where relevant.",
          "**Any revised delivery date or deadline must be disclosed and expressly agreed with you before payment.** We will not take payment for an order with a known delivery delay on the assumption that you have accepted it merely by reading a general warning that delays may occur. If you do not agree to the revised timeframe, you can leave the purchase without being charged for that order.",
          "If we cannot provide a sufficiently clear anticipated delivery date for an unavailable product, we will not accept payment for that product until we can disclose and agree one. The delivery timeframe you agree before payment will be included in your order confirmation in a form you can retain.",
        ],
      },
      {
        heading: "Electronic delivery",
        clauses: [
          "An eSIM is delivered electronically. We do not ship a physical SIM. A postal address is not used to deliver the eSIM profile, although billing or identity information may be required for a separate lawful purpose.",
          "Within the delivery timeframe agreed for your order, the QR code or relevant installation credentials and instructions will be made available in your account and sent to the email address used for the order. Your order information identifies the purchased Plan and its principal conditions.",
          "Delivery means providing usable installation credentials and instructions through the agreed electronic channels. A record that an email was sent does not, by itself, establish that usable credentials were delivered if they are missing, invalid or inaccessible because of a problem on our side.",
          "Delivery is distinct from Installation, Activation and the availability of network coverage at your destination. Receiving or viewing a QR code does not itself install the eSIM or begin the Plan's validity period.",
        ],
      },
      {
        heading: "Unexpected delays after purchase",
        clauses: [
          "If an unexpected issue means that we cannot meet the delivery timeframe originally agreed for your order, we will notify you without undue delay using your order email address. The notice will identify the affected order, explain the delay where possible and give a revised anticipated delivery date or deadline.",
          "If we cannot yet establish a reliable revised date, we will say so rather than give an unsupported estimate. This does not delay your cancellation option: you may cancel the affected order immediately instead of waiting for a further estimate. If you choose to wait, we will update you when a revised date can be provided.",
          "**Whenever we cannot meet the originally agreed delivery timeframe, you may choose either to accept the revised timeframe or to cancel the affected order and receive the applicable refund.** You do not have to accept a replacement product, account credit or a voucher instead of a monetary refund to which you are entitled.",
          "To cancel, email **info@velusim.com** with the order number or enough information for us to identify the purchase and state that you wish to cancel because of the delay. You do not have to complete technical troubleshooting or use a particular form before a valid cancellation notice takes effect. We will not treat silence as agreement to a revised delivery date.",
          "If you cancel an undelivered eSIM or Top-up because the agreed delivery timeframe cannot be met, we will refund the full amount paid for that affected product, including any corresponding refundable tax or delivery charge, without a cancellation or administration fee. Where an order contains separate products that were delivered correctly and are not cancelled, the refund will cover the delayed product or products; any broader cancellation rights under applicable law remain unaffected.",
          "We will issue the refund to the original payment method unless another lawful method is expressly agreed with you, without undue delay and no later than **14 calendar days after receiving your cancellation notice**, or sooner where applicable law requires. Bank processing may affect when the repayment appears on your statement, but it does not extend our deadline for issuing it.",
          "If you agree to a revised deadline and we cannot meet it, we will notify you again and offer the same choice to cancel. Agreement to one delay is not agreement to unlimited further delays. We will not substitute a materially different Plan or extend the deadline unilaterally.",
          "Where an unexpected availability problem means we cannot supply the product at all, we will notify you, cancel the affected product and issue the full applicable refund without undue delay and no later than 14 calendar days after notifying you of the cancellation, subject to any shorter legal deadline. No refund is conditional on you accepting a substitute product. An express legal restriction on repayment will be handled as required by law and explained where legally permitted.",
        ],
      },
      {
        heading: "Missing, delayed or unusable credentials",
        clauses: [
          "If you cannot find or use your eSIM:",
          {
            type: "list",
            ordered: true,
            items: [
              "Check the order and eSIM area of your account.",
              "Check your email inbox and spam or junk folder.",
              "Check the order status and the email address entered during purchase.",
              "Contact **info@velusim.com** with the order number and purchase email if the issue remains.",
            ],
          },
          "Do not repeatedly purchase the same Plan simply because a confirmation email is delayed. We can investigate the existing order.",
          "We may reasonably verify order ownership before changing an email address or resending credentials. If an incorrect email address supplied at checkout prevented email delivery, we will assist with correction and retrieval. We will not attribute a delay caused by our systems to you or restart an agreed delivery deadline merely because you reported the issue.",
          "The checks above are assistance steps, not conditions on the delay-cancellation right in Section 4. If the agreed delivery timeframe has not been met, that right remains available. If credentials were delivered but are defective, the remedies in our [Refund & Cancellation Policy](/legal/refund-cancellation) and applicable law also apply.",
        ],
      },
      {
        heading: "Check your device before Installation",
        clauses: [
          "Your device must support the eSIM, be unlocked for use with the relevant networks and meet the Plan's technical requirements. Read the device-specific instructions. An existing internet connection may be needed to download and install the profile.",
          "Keep your order information and ensure that you can access the QR code or manual installation details in a way supported by your device. Do not publish installation credentials or give them to an unauthorised person.",
        ],
      },
      {
        heading: "Installation starts the validity period",
        clauses: [
          "**The Plan's validity begins immediately upon successful Installation of the eSIM. Installation and Activation occur at the same stage for this purpose.**",
          "The validity period does not wait until you arrive at your destination, first connect to a network or first use data, calls or SMS. Receiving or viewing installation credentials alone does not start the validity period.",
          "For example, if you install a seven-day Plan several days before departure, those days form part of its running validity period. Install only when you are ready for validity to begin, while allowing for the internet connection and setup steps you may need.",
          "Once started, validity runs continuously. Disabling the eSIM, turning off the device, leaving the coverage area or deleting the profile does not pause, extend or restart it. Your Plan and order information govern the duration and expiry calculation.",
          "Any separate deadline for installing an uninstalled eSIM must be disclosed before purchase. We will not apply an undisclosed deadline to forfeit a purchase. If a later technical or legal change prevents use of an uninstalled purchased eSIM, contact us for an appropriate replacement or refund where required.",
        ],
      },
      {
        heading: "Connecting and using allowances",
        clauses: [
          "After Installation, follow the instructions for selecting the eSIM as the relevant data, call or SMS line and configuring any required roaming or network settings. Connectivity depends on being within the selected Plan's coverage and meeting its technical requirements.",
          "Data, call and SMS allowances apply as described for the Plan. International or special-service calls, verification messages and other features are not automatically included. Hotspot use and speed-management conditions follow the disclosed Plan information and our [Acceptable Use & Fair Usage Policy](/legal/acceptable-use).",
          "Your ordinary mobile subscription remains separate. Services routed through your home SIM, including automatic data switching, may create charges from your home mobile provider. A Velusim purchase does not cancel or amend another mobile contract.",
        ],
      },
      {
        heading: "Top-ups and expiry",
        clauses: [
          "An eligible Top-up adds the allowance or package described in its offer. Before payment, the offer will explain when it begins, its validity and whether it changes an existing Plan's expiry. Do not assume that a Top-up renews the original Plan or extends every allowance.",
          "The availability, pre-payment delivery disclosure and unexpected-delay provisions in Sections 2–4 also apply to Top-ups. For a Top-up, delivery means making the purchased allowance or package available on the eligible eSIM according to the offer; it need not involve issuing a new QR code. A disclosed future start time for the package is distinct from a failure to provision the purchased Top-up by the agreed delivery deadline.",
          "There are no automatic Top-ups or automatic renewals. Exhaustion or expiry does not trigger another payment. A further package requires a separate purchase authorisation.",
          "Unless expressly stated otherwise, unused allowances expire and do not roll over. This does not remove rights arising from cancellation or a service failure.",
        ],
      },
      {
        heading: "Reinstallation, deletion and device changes",
        clauses: [
          "An eSIM may be limited to one Installation or one device, and a QR code may not be reusable. The relevant instructions govern whether transfer or reinstallation is supported. Deleting a profile does not necessarily free it for another device.",
          "Contact us before deleting an eSIM, resetting relevant device settings or attempting a device transfer if you wish to preserve service. If a device is lost or a profile is deleted, we will assess available recovery or replacement options. Recovery is not guaranteed where the technology does not permit it; applicable remedies for a fault on our part remain available.",
        ],
      },
      {
        heading: "Assistance and complaints",
        clauses: [
          "For Installation or connection problems, send your order number, device model, relevant error message and a description of the issue to **info@velusim.com**. Do not send passwords or payment-card security information.",
          "We will provide reasonable assistance and investigate problems with the supplied service. Our [Refund & Cancellation Policy](/legal/refund-cancellation) explains other available remedies, and our [Complaints Handling Policy](/legal/complaints) explains how to request a review.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    lastUpdated: "30 October 2026",
    summary:
      "What personal information HARTWICK VENTURES LTD processes, why, the legal bases, who receives it, how long each category is kept, and your rights.",
    sections: [
      {
        heading: "Who is responsible for your information",
        clauses: [
          "**HARTWICK VENTURES LTD**, trading as **Velusim**, is responsible as controller for the personal information it processes to operate **velusim.com**, sell and manage its eSIM services and communicate with customers.",
          "Our company number is **17206399** and our registered office is **Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH**. Contact **info@velusim.com** for privacy questions, rights requests or complaints.",
          "This Policy covers Website visitors, account holders, customers and people who contact us. Telecommunications networks may also process information for their own operations and legal obligations. This Policy describes processing for which Velusim is responsible; it does not suggest that we control every independent network's processing.",
        ],
      },
      {
        heading: "Information we process and where it comes from",
        clauses: [
          "The information relevant to your interaction with us may include:",
          {
            type: "table",
            head: ["Category", "Information and source"],
            rows: [
              ["Account and contact information", "Information you provide when registering or communicating with us, such as your email address, name if supplied, account preferences and authentication-related records."],
              ["Orders and payments", "Selected Plans and Top-ups, order identifiers, prices, currency, transaction status, billing information where required, payment references and refund records. Information comes from you, our order systems and payment-processing confirmations."],
              ["eSIM and service records", "eSIM identifiers, delivery and Installation status, Activation time, validity, allowances, Top-ups and usage or network-status information made available to us to manage your service. These records may come from technical and connectivity providers."],
              ["Device and Website information", "IP address, browser and device information, access times, requested pages and relevant security or error logs generated when you use the Website. Optional tracking is addressed in our Cookie Policy."],
              ["Support and complaints", "Messages, correspondence, relevant screenshots, device settings and other information you provide, together with our investigation and response records."],
              ["Eligibility and verification information", "Residency or location information, billing details and, where necessary, additional information needed to address a legal, identity or fraud concern. Any destination-specific identity requirement will be explained."],
              ["Marketing preferences", "Your subscription choice, consent records where applicable and requests to stop receiving marketing."],
            ],
          },
          "Not every category applies to every user. Service records do not necessarily include the content of communications. The fact that a mobile network carries your traffic does not mean Velusim receives all browsing, call or message content.",
          "Please do not email passwords, full payment-card details, card security codes or unrelated sensitive information. If verification is needed, we will explain what information is relevant and how to provide it appropriately. Payment details entered during checkout are processed for payment authorisation; ordinary support correspondence is not an appropriate way to submit them.",
        ],
      },
      {
        heading: "Why we use information and our legal bases",
        clauses: [
          "Where UK or EU data protection law applies, we use personal information only where an applicable legal basis permits it.",
          {
            type: "table",
            head: ["Purpose", "Principal legal basis"],
            rows: [
              ["Creating and managing your account; responding to a request before purchase", "Performance of a contract or taking steps at your request before entering a contract."],
              ["Processing orders and payments; delivering and managing eSIMs and Top-ups", "Performance of our contract with you."],
              ["Resolving service problems, cancellations and refunds", "Performance of the contract and compliance with applicable consumer obligations; legitimate interests in resolving disputes where contractual processing does not apply."],
              ["Keeping records required by tax, accounting or other applicable law", "Compliance with a legal obligation."],
              ["Protecting accounts and systems; preventing fraud and misuse", "Legitimate interests in protecting customers, the business and networks, or compliance with a specific legal obligation where applicable."],
              ["Applying legal restrictions and proportionate eligibility checks", "Compliance with applicable legal obligations; legitimate interests in enforcing lawful service restrictions where no specific legal obligation applies."],
              ["Handling complaints and establishing, exercising or defending legal claims", "Compliance with applicable obligations and legitimate interests in investigating concerns and protecting legal rights."],
              ["Sending optional promotional communications", "Consent where required. Where the law permits marketing about similar services to existing customers without consent, our legitimate interest applies, subject to the required opt-out opportunities."],
              ["Optional analytics, personalisation or advertising technologies, if enabled", "Consent under the approach described in our Cookie Policy."],
            ],
          },
          "When relying on legitimate interests, we consider the purpose, necessity and effects of processing on you. We do not rely on that basis where your interests or fundamental rights override our interests. You may ask for more information about the relevant assessment.",
          "Acceptance of the Terms & Conditions is not consent to all processing. If information is needed to enter or perform the contract, failing to provide it may prevent us from creating an account, completing an order or supplying the service. Optional information and marketing choices are not conditions of purchase.",
        ],
      },
      {
        heading: "Who may receive information",
        clauses: [
          "We disclose information only as relevant to the purpose and applicable law. Recipient categories may include:",
          {
            type: "list",
            items: [
              "**Payment-processing, acquiring and banking organisations**, for authorisation, settlement, refunds and payment disputes.",
              "**eSIM provisioning and telecommunications organisations**, for issuing profiles, activating Plans, managing allowances, providing connectivity and investigating faults.",
              "**Hosting, infrastructure and security providers**, for operating and protecting systems.",
              "**Customer communications and support providers**, for transactional emails, support enquiries and complaints.",
              "**Marketing or analytics providers**, only where the relevant functionality is used and the required legal basis and choices are in place.",
              "**Professional advisers and auditors**, where necessary for advice, accounting, audit or legal claims.",
              "**Public authorities, regulators, courts and law-enforcement bodies**, where disclosure is required or otherwise lawfully justified.",
              "**Parties to a proposed business reorganisation or transfer**, only where disclosure is necessary, proportionate and appropriately protected, with notice of material changes where required.",
            ],
          },
          "Some recipients act on our instructions; others have independent legal responsibilities. We use appropriate contractual arrangements where required and limit disclosure to information relevant to the recipient's role. This Policy does not authorise unrestricted disclosure to unspecified parties.",
        ],
      },
      {
        heading: "Data retention",
        clauses: [
          { type: "subheading", text: "5.1. Retention periods by category" },
          "The periods below apply to personal information held by Velusim or processed on our behalf. They identify both the retention period and the event from which it is calculated. We delete or irreversibly anonymise information earlier where its purpose has ended and no other lawful basis requires retention. Pseudonymised information that can still be linked to a person remains personal information.",
          {
            type: "table",
            head: ["Record category", "Retention period and starting point", "Scope and purpose"],
            rows: [
              ["**Transaction and payment records needed for accounting and tax**", "**6 years from the end of the accounting period to which the records relate**, subject to the specific tax extensions in Section 5.2.", "Relevant orders, invoices or receipts, amounts, currency, payment and refund references, transaction status and the minimum customer details needed to substantiate the transaction. This is not a blanket six-year retention rule for full card details, security codes, raw technical logs or unrelated account information."],
              ["**Customer account information**", "While the account remains open and the information is needed to maintain it; ordinary profile information is deleted or anonymised **within 30 calendar days after account closure**.", "Account contact details, preferences and authentication-related profile information. Where a limited item also forms part of an accounting record or a necessary claim record, that item follows the relevant separate rule; the entire profile is not retained for that reason."],
              ["**Routine support correspondence**", "**Up to 24 months from closure of the support case**.", "Enquiries, troubleshooting exchanges and the outcome, to address follow-up questions and recurring service issues. Irrelevant or unnecessarily sensitive attachments are removed sooner when no longer needed."],
              ["**Complaints correspondence and outcome records**", "**Up to 24 months from closure of the complaint**, including completion of any internal review already requested.", "The complaint, relevant investigation evidence, response and outcome. If a particular record is necessary for an actual or reasonably anticipated legal claim or an applicable regulatory obligation, only that record follows Sections 5.2–5.3. A complaint does not automatically cause the entire file to be kept for six years."],
              ["**Routine technical logs**", "**Up to 90 days from creation of each log entry**.", "Website and application diagnostics, ordinary access and error logs used to operate and troubleshoot the service. A specific entry needed to investigate a security incident may be extracted into the incident record; the unrelated log archive is not retained on that basis."],
              ["**Security logs**", "**Up to 12 months from creation of each log entry**.", "Authentication, suspicious-access, abuse and security-event records needed to detect and investigate threats. Specific evidence required for an unresolved incident or claim is handled under Sections 5.2–5.3."],
            ],
          },
          "For example, accounting records for an accounting period ending on 31 December 2026 would normally be retained through 31 December 2032. An account's ordinary profile information is not kept until that date merely because the customer placed an order during that period.",
          "Account closure takes effect when the closure process is completed and confirmed to you. We will not keep that process open solely to postpone deletion. Any active service or outstanding matter affecting closure will be explained. An unresolved accounting obligation or dispute may justify keeping the relevant records separately, rather than keeping an otherwise unnecessary account profile open.",
          "A support case or complaint is closed when the substantive response has been provided, any agreed action has been completed and any internal review already requested has concluded. If the same matter is genuinely reopened, the period for the updated case runs from its subsequent closure. Routine administrative activity or an unrelated new enquiry does not restart retention of an old file.",
          { type: "subheading", text: "5.2. Statutory obligations and legal-claim records" },
          "**Accounting and tax.** The six-year accounting period above reflects UK corporation-tax record-keeping requirements. Where required, relevant records are kept until the later of that period, completion of an HMRC enquiry into the matters concerned, or expiry of the applicable enquiry window. A late return or another applicable legal requirement may affect the end date. We determine the date from the relevant accounting period, filing history and specific statutory requirement. Our lack of UK VAT registration does not remove corporation-tax record-keeping obligations.",
          "**Legal claims.** For ordinary simple-contract claims under the law of England and Wales, the usual limitation period is **six years from the date the cause of action accrued**, normally the relevant breach. This is not automatically six years from account closure, complaint closure or the date of purchase. Different claims, jurisdictions, court orders or legal rules that postpone or extend a limitation period may require a different calculation.",
          "Where it is necessary and proportionate to retain information for a legal claim, we identify the issue, applicable jurisdiction, relevant limitation rule, starting event and resulting retention end date. Only information needed to establish, exercise or defend that claim is retained on that basis. The existence of a possible limitation period is not a general requirement to keep all customer information for that period.",
          { type: "subheading", text: "5.3. Documented exceptions and restricted retention" },
          "If a specific record is subject to an unresolved dispute, chargeback, security investigation, regulatory enquiry, preservation notice or legal proceeding when its ordinary period ends, we may retain that record for as long as it remains necessary for that matter and any applicable legal obligation.",
          "We document the reason, affected records and end date or review trigger, restrict access and review continued need at least every six months and when the matter is resolved. Once the reason ends, and no other lawful retention period applies, we delete or anonymise the affected information within 30 calendar days. If a subsequent appeal, enforcement process or further legal requirement necessitates retention, that basis and its duration are assessed separately.",
          "An exception does not automatically extend the retention of unrelated account data, correspondence or logs. Information kept only for compliance or a dispute is not used for unrelated marketing.",
          { type: "subheading", text: "5.4. Other service records and preferences" },
          "Detailed eSIM and usage information is kept while needed to deliver an active Plan or Top-up and establish the relevant allowance or charge. Once that operational purpose ends, detailed technical records follow the 90-day technical-log limit, measured from the end of that purpose. A minimal record needed to substantiate an order, payment or refund follows the accounting rule; information needed for a particular support case or claim follows the relevant rule above. Retaining a transaction summary does not justify retaining all underlying traffic or diagnostic data.",
          "Marketing subscription information is retained while the relevant subscription or lawful marketing relationship continues. Following an opt-out, we retain only the minimum suppression information needed to prevent further unwanted marketing while the relevant marketing system remains in use, unless a separate legal obligation or claim requires a limited record. Consent evidence is retained while we rely on the consent and, afterwards, only to the extent needed to demonstrate the lawfulness of the relevant activity under the claim criteria in Section 5.2.",
          "Cookie and browser-storage durations are described in our [Cookie Policy](/legal/cookies) and the applicable cookie information. Those durations do not authorise indefinite retention of personal information collected through the technologies.",
          { type: "subheading", text: "5.5. Deletion, backups and your requests" },
          "Our retention schedule applies to records under our control, including copies held by processors on our behalf. Deletion and backup-management processes must give effect to these periods; making a backup does not create a new retention period. Copies awaiting deletion are restricted from ordinary use, and data previously marked for deletion must not be returned to active use following restoration.",
          "Independent organisations may retain information under their own legal obligations and privacy notices; this does not authorise Velusim to retain its copy beyond its applicable period.",
          "You can request deletion or ask how a period applies to your information by emailing **info@velusim.com**. A scheduled maximum is not a reason to reject a valid earlier erasure request. If particular information must be retained, we will explain the category, reason and applicable duration or determining criteria, subject to lawful restrictions on disclosure.",
        ],
      },
      {
        heading: "International processing",
        clauses: [
          "Travel connectivity can involve processing in your destination and in countries where relevant infrastructure or support operations are located. A destination outside the UK or European Economic Area may have different data protection laws.",
          "Where we make a transfer subject to UK or EU restrictions on international transfers, an applicable legal mechanism is required. Depending on the destination and arrangement, this may be a recognised adequacy decision, appropriate contractual safeguards with necessary additional measures, or a permitted exception in limited circumstances.",
          "Contact **info@velusim.com** for details of the destinations and transfer mechanism relevant to our processing of your information and for a copy or description of applicable safeguards, subject to lawful redactions. Purchasing a travel Plan is not blanket consent to all international transfers.",
        ],
      },
      {
        heading: "Your rights and choices",
        clauses: [
          "Depending on your location and applicable law, you may have rights to access information, correct inaccuracies, request deletion, restrict processing, receive a portable copy of certain information, object to particular processing and withdraw consent.",
          "**You can object at any time to processing for direct marketing, including associated profiling.** You can also object to processing based on legitimate interests on grounds relating to your situation. Where applicable, we must stop unless we can demonstrate a legally sufficient reason to continue.",
          "To unsubscribe from promotional emails, use the unsubscribe option in the message or email **info@velusim.com**. Essential order, service and legal communications may still be sent. Withdrawing consent does not affect processing lawfully carried out before withdrawal.",
          "Send rights requests to **info@velusim.com**. We may request proportionate information to verify identity or clarify a request. Under applicable UK or EU rules, we generally respond without undue delay and within one month, subject to lawful timing adjustments and extensions. If an extension or refusal applies, we will explain the reason and available challenge routes within the required period. Requests are generally free, with exceptions only where permitted by law.",
          "Where applicable law provides safeguards concerning significant decisions made solely by automated means, you may request the relevant information, contest the decision and seek human intervention. Contact us if a transaction or account decision appears incorrect; we will explain the applicable review process.",
        ],
      },
      {
        heading: "Security",
        clauses: [
          "We use technical and organisational measures appropriate to the information and risks involved. No online system can guarantee absolute security. You can help by protecting account credentials, keeping devices secure and reporting suspected unauthorised activity promptly.",
          "If a personal data breach occurs, we will assess it and notify affected individuals and authorities where required by law. No statement in this Policy is a claim of a particular security certification.",
        ],
      },
      {
        heading: "Children",
        clauses: [
          "Velusim is intended only for people aged **18 or over**. We do not invite children to create accounts or purchase services. If you believe a person under 18 has provided information in connection with an account or purchase, contact us so we can investigate and take appropriate action, including deletion where lawful and appropriate.",
        ],
      },
      {
        heading: "Privacy complaints",
        clauses: [
          "You can raise a privacy complaint at **info@velusim.com** or write to our registered office. Describe the issue and the outcome you are seeking. We will acknowledge a data protection complaint within the applicable legal period, including within 30 days where required by UK law, investigate appropriately and communicate the outcome without undue delay. This acknowledgement period does not replace the separate deadlines for rights requests.",
          "You may complain to the **Information Commissioner's Office (ICO)** at [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/). If another data protection authority has jurisdiction, you may also contact it, including the authority for your habitual residence, place of work or alleged infringement where applicable. Our internal procedure does not remove that right.",
        ],
      },
      {
        heading: "Changes and contact",
        clauses: [
          "We may update this Policy to reflect changes in processing or legal requirements. Material changes will be brought to your attention where required. A policy update is not a substitute for obtaining new consent when consent is legally needed.",
          "**Privacy contact:** info@velusim.com · **Controller:** HARTWICK VENTURES LTD, company number 17206399 · **Address:** Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    lastUpdated: "15 September 2026",
    summary:
      "The cookies and similar technologies used on velusim.com, which are necessary or optional, and how to control them.",
    sections: [
      {
        heading: "Scope and responsibility",
        clauses: [
          "This Cookie Policy explains cookies and similar storage or access technologies associated with velusim.com. The Website is operated by HARTWICK VENTURES LTD, company number 17206399, at Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. Questions can be sent to info@velusim.com. Our Privacy Policy explains the handling of personal information more generally.",
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
          "Use the cookie or privacy settings available on the Website to review or withdraw choices. If you cannot locate or use the control, email info@velusim.com for assistance. Your browser can also block or delete cookies and manage site storage. Blocking necessary storage may prevent sign-in or checkout; refusal of optional tracking should not prevent access to the basic purchase service.",
          "Choices may be specific to a browser or device. Clearing storage, changing browser or using another device can remove a stored choice, so the Website may ask again. Removing a cookie is not always the same as withdrawing consent for future use; update the relevant consent setting as well where available.",
        ],
      },
      {
        heading: "Duration, recipients and further information",
        clauses: [
          "Session storage normally lasts for the session, while persistent storage remains until its configured expiry or deletion, subject to browser behaviour. There is no single retention period for all cookies. The live cookie information must identify the technologies in use, their purpose, responsible organisation or sufficiently specific recipient category, duration and the applicable choice.",
          "Where a technology causes information to be disclosed to a payment, security, technical, analytics or advertising recipient, that disclosure must be explained and have an appropriate legal basis. Only categories actually used apply. If the processing involves personal information or an international transfer, the safeguards and rights described in the Privacy Policy also apply. Optional tracking consent is not permission for unrelated processing.",
          "We will review this policy when the Website's technologies change and update the information and consent arrangements before introducing uses requiring a new choice. For information about a specific technology or to raise a concern, contact info@velusim.com. Our Privacy Policy and Complaints Handling Policy describe the available rights and complaint routes.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use & Fair Usage Policy",
    shortTitle: "Acceptable Use",
    lastUpdated: "15 September 2026",
    summary:
      "The rules for lawful use of Velusim eSIMs and networks, how allowances and Unlimited Plans work, and enforcement.",
    sections: [
      {
        heading: "Purpose and scope",
        clauses: [
          "This policy covers HARTWICK VENTURES LTD's eSIMs, Plans, Top-ups, accounts and Website at velusim.com. Company number: 17206399. Registered office: Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. For permitted-use enquiries or restrictions, contact info@velusim.com.",
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
          "To challenge a restriction, email info@velusim.com with the order reference and explanation. We will review it and restore service where appropriate. Further review follows the Complaints Handling Policy. Lawful refunds, complaints and payment disputes are not prohibited use.",
        ],
      },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints Handling Policy",
    shortTitle: "Complaints",
    lastUpdated: "30 October 2026",
    summary:
      "How to raise a complaint with HARTWICK VENTURES LTD, how it is investigated, time limits, and independent routes available to you.",
    sections: [
      {
        heading: "Who handles complaints",
        clauses: [
          "HARTWICK VENTURES LTD handles complaints about purchases and services sold through velusim.com. Our company number is 17206399. Our registered office is Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. Email info@velusim.com to complain about an order, payment, eSIM, connection, customer-support interaction or privacy matter.",
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
          "We may review the Plan description, fulfilment and installation information, relevant usage, technical and payment records, and earlier correspondence. We may consult involved technical or network organisations, but HARTWICK VENTURES LTD remains responsible for addressing its own contractual obligations.",
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
          "If you disagree with our response, reply to info@velusim.com and request a review, identifying what you believe was missed or decided incorrectly. We will arrange an appropriate reconsideration, by another responsible person where practicable, and explain the result. An internal review is not a condition that overrides access to an independent route available under law.",
          "Where your complaint is covered by mandatory telecommunications alternative dispute resolution requirements, we will provide the information and access required by those rules. Under applicable UK telecommunications rules, eligible unresolved complaints can generally be referred after six weeks from the initial complaint, or earlier following a deadlock notice. We will identify the relevant route and provide any required notice for a qualifying complaint. This policy does not claim membership of a particular scheme or remove any obligation to participate where required.",
          "For privacy concerns, you may complain to the UK Information Commissioner's Office through ico.org.uk/make-a-complaint/ or another competent authority where applicable. For other matters, you may use consumer-protection, card-issuer, regulatory or court routes available to you. A regulator may not determine an individual contractual claim; the appropriate route depends on the issue.",
        ],
      },
      {
        heading: "Records and fair treatment",
        clauses: [
          "Complaint information will be used to investigate and document the matter, implement the outcome, identify relevant service improvements and meet legal requirements, in accordance with the Privacy Policy. We will limit disclosure to those who need it. We retain complaint correspondence and outcome records for up to 24 months after closure of the complaint, including completion of any internal review already requested. Only records needed for a specific legal obligation, investigation or actual or reasonably anticipated claim are retained longer under the criteria in Section 5 of our Privacy Policy. This does not extend the retention of unrelated account data or technical logs.",
          "Communications must not contain threats, harassment or knowingly false evidence. We may proportionately restrict an unsafe channel while keeping a reasonable way to progress the complaint. Persistence, dissatisfaction or lawful criticism alone are not grounds to reject a genuine complaint.",
        ],
      },
    ],
  },
];

export function policyBySlug(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}
