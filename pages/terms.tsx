import {NextSeo} from 'next-seo';
import Link from 'next/link';
import styled from 'styled-components';
import router from 'next/router';
import {useEffect, useState} from 'react';

import PageContainer from '../components/PageContainer';
import BodyContainer from '../components/BodyContainer';
import Navbar from '../components/Navbar';
import Gutter from '../components/Gutter';
import FooterButtonAndLink from '../components/FooterButtonAndLink';
import * as gradients from '../styles/gradients';
import routes from '../routing/routes';
import Button from '../components/Button';
import Header from '../components/Header';
import {COLOR_SECONDARY_GRAY_0, COLOR_PRIMARY_ORANGE_0} from '../styles/colors';

const HeaderContainer = styled.div`
  margin-top: -50px;
`;
const TextContainer = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY_GRAY_0};
  padding-bottom: 40px;

  h3 {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 0;
  }

  div {
    margin-bottom: 15px;
  }

  p {
    margin: 0 0 15px;
  }
`;
const Anchor = styled.a`
  color: ${COLOR_PRIMARY_ORANGE_0};
  font-weight: 500;
`;
const IndentedParagraph = styled.p`
  padding-left: 15px;
`;
const H2 = styled.h2`
  line-height: 28px;
`;

const TermsOfUse = () => {
  const {query} = router;
  const [from, setFrom] = useState<string>('');

  useEffect(() => {
    if (query?.from) {
      setFrom(query.from as string);
    }
  }, [query]);

  return (
    <>
      <NextSeo
        title="Terms of Use | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <>
              <HeaderContainer>
                <Header text="MORE User Terms" />
              </HeaderContainer>
              <TextContainer>
                <H2>Effective Date: 1/7/2022</H2>
                <p>
                  These MORE User Terms (“Terms”) govern your use of the
                  products and services provided by or on behalf of Cantaloupe,
                  Inc. (“Cantaloupe”, “we”, “our” or “us”) pursuant to these
                  Terms, including any content or information provided therewith
                  (collectively, the “Services”).
                </p>
                <p>
                  Our Privacy Policy, available{' '}
                  <Link href="/privacy-policy">
                    <Anchor>here</Anchor>
                  </Link>
                  , is incorporated by reference into these Terms. Please read
                  these Terms and the Privacy Policy carefully before you access
                  the Services, as these Terms form a binding legal agreement
                  between you and Cantaloupe.
                </p>
                <p>
                  These Terms may apply to you individually, the business or
                  other legal entity user you represent, or both. If you are
                  using the Services on behalf of a company or other legal
                  entity, you hereby represent and warrant that you have the
                  authority to enter into these Terms on behalf of such entity.
                  By accessing, registering for or using the Services, you: (1)
                  acknowledge that you have read and understand these Terms; (2)
                  agree to be bound by them in their entirety, and (3) are
                  entering into a legally binding agreement with us. As used in
                  these Terms and unless separately identified as applicable to
                  either an individual or entity, “you” and “your” refer to both
                  you individually and the entity on behalf of which you are
                  entering into these Terms. Capitalized terms not otherwise
                  defined herein are defined in Section 16.
                </p>
                <p>
                  IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT USE THE
                  SERVICES. YOUR USE OF OUR SERVICES REQUIRES YOUR ACCEPTANCE OF
                  THESE TERMS AS THEY MAY BE AMENDED FROM TIME TO TIME,
                  INCLUDING THE POLICIES INCORPORATED BY REFERENCE HEREIN, WHICH
                  INCLUDES THE CANTALOUPE PRIVACY POLICY.
                </p>
                <H2>1. Services.</H2>
                <p>
                  1.1. <u>Overview of Services.</u> The Services enable you to
                  manage your wallet (including adding and removing Payment
                  Accounts for use in connection with your MORE Account), make
                  payments at participating points of sale, receive and manage
                  loyalty rewards, review account activity and perform other
                  activities enabled by the Services from time to time in
                  Cantaloupe’s sole discretion, including the Transaction
                  Service.
                </p>
                <p>
                  1.2. <u>Additional Terms; Third-Party Terms.</u> Your use of
                  the Services and related services may be governed by
                  additional terms, including third-party terms, conditions and
                  privacy policies.
                </p>
                <IndentedParagraph>
                  1.2.1. <i>Privacy Policy.</i> To use our Services, you must
                  register with us and submit certain personally identifiable
                  information. You expressly agree that we may collect,
                  disclose, store and otherwise use your information in
                  accordance with the terms of the Cantaloupe{' '}
                  <Link href="/privacy-policy">
                    <Anchor>Privacy Policy</Anchor>
                  </Link>
                  , which is hereby incorporated by reference.
                </IndentedParagraph>
                <IndentedParagraph>
                  1.2.2. <i>Prepaid Card Terms.</i> To the extent you enroll,
                  access or use any prepaid card or related account made
                  available by Cantaloupe in connection with the Services,{' '}
                  <Anchor
                    href="https://getmore.cantaloupe.com/morecard_terms_conditions.html"
                    target="_blank"
                    rel="noopener noreferrer">
                    Cantaloupe’s Prepaid &#38; Loyalty (P&#38;L) Card Terms and
                    Conditions
                  </Anchor>{' '}
                  shall apply and are hereby incorporated by reference.
                </IndentedParagraph>
                <IndentedParagraph>
                  1.2.3. <i>Credit/Debit Card Terms.</i> To the extent you
                  enroll a credit or debit card for use in connection with the
                  Services,{' '}
                  <Anchor
                    href="https://getmore.cantaloupe.com/allcards_terms_conditions.html"
                    target="_blank"
                    rel="noopener noreferrer">
                    Cantaloupe’s Loyalty &#38; Rewards Program Terms and
                    Conditions
                  </Anchor>{' '}
                  shall apply and are hereby incorporated by reference.
                </IndentedParagraph>
                <IndentedParagraph>
                  1.2.4. <i>Bakkt Terms.</i> The Services enable your use of a
                  Bakkt account and related services (“Bakkt Services”) in
                  connection with the Services. Bakkt enables you to buy, sell,
                  and use cryptocurrency in connection with the Services. The
                  Bakkt Services are provided by a third-party and are subject
                  to the corresponding agreements, including Bakkt’s applicable
                  privacy policy, which are between you and Bakkt. You
                  acknowledge and agree that Cantaloupe is not responsible for,
                  and you hereby hold Cantaloupe harmless from, the Bakkt
                  Services and any issues arising therefrom. Section 1.12 below
                  shall also apply to the Bakkt services.{' '}
                </IndentedParagraph>
                <IndentedParagraph>
                  1.2.5. <i>Mastercard Merchant Funded Offers.</i> To the extent
                  MasterCard merchant-funded offers (“MC Offers”) are made
                  available to you in connection with the Services, the
                  additional terms set forth in the MC Offers addendum at this
                  end of these Terms apply to you.
                </IndentedParagraph>
                <IndentedParagraph>
                  1.2.6. <i>Additional Third-Party Terms.</i> The Services may
                  also integrate with, incorporate or otherwise provide access
                  to other third-party products and services. Such third-party
                  services and products are subject to Section 1.12 below.
                </IndentedParagraph>
                <p>
                  1.3. <u>Establishing a MORE Account.</u> When you accept these
                  Terms (for example, when first registering a Payment Account
                  through the Services), you are creating a MORE Account.
                  Depending on the Services you use, you may be asked to provide
                  information such as your name, contact information, Payment
                  Account information (including your bank name, routing number
                  and account number for the account, if applicable), date of
                  birth, and/or your social security number. Cantaloupe may
                  verify your registration information with a third-party
                  verification service provider. We may also ask you to answer
                  additional questions to help us verify your identity or
                  provide additional information, such as a copy of your photo
                  ID (e.g. driver’s license or passport). The information you
                  provide will be used to determine if you are eligible to use
                  the Services. In order to use the Transaction Service and make
                  Transactions, you must provide all information required and
                  register a valid Payment Account. You authorize Cantaloupe to
                  confirm that your Payment Account is in good standing with the
                  issuing financial institution, including by submitting a
                  request for a payment authorization and/or a low dollar credit
                  and/or debit to the Payment Account in accordance with the
                  relevant card association rules. Cantaloupe may refuse to
                  approve, or may terminate existing, registrations for the
                  Transaction Service with or without cause or notice to the
                  extent permitted by applicable law.
                </p>
                <p>
                  1.4. <u>Transaction Service.</u> The Transaction Service
                  facilitates a purchase by a Purchaser (using a Payment
                  Account) from a Seller that is registered with, or otherwise
                  enabled by, Cantaloupe or its customers or partners to receive
                  certain payment processing services. The Transaction Service
                  stores information from Purchasers, such as their Payment
                  Accounts. When Purchaser chooses to pay for Products with the
                  Transaction Service, Purchaser authorizes the Seller to submit
                  charges (and, in the case of refunds, credits) to Purchaser’s
                  registered Payment Account. Cantaloupe may assist the Seller
                  in accessing a payment network and processing the Transaction.
                  Once Purchaser’s registered Payment Account is authorized,
                  Purchaser’s payment obligation to Seller shall be deemed
                  completed and discharged (except for Purchaser’s obligations
                  in the event of a chargeback or other reversal). Purchases
                  made through the Transaction Service are also subject to the
                  terms and conditions governing Purchaser’s Payment Account
                  between Purchaser and the issuer of the Payment Account.
                  Purchaser is responsible for any charges and related fees that
                  may be imposed under the Payment Account terms and conditions
                  as a result of Purchaser’s use of a Payment Account. You
                  acknowledge and agree that your purchases of Products are
                  transactions between you and the Seller, and not with
                  Cantaloupe. Cantaloupe is not a party to your Transaction for
                  the purchase of Products, and Cantaloupe is not a Purchaser or
                  a Seller in connection with any Transaction, unless expressly
                  designated as such in the listing of the Product. You also
                  agree that Cantaloupe may update your Payment Account
                  information, including expiration date and card number, due to
                  information received under certain account updater programs
                  created by payment networks. Under these programs, enrolled
                  card issuers and merchants can provide and receive up-to-date
                  payment card-related information from payment networks
                  regarding your Payment Accounts stored by Cantaloupe.
                  Cantaloupe may reflect these changes to your stored Payment
                  Account to prevent payment failure or service termination. You
                  also agree that a Seller and Cantaloupe, acting on behalf of
                  the Seller, may resubmit a Transaction for a Product purchase
                  to the payment network for processing one or more times in the
                  event that a prior Transaction is declined or returned by the
                  payment network.
                </p>
                <p>
                  1.5. <u>Transaction Service Fees.</u> Cantaloupe does not
                  charge a fee to use the Transaction Service as a Purchaser.
                  The financial institution that issues your Payment Account may
                  charge a fee in connection with the debiting or charging of
                  the Payment Account resulting from the Transaction. You should
                  consult the terms and conditions governing your Payment
                  Account for more information about any such fees.
                </p>
                <p>
                  1.6. <u>Refunds.</u> Except as set forth in these Terms, all
                  Transactions processed through the Transaction Service are
                  non-refundable to Purchaser by Cantaloupe and are
                  non-reversible by Purchaser through the Transaction Service.
                  You may have additional refund or charge-back rights under
                  your Payment Account issuer agreement or applicable state and
                  federal laws. You should review your periodic statement
                  received from the issuer of your Payment Account which will
                  reflect all purchase transactions through the Transaction
                  Service.
                </p>
                <p>
                  1.7. <u>Permissible Transactions.</u> You may only use the
                  Transaction Service to process a Transaction for a Product
                  that is purchased from a Seller through a legitimate, bona
                  fide sale of the Product. The Transaction Service may not be
                  used to process a Transaction, or otherwise transfer money
                  between a Purchaser and Seller, that is unrelated to a
                  purchase of a Product. The Transaction Service may not be used
                  to receive cash advances from Sellers or to facilitate the
                  purchase of cash equivalents (travelers checks, prepaid cards,
                  money orders, etc.). You may not use the Transaction Service
                  to purchase any illegal goods or services or for any other
                  underlying illegal transaction. You agree that you will not
                  use the Transaction Service to purchase any Products that
                  violate these Terms, other policies or rules applicable to the
                  Transaction Service, or applicable law. Failure to comply with
                  these limitations may result in suspension or termination of
                  your use of the Transaction Service.
                </p>
                <p>
                  1.8. <u>No Endorsement of Products.</u> Cantaloupe does not
                  represent or endorse, and shall not be responsible for: (a)
                  the reliability or performance of any Seller, merchant or
                  Third Party Provider; (b) the safety, quality, accuracy,
                  reliability, integrity or legality of any Products; (c) the
                  truth or accuracy of the description of any Product, or of any
                  advice, opinion, offer, proposal, statement, data or other
                  information (collectively, “TP Content”) displayed or
                  distributed, purchased or paid through the Services; or (d)
                  your ability to buy Products using the Services. Cantaloupe
                  hereby disclaims any liability or responsibility for errors or
                  omissions in any TP Content. Cantaloupe reserves the right,
                  but shall have no responsibility, to edit, modify, refuse to
                  post or remove any TP Content, in whole or in part, that in
                  its sole and absolute discretion is objectionable, erroneous,
                  illegal, fraudulent or otherwise in violation of these Terms.
                </p>
                <p>
                  1.9. <u>Not a Banking Institution or Issuer.</u> Cantaloupe is
                  not a bank or other chartered depository institution. Except
                  as otherwise expressly contemplated, Cantaloupe is not an
                  issuer of any Payment Account. These Terms do not amend or
                  otherwise modify your agreement with the issuer of your
                  Payment Account, and you are responsible for ensuring your use
                  of the Services complies with such agreements. Use of the
                  Services is not approved by or offered in conjunction with the
                  issuer of your Payment Account. Your Payment Account issuer
                  may impose fees, transaction limits, or other limitations on
                  transactions incurred using the Services. In the event of any
                  inconsistency between these Terms and your agreement with the
                  issuer of your Payment Account, these Terms govern the
                  relationship between you and Cantaloupe solely with respect to
                  the Services, and your agreement with the issuer of your
                  Payment Account governs the relationship between you and the
                  issuer of such item. You acknowledge and agree that you are
                  solely responsible for the Payment Account, and any other
                  information you enter or otherwise store in connection with
                  the Services. Cantaloupe is not responsible for the accuracy
                  or availability of any information you enter or otherwise
                  store with the Services, including, without limitation,
                  whether such information is current and up-to-date.
                </p>
                <p>
                  1.10. <u>Communication with Issuers.</u> By electing to use
                  the Services, you authorize Cantaloupe, directly or through
                  such Services, to communicate with the issuer of your Payment
                  Account to provide or obtain any information required by that
                  issuer. In providing this information, an issuer does not
                  endorse and is not responsible for the Services.
                </p>
                <p>
                  1.11. <u>Third Party Providers.</u> Cantaloupe may arrange for
                  third-party providers to provide Products to you through the
                  Services (“Third Party Providers”). In order to use these
                  Products, you may be required to agree to additional terms and
                  conditions from those Third Party Providers, and may be
                  subject to additional requirements of the Third Party
                  Provider. By agreeing to these Terms or continuing to use the
                  Services, you hereby agree to any Third Party Provider terms
                  that apply to your use of such Products and the Services,
                  which may be updated from time to time. For avoidance of
                  doubt, these Third Party Provider terms are between you and
                  the applicable Third Party Provider, not Cantaloupe. We may,
                  but do not have any obligation to, block information,
                  transmissions or access to certain information, services,
                  products or domains to protect the Services, our network, the
                  public or our users. We are not a publisher of third-party
                  content accessed through the Services and are not responsible
                  for the content, accuracy, timeliness or delivery of any
                  opinions, advice, statements, messages, services, graphics,
                  data or any other information provided to or by third parties
                  as accessible through the Services.
                </p>
                <p>
                  1.12.{' '}
                  <u>Sharing Payment Account Details with Third Parties.</u>{' '}
                  Where requested by you, Cantaloupe may pass details of your
                  Payment Account and related information to a third party for
                  that third party to charge the Payment Account for goods or
                  services it will supply to you. You acknowledge and agree that
                  your purchases made are transactions between you and the third
                  party and not with Cantaloupe. You should contact the third
                  party or your Payment Account issuer directly regarding any
                  issues with such third-party transactions, including refunds
                  and disputes.
                </p>
                <p>
                  1.13. <u>Geo-Location Data.</u> Cantaloupe may use your
                  geo-location data if you authorize Cantaloupe to do so.
                  Additionally, the Services may incorporate an API for a
                  mapping or location service. If such a service is
                  incorporated, by accessing or using our Services, you hereby
                  agree to be bound by terms of service and privacy policy
                  applicable to that service.
                </p>
                <p>
                  1.14. <u>Disclaimer.</u> CANTALOUPE IS NOT RESPONSIBLE FOR THE
                  ACCURACY OF ANY PAYMENT ACCOUNT INFORMATION, INCLUDING,
                  WITHOUT LIMITATION, WHETHER SUCH INFORMATION IS CURRENT AND
                  UP-TO-DATE. WITHOUT LIMITING THE GENERALITY OF THE PRECEDING
                  SENTENCE, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT SUCH
                  INFORMATION IS REPORTED BY THE ISSUER AS OF A PARTICULAR TIME
                  ESTABLISHED BY THE ISSUER AND MAY NOT ACCURATELY REFLECT YOUR
                  CURRENT TRANSACTIONS, AVAILABLE BALANCE, OR OTHER ACCOUNT OR
                  PROGRAM DETAILS AT THE TIME THEY ARE DISPLAYED TO YOU THROUGH
                  THE SERVICES OR AT THE TIME YOU MAKE A PURCHASE. YOU MAY INCUR
                  FEES, SUCH AS OVERDRAFT FEES OR OTHER CHARGES AS A RESULT OF
                  SUCH TRANSACTIONS, PER YOUR AGREEMENT WITH YOUR PAYMENT
                  ACCOUNT ISSUER, OR YOUR ATTEMPT TO MAKE A PURCHASE MAY NOT BE
                  SUCCESSFUL.
                </p>
                <H2>2. Your Eligibility; Your Responsibility</H2>
                <p>
                  To be eligible to use the Services, you represent and warrant
                  that you: (i) are at least 18 years of age, or otherwise over
                  the age of majority in the jurisdiction in which you reside;
                  (ii) are not currently restricted from the Services and are
                  not otherwise prohibited from having an account related
                  thereto; (iii) will only provide accurate information to
                  Cantaloupe; (iv) have full power and authority to enter into
                  these Terms and doing so will not violate any other agreement
                  to which you are a party; and (v) will not violate any rights
                  of Cantaloupe or a third party.
                </p>
                <p>
                  You assume all responsibility for your use of, and access to,
                  the Services. Accounts are for a single user, company or other
                  legal entity, as applicable. Any multiple-party use, other
                  than individual use on behalf of a company or other legal
                  entity, is prohibited. For example, sharing a login between
                  non-entity individual users is prohibited.
                </p>
                <H2>3. Personal Information; Your Content; Your Account</H2>
                <p>
                  3.1. <u>Accuracy.</u> By registering for our Services, you
                  represent and warrant that all information you submit to us is
                  true, accurate, current and complete and that you will
                  promptly notify us in writing if your information changes. It
                  is your responsibility to keep your account and profile
                  information accurate and updated. We are not responsible for
                  any disputes or claims related to any inaccurate, incomplete,
                  or untimely information provided by you to us.
                </p>
                <p>
                  3.2. <u>Your Content.</u> As between you and Cantaloupe, you
                  own the information, materials, photos, or other content (the
                  “Content”) you provide Cantaloupe under this Agreement. Any
                  Content that you upload or otherwise provide to Cantaloupe in
                  connection with the Services may be used by Cantaloupe in
                  order to provide and promote the Services or Cantaloupe’s
                  business. Accordingly, you grant to Cantaloupe, and all of its
                  subsidiaries, affiliates, successors, and assigns, a
                  worldwide, perpetual, royalty-free, fully paid, sublicensable,
                  non-exclusive, and transferable right to use, publish,
                  reproduce, distribute, modify, prepare derivative works of,
                  adapt, publicly display and otherwise use the Content. Such
                  right to use such Content shall survive the termination of
                  these Terms and termination of the Services. You authorize us
                  to use, forward, or post your profile or related information
                  on other sites and services. Notwithstanding the foregoing,
                  you retain all rights to the Content, except as otherwise
                  provided herein or as otherwise provided in any other
                  agreement between you and Cantaloupe. Any Content you submit
                  to us is provided at your own risk of loss. You are solely
                  responsible for all Content you share, provide, display,
                  publish, or disseminate to others, whether such action was
                  taken by us or you. By providing Content to us, you represent
                  and warrant that you are entitled to submit it and that it is
                  not confidential and not in violation of any law, contractual
                  restrictions or other third party rights (including any
                  intellectual property rights). Cantaloupe may also remove or
                  delete your Content from the Services at any time in its sole
                  discretion.
                </p>
                <p>
                  3.3. <u>Your Account.</u> Except for your Content licensed to
                  us as set forth above, the MORE Account (and any other account
                  you create with us) and any related profile is owned by us.
                  With regard to your account, you agree to: (i) keep your
                  password secure and confidential; (ii) not permit others to
                  use your account; (iii) not use the accounts of others; (iv)
                  not transfer your account to another party; and (v) notify us
                  of any actual or suspected unauthorized use of your account.
                  You are responsible for any activity occurring under your
                  account.
                </p>
                <p>
                  3.4. <u>Feedback.</u> You may from time to time identify
                  problems, solutions to identified problems, provide
                  suggestions, comments or other feedback related to our
                  Services or otherwise relating to Cantaloupe (“Feedback”) to
                  Cantaloupe. You acknowledge and agree that all Feedback is and
                  shall be given entirely voluntarily and Cantaloupe shall be
                  free to use or disclose such Feedback for any purpose. You
                  further acknowledge and agree that your Feedback does not
                  contain confidential or proprietary information and you are
                  not entitled to any compensation or reimbursement of any kind
                  from Cantaloupe under any circumstances relating to such
                  Feedback.
                </p>
                <H2>4. Personal Use; Limited License; Ownership</H2>
                <p>
                  Subject to the terms and conditions herein, Cantaloupe grants
                  you a limited, revocable, non-transferable, non-sublicensable,
                  non-exclusive license and right to access the Services through
                  a generally available mobile device, web browser or Cantaloupe
                  authorized website to view content and information and
                  otherwise use the Services to the extent intended and
                  permitted by the functionality thereof. This license is
                  personal to you, and you may not resell our Services, permit
                  other users access to our Services through your account, or
                  use the Services to host content for others. You may not copy
                  or download any content from the Services except with the
                  prior written approval of Cantaloupe. You acknowledge that,
                  except as otherwise expressly provided, these Terms are solely
                  between you and Cantaloupe.
                </p>
                <p>
                  Furthermore, without the prior written approval of Cantaloupe,
                  you may not distribute, publicly perform or display, lease,
                  sell, transmit, transfer, publish, edit, copy, create
                  derivative works from, rent, sub-license, distribute,
                  decompile, disassemble, reverse engineer or otherwise make
                  unauthorized use of the Services. Any commercial use not
                  expressly authorized is prohibited. You agree not to remove,
                  obscure, or alter copyright, patent, trademark, or other
                  proprietary rights notices affixed to the Services. Your
                  rights are subject to your compliance with these Terms as well
                  as any other agreements applicable to the Services you are
                  using. The Services provided by Cantaloupe are licensed, not
                  sold. The Services, and all copies of the Services, are owned
                  by Cantaloupe or its third party licensors and are protected
                  by various intellectual property laws, including, without
                  limitation, copyright and trade secret laws. Cantaloupe
                  reserves all rights not expressly granted to you herein. You
                  agree that you have no right to any Cantaloupe trademark or
                  service mark and may not use any such mark in any way unless
                  expressly authorized by Cantaloupe.
                </p>
                <p>
                  Making unauthorized copies or distribution of Services content
                  or otherwise violating these Terms may result in the
                  termination of your MORE Account, prohibition on use of the
                  Services, and further legal action. Cantaloupe reserves the
                  right to limit your use of or access to the Services, in its
                  sole discretion in order to maintain the performance and
                  availability of the Services and to enforce these Terms.
                </p>
                <p>
                  Cantaloupe is not liable for the loss, corruption, alteration
                  or removal of any content transmitted using our Services. By
                  using our Services, you expressly waive the right to seek
                  damages and agree to hold Cantaloupe harmless for any such
                  loss, alteration, corruption or removal. You acknowledge and
                  agree that you are solely responsible for retaining all
                  records and reconciling all transaction information relating
                  to your use of the Services.
                </p>
                <H2>5. Fees; Payment Terms; Credits</H2>
                <p>
                  If you purchase any Services that we offer for a fee (“Paid
                  Services”), you agree to pay the applicable fees for the Paid
                  Services when due plus all related taxes. All applicable taxes
                  are calculated based on the billing information you provide us
                  at the time of purchase. Unless otherwise denoted, all fees
                  are assessed in U.S. dollars. You also agree that Cantaloupe
                  and its third-party service providers providing payment
                  processing services may store your payment information. We may
                  charge your payment information for subsequent charges you
                  authorize, such as account upgrades or other special charges
                  authorized by you. If the payment method you use with us
                  reaches its expiration date and you do not edit the applicable
                  information or cancel such Paid Service, you authorize us to
                  continue billing that payment method and you remain
                  responsible for any uncollected amounts.
                </p>
                <p>
                  Cantaloupe may offer certain customers free trials to Paid
                  Services. If you purchase a subscription to a Paid Service
                  that includes a free trial, you will receive free access to
                  such Paid Service for the duration of the free trial period.
                  At the end of the applicable free trial period, you will be
                  charged the price of the subscription for such Paid Service
                  and may continue to be charged until you cancel your
                  subscription. To avoid charges, you must cancel before the end
                  of the free trial period.
                </p>
                <p>
                  Failure to pay may result in the termination of your
                  subscription. You may cancel or suspend your Paid Services by
                  contacting Cantaloupe at customerservice@cantaloupe.com.
                  Unless expressly stated to the contrary, we do not guarantee
                  refunds for lack of usage, dissatisfaction or any other
                  reason. Paid Services may be subject to additional terms, in
                  addition to these Terms, related to the provision of the Paid
                  Service.
                </p>
                <H2>6. Acceptable Use Policy</H2>
                <p>
                  You agree to comply with all applicable laws and regulations
                  in connection with your use of the Services. You may not use
                  our Services to post or transmit any illegal material,
                  including without limitation any transmissions that would
                  constitute a criminal offense, give rise to civil liability,
                  or otherwise violate any local, state, national or
                  international law or regulation. In particular, the following
                  is a representative, non-exhaustive list of acts that are
                  prohibited:
                </p>
                <ul>
                  <li>Using the Services while operating a motor vehicle;</li>
                  <li>
                    Acts that may materially and adversely affect the quality of
                    other users’ experience;
                  </li>
                  <li>
                    Actual or attempted unauthorized use or sabotage of any
                    computers, machines or networks;
                  </li>
                  <li>
                    Introducing malicious programs into Cantaloupe’s Services,
                    network or servers (e.g. viruses, worms, Trojan horses,
                    etc.);
                  </li>
                  <li>
                    Engaging in any monitoring or interception of data not
                    intended for you without authorization;
                  </li>
                  <li>
                    Attempting to circumvent authentication or security of any
                    host, network, or account without authorization;
                  </li>
                  <li>
                    Reverse engineer, decompile, disassemble, decipher or
                    otherwise attempt to derive the source code for any
                    underlying intellectual property used to provide the
                    Services, or any part thereof;
                  </li>
                  <li>
                    Adapt, modify or create derivative works based on the
                    Services, technology underlying the Services, or other
                    users’ content, in whole or part;
                  </li>
                  <li>
                    Duplicate, license, sublicense, publish, broadcast,
                    transmit, distribute, perform, display, sell, rebrand, or
                    otherwise transfer information found on the Services
                    (excluding content posted by you) except as permitted in
                    these Terms, or as expressly authorized by Cantaloupe in
                    writing;
                  </li>
                  <li>
                    Using any method, software or program designed to collect
                    identity information, authentication credentials, or other
                    information;
                  </li>
                  <li>
                    Transmitting or receiving, uploading, using or reusing
                    material that is abusive, indecent, defamatory, harassing,
                    obscene or menacing, or a breach of confidence, privacy or
                    similar third party rights;
                  </li>
                  <li>
                    Transmitting or receiving, uploading, using or reusing
                    material that violates any intellectual property rights of a
                    third party, including, without limitation, patents,
                    trademarks, trade secrets or copyrights;
                  </li>
                  <li>
                    Transmitting, receiving, uploading, using or reusing
                    material that you do not have a right to transmit under any
                    law or under contractual or fiduciary relationships (such as
                    inside information, proprietary and confidential information
                    learned or disclosed as part of employment relationships or
                    under nondisclosure agreements);
                  </li>
                  <li>Falsifying user identification information;</li>
                  <li>
                    Using the Services for anything other than lawful purposes
                    including, but not limited to, intentionally or
                    unintentionally violating any applicable local, state,
                    national or international law; or
                  </li>
                  <li>
                    Impersonating any person or entity, including, but not
                    limited to, a Cantaloupe representative, or falsely stating
                    or otherwise misrepresenting your affiliation with a person
                    or entity.
                  </li>
                </ul>
                <H2>7. Copyright Protected Materials</H2>
                <p>
                  Cantaloupe respects the intellectual property rights of others
                  and expects that you do the same. It is our policy to
                  terminate, in appropriate circumstances, the accounts of
                  subscribers who infringe the copyrights of others. You may not
                  upload, download, post, publish, transmit, reproduce, or
                  distribute in any way, files, material, information, software
                  or other material obtained through the Services that is
                  protected by copyright or other proprietary right or
                  derivative works with respect thereto, without obtaining
                  permission of the copyright owner or other right holder.
                  Cantaloupe has the right, but not the obligation, to remove
                  from the Services any files, material, information, software
                  or other material Cantaloupe believes is or may be, in its
                  sole discretion, infringing or otherwise in violation of the
                  rights of others.
                </p>
                <p>
                  If you believe in good faith that your copyright has been
                  infringed, please provide a written communication regarding
                  such belief to legal@cantaloupe.com.
                </p>
                <H2>8. Right to Restrict or Terminate Access</H2>
                <p>
                  Cantaloupe may deny or restrict your access to all or part of
                  the Services without notice in its reasonable discretion if it
                  deems that you have engaged in any conduct or activities that
                  Cantaloupe in its reasonable discretion believes violates the
                  letter or spirit of any of these Terms. If Cantaloupe denies
                  or restricts your access to the Services because of such a
                  violation, you shall have no right to obtain any refund or
                  credit for the subscriptions fees you have paid.
                </p>
                <p>
                  Cantaloupe may at any time choose to suspend indefinitely or
                  terminate the Services for any purpose. In the event that
                  these Terms or the Services are terminated for any reason or
                  no reason, you acknowledge and agree that you will continue to
                  be bound by these Terms. Following termination, you shall
                  immediately cease use of the Services and any license granted
                  to you under any agreement related to your use of the Services
                  shall immediately terminate. Upon termination, Cantaloupe
                  reserves the right to delete all of your Content, data, and
                  other information stored on Cantaloupe’s servers. Cantaloupe
                  will not be liable to you or any third party as a result of
                  the termination of these Terms or the Services or for any
                  actions taken by Cantaloupe pursuant to these Terms as a
                  result of such termination. Without limiting the generality of
                  the foregoing, Cantaloupe will not be liable to you or any
                  third party for damages, compensation, or reimbursement
                  relating to your use of the Services, or the termination
                  thereof.
                </p>
                <p>
                  You may terminate these Terms by terminating your use of the
                  Services and any related account. Cantaloupe may terminate
                  these Terms or suspend your use or access of the Services at
                  any time upon written notice to you. Any sections or terms
                  which by their nature should survive or are otherwise
                  necessary to enforce the purpose of these Terms, will survive
                  the termination of these Terms and termination of the
                  Services. Termination of these Terms or the Services does not
                  relieve you from your obligation to pay Cantaloupe any amounts
                  owed to Cantaloupe.
                </p>
                <H2>9. Security</H2>
                <p>
                  You acknowledge and agree that you are solely responsible for
                  protecting your password and other personal information and
                  for the consequences of not protecting such data. Access to
                  our Services and to certain online transactions may involve
                  the use of identification numbers, passwords, payment accounts
                  or other individualized nonpublic information (“Private
                  Documentation”). You shall use your best efforts to prevent
                  unauthorized use of our Services, your account, or of any
                  Private Documentation, and shall promptly report to Cantaloupe
                  any suspected unauthorized use or other breach of security.
                  You shall be responsible for any unauthorized use of your
                  account, identification numbers or passwords until we receive
                  written notice of a breach of security and a request to block
                  further access for such numbers and passwords. Cantaloupe
                  shall not be liable for any unauthorized use of payment
                  accounts.
                </p>
                <H2>10. Disclaimer of Warranty</H2>
                <p>
                  Actual service coverage, speeds, locations and quality may
                  vary. Cantaloupe will attempt to provide the Services at all
                  times, except for limited periods for maintenance and repair.
                  However, the Services may be subject to unavailability for a
                  variety of factors beyond our control including emergencies,
                  third-party service failures, transmission, equipment or
                  network problems or limitations, interference, signal
                  strength, and may be interrupted, limited or curtailed. Delays
                  or omissions may occur. We are not responsible for data,
                  messages or pages lost, not delivered, delayed or misdirected
                  because of interruptions or performance issues with the
                  Services or communications services or networks. We may impose
                  usage or Services limits, suspend the Services, or block
                  certain kinds of usage in our sole discretion to protect users
                  or the Services. The accuracy and timeliness of data received
                  is not guaranteed.
                </p>
                <p>
                  YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. ALL CONTENT AND
                  THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
                  BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS, STATUTORY OR
                  IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES
                  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
                  CUSTOM, TRADE, QUIET ENJOYMENT, NONINFRINGEMENT, AVAILABILITY
                  OR ACCURACY OF INFORMATION. CANTALOUPE DOES NOT WARRANT THAT
                  THE SERVICES WILL BE AVAILABLE, WILL MEET YOUR REQUIREMENTS OR
                  WILL OPERATE IN AN UNINTERRUPTED, ERROR-FREE OR COMPLETELY
                  SECURE MANNER OR THAT ERRORS OR DEFECTS WILL BE CORRECTED.
                  CANTALOUPE DOES NOT MAKE ANY REPRESENTATIONS, WARRANTIES, OR
                  CONDITIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE
                  SERVICES, IN TERMS OF THEIR ACCURACY, RELIABILITY, TIMELINESS,
                  COMPLETENESS, OR OTHERWISE.
                </p>
                <p>
                  SOME JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR LIMITATION
                  OF IMPLIED WARRANTIES OR CONDITIONS, OR ALLOW LIMITATIONS ON
                  HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS
                  OR EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH EVENT,
                  CANTALOUPE’S WARRANTIES AND CONDITIONS WITH RESPECT TO THE
                  SERVICES WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY
                  APPLICABLE LAW IN SUCH JURISDICTION.
                </p>
                <H2>11. Limitation of Liability</H2>
                <p>
                  UNDER NO CIRCUMSTANCES WILL CANTALOUPE, ITS AFFILIATES,
                  EMPLOYEES, AGENTS, REPRESENTATIVES, LICENSORS OR OTHER THIRD
                  PARTY PARTNERS (“CANTALOUPE PARTIES”) BE LIABLE TO YOU OR ANY
                  OTHER PERSON FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL,
                  EXEMPLARY OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE,
                  INABILITY TO USE, OR THE RESULTS OF USE OF OUR SERVICES,
                  WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
                  NEGLIGENCE), OR ANY OTHER LEGAL THEORY; INCLUDING WITHOUT
                  LIMITATION DAMAGES RESULTING FROM LOST PROFITS, LOST DATA,
                  LOSS OF BUSINESS OR BUSINESS INTERRUPTION, WHETHER DIRECT OR
                  INDIRECT, ARISING OUT OF THE USE, INABILITY TO USE, OR THE
                  RESULTS OF USE OF OUR SERVICES, WHETHER BASED ON WARRANTY,
                  CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL
                  THEORY.
                </p>
                <p>
                  A CANTALOUPE PARTY’S TOTAL CUMULATIVE LIABILITY SHALL IN NO
                  EVENT EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID
                  CANTALOUPE FOR YOUR USE OF THE SERVICES IN THE PRIOR THREE (3)
                  MONTHS; AND (B) THE SUM OF ONE HUNDRED (100) US DOLLARS.
                </p>
                <p>
                  SOME STATES OR JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR
                  THE LIMITATION OF LIABILITY. IN SUCH STATES OR JURISDICTIONS,
                  THE CANTALOUPE PARTIES’ LIABILITY TO YOU SHALL BE LIMITED TO
                  THE FULL EXTENT PERMITTED BY LAW.
                </p>
                <p>
                  EACH PROVISION OF THESE TERMS THAT PROVIDES FOR A LIMITATION
                  OF LIABILITY, DISCLAIMER OF WARRANTIES, OR EXCLUSION OF
                  DAMAGES IS TO ALLOCATE THE RISKS OF THIS AGREEMENT BETWEEN THE
                  PARTIES. THIS ALLOCATION IS REFLECTED IN THE PRICING OFFERED
                  BY CANTALOUPE TO YOU AND IS AN ESSENTIAL ELEMENT OF THE BASIS
                  OF THE BARGAIN BETWEEN THE PARTIES. EACH OF THESE PROVISIONS
                  IS SEVERABLE AND INDEPENDENT OF ALL OTHER PROVISIONS OF THESE
                  TERMS. THE LIMITATIONS IN THIS SECTION AND THE SECTION ABOVE
                  WILL APPLY NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF
                  ANY LIMITED REMEDY IN THIS AGREEMENT.
                </p>
                <H2>12. Indemnity</H2>
                <p>
                  You agree to defend, indemnify and hold the Cantaloupe Parties
                  harmless from any claim or demand, including reasonable
                  attorneys’ fees, made by any third party arising out of or
                  relating to (i) any violation of these Terms by you; (ii) your
                  Content or any other content or material you submit or
                  otherwise transmit through our Services; (iii) your violation
                  of any rights of another; or (iv) your use of the Services.
                  Cantaloupe reserves the right, at its own expense, to assume
                  the exclusive defense and control of any matter otherwise
                  subject to defense by you.
                </p>
                <H2>13. Dispute Resolution</H2>
                <p>
                  Excluding claims for injunctive or other equitable relief, for
                  any claim where the total amount of the award sought is less
                  than $10,000, the party requesting relief may elect to resolve
                  the dispute through binding non-appearance-based arbitration.
                  In the event a party elects arbitration, they shall initiate
                  such arbitration through an established alternative dispute
                  resolution provider mutually agreed upon by the parties. The
                  arbitration shall be conducted by telephone, online or be
                  solely based on written submissions; the specific manner shall
                  be chosen by the party initiating the arbitration. The
                  arbitration shall not require any personal appearance by the
                  parties or witnesses unless otherwise mutually agreed by the
                  parties. Any judgment on the award rendered by the arbitrator
                  shall be final and may be entered in any court of competent
                  jurisdiction. You agree that any dispute resolution
                  proceedings will be conducted only on an individual basis and
                  not in a class, consolidated or representative action. If for
                  any reason a claim proceeds in court rather than in
                  arbitration each party waives any right to a jury trial.
                </p>
                <H2>14. Electronic Notices and Disclosures</H2>
                <p>
                  You acknowledge and agree that Cantaloupe may provide notices
                  and other disclosures to you electronically by posting such
                  notices or other disclosures on Cantaloupe’s website or by
                  emailing it to you at any email address provided to Cantaloupe
                  by you. Such notices or other disclosures shall be considered
                  received by you following the posting on the website or
                  twenty-four (24) hours following the email being sent to you,
                  as applicable. Any such electronic notice or other disclosure
                  shall have the same effect and meaning as if it had been
                  provided to you as a paper copy.
                </p>
                <H2>15. Changes to the Terms</H2>
                <p>
                  We may add to, change or remove any part of these Terms, at
                  any time without prior notice to you other than listing of a
                  later effective date than the one set forth at the top of
                  these Terms. Such modification shall be effective immediately
                  upon posting at the website page hosting these Terms. As your
                  next visit to or use of the Services may be governed by
                  different Terms, we encourage you to look for a new effective
                  date on these Terms when you visit or use the Services. It is
                  your responsibility to check these Terms periodically for
                  changes. If we make any material changes to these Terms, we
                  will endeavor to provide registered users with additional
                  notice of any changes, such as at your e-mail address of
                  record or when you log-in to your account.
                </p>
                <p>
                  Your use or continued use of the Services following the
                  posting or notice of any changes to these Terms or any other
                  posted policies shall constitute your acceptance of the
                  changed Terms or policies.
                </p>
                <H2>16. Definitions</H2>
                <p>
                  16.1. “MORE Account” means the account assigned to you by
                  Cantaloupe when you accept these Terms.
                </p>
                <p>
                  16.2. “Payment Account” means a credit card, debit card,
                  prepaid card, Bakkt account, and/or other financial account
                  that is registered in your MORE Account.
                </p>
                <p>
                  16.3. “Product(s)” means any merchandise, good or service that
                  a Purchaser may purchase using the Services.
                </p>
                <p>
                  16.4. “Purchaser” means a person using the Services to
                  purchase goods or services from, or to otherwise make a
                  payment to, a Seller.
                </p>
                <p>
                  16.5. “Seller” means a person or entity who uses the
                  Transaction Service to process Transactions from Purchasers.
                </p>
                <p>
                  16.6. “Transaction” means the processing of a payment that
                  results in the debiting, charging, or other related
                  transaction of the Transaction Amount to a Purchaser’s Payment
                  Account.
                </p>
                <p>
                  16.7. “Transaction Amount” means the dollar amount of a
                  Transaction to pay for a Product, and any related fees, taxes
                  or charges, as applicable.
                </p>
                <p>
                  16.8. “Transaction Service” means the service by which
                  Cantaloupe holds a Purchaser’s registered Payment Account
                  information in Purchaser’s MORE Account and, at the time of
                  Purchaser’s purchase from, or other payment to, a Seller using
                  such Payment Account, Cantaloupe provides such information to
                  Seller (or Seller’s card processor, including potentially
                  Cantaloupe itself) for processing through a payment network,
                  which Seller, in turn, provides to the issuer of Purchaser’s
                  Payment Account for approval and financial settlement through
                  a payment network to the Seller.
                </p>
                <H2>17. Miscellaneous</H2>
                <p>
                  These Terms, along with any rules, guidelines, or policies
                  published on the Cantaloupe homepage constitute the entire
                  agreement between Cantaloupe and you with respect to your use
                  of our Services. If there is any conflict between the Terms
                  and any other rules or instructions posted on the Services,
                  the Terms shall control. No amendment to these Terms by you by
                  shall be effective unless acknowledged in writing by
                  Cantaloupe. Notwithstanding the foregoing, Cantaloupe reserves
                  the right, in its sole discretion, to modify these Terms or
                  the policies referenced herein at any time as set forth above.
                  These Terms shall be governed by, and construed in accordance
                  with, the laws of the state of Georgia, without reference to
                  its choice of law rules. Subject to the arbitration provisions
                  above, exclusive venue for any action arising out of or in
                  connection with this agreement shall be in Atlanta, Georgia.
                  The parties each hereby consent to the jurisdiction and venue
                  in Atlanta, Georgia and waive any objections to such
                  jurisdiction and venue. Notwithstanding the foregoing, you
                  agree that Cantaloupe shall be entitled to apply for
                  injunctive remedies or other equitable relief in any
                  jurisdiction. Subject to any applicable law to the contrary,
                  you agree that any cause of action arising out of or related
                  to the use of our Services must be commenced within one (1)
                  year after the cause of action accrues, or such action will be
                  permanently barred. If any portion of these Terms is found to
                  be unenforceable or invalid for any reason, that provision
                  will be limited or eliminated to the minimum extent necessary
                  so that the rest of these Terms will otherwise remain in full
                  force and effect. You may not assign your rights or
                  obligations under these Terms without the prior written
                  consent of Cantaloupe. Cantaloupe’s failure to insist upon or
                  enforce any provision of these Terms shall not be construed as
                  a waiver of any provision or right. Any sections or terms
                  which by their nature should survive or are otherwise
                  necessary to enforce the purpose of these Terms, will survive
                  the termination of these Terms and termination of the
                  Services. All headings included in these Terms are included
                  for convenience only, and shall not be considered in
                  interpreting these Terms. These Terms do not limit any rights
                  that Cantaloupe may have pursuant to any intellectual property
                  laws or any other laws. All rights and remedies available to
                  Cantaloupe, pursuant to this Agreement or otherwise, at law or
                  in equity, are cumulative and not exclusive of any other
                  rights or remedies that may be available to Cantaloupe. In no
                  event shall you seek or be entitled to rescission, injunctive
                  or other equitable relief, or to enjoin or restrain the
                  operation of the Services, or any other materials issued in
                  connection therewith, or exploitation of the Services or any
                  content or other material used or displayed through the
                  Services. Except as otherwise expressly set forth herein,
                  there shall exist no right of any person, other than you and
                  Cantaloupe, to claim a beneficial interest in these Terms or
                  any rights occurring by virtue of these Terms. No independent
                  contractor relationship, partnership, joint venture,
                  employer-employee or franchise relationship is created by this
                  Agreement.
                </p>
                <p>
                  If you have any questions, complaints, or claims, you may
                  contact Cantaloupe at customerservice@cantaloupe.com.
                </p>
                <div>
                  <Header text="MC Offers Addendum" />
                </div>
                <p>
                  In addition to the foregoing Terms, in the event you are
                  provided access to MC Offers, the terms of this addendum shall
                  apply. You acknowledge and agree that, like the Terms, this MC
                  Offers addendum is subject to change in Cantaloupe’s sole
                  discretion, and MC Offers may be suspended, terminated or
                  otherwise revoked at any time in Cantaloupe’s sole discretion.
                </p>
                <p>
                  1. <u>Overview.</u> To the extent available to you, MC Offers
                  enables you to receive certain loyalty and reward offers
                  through Mastercard. Once enrolled, Mastercard will monitor the
                  use of your corresponding enrolled card (“Enrolled Card”) to
                  identify transactions that meet the corresponding offer
                  requirements (“Offer Terms”). Upon a determination, in
                  Mastercard’s sole discretion, that a transaction on an
                  Enrolled Card meets the applicable Offer Terms, Mastercard
                  will process a rebate to the Enrolled Card pursuant to the
                  Offer Terms. Offers will be valid for use by consumers with an
                  Enrolled Card issued in the United States, unless otherwise
                  permitted by the Offer Terms, and only during the time period
                  applicable to such offer.{' '}
                </p>
                <p>
                  2. <u>Data Rights.</u> Mastercard and Cantaloupe may leverage
                  hashed emails and geolocation to segment or target offers. The
                  geolocation may include the ZIP code provided for the Enrolled
                  Card and/or location data provided by a device (e.g. mobile).
                  Without limiting the Privacy Policy, you acknowledge and
                  agrees that Mastercard and Cantaloupe may use your data for
                  the purposes of: (a) providing the MC Offers to you and
                  performing its obligations under these Terms; (b) enhancing
                  the MC Offers and related services; (c) preparing internal
                  reports for use by Cantaloupe, Mastercard, their affiliates,
                  and their staff, management, and consultants; (d) preparing
                  and furnishing compilations, analyses, and other reports for
                  Cantaloupe, Mastercard, their affiliates, or merchants,
                  including reporting to participating merchants on your
                  qualifying transactions to which the specific data relates;
                  (e) preparing and furnishing aggregated and anonymized
                  analyses and reporting for participating and prospective
                  merchants for the purpose of marketing or advertising the MC
                  Offers program; (f) complying with applicable legal
                  requirements; and (g) assisting law enforcement agencies by
                  responding to requests for the disclosure of personal
                  information, in accordance with applicable local laws.
                  Additionally, Cantaloupe and Mastercard may review and analyze
                  data relating to your Enrolled Cards during periods up to
                  twenty-four (24) months prior to the effective date of
                  enrollment for the purpose of preparing and furnishing
                  compilations, analyses, and other reports for participating
                  and prospective merchants or for use by Cantaloupe, Mastercard
                  or their affiliates, provided that such compilations,
                  analyses, or other reports do not identify you directly. In
                  addition, you agree that Mastercard may process your data,
                  including personal information, as permissible by applicable
                  law and/or the Mastercard rules, by-laws, policies, operating
                  regulations, and procedures, each as may be amended from
                  time-to-time by Mastercard.
                </p>
                <p>
                  3. <u>Customer Service.</u> You should contact Cantaloupe, not
                  Mastercard, with respect to any issues you may have with MC
                  Offers.
                </p>
                <p>
                  4. <u>Offer Requirements.</u> Mastercard or Cantaloupe may
                  specify that certain MC Offers require you to affirmatively
                  accept the MC Offer or some other requirements that must be
                  met before a MC Offer will be redeemable by you, and you must
                  comply with all such requirements. Neither Mastercard nor
                  Cantaloupe shall have any obligation to fulfill such a MC
                  Offer that was not accepted by you or for which the other
                  specified requirements were not met.
                </p>
                <p>
                  5. <u>Consent; Opt-Out.</u> By enrolling your applicable card
                  for use in connection with MC Offers and agreeing to these
                  Terms, you hereby consent to participation in the MC Offers
                  program and allowing Mastercard and Cantaloupe to monitor your
                  transaction action activity, including for the purposes of
                  fulfilling offers and any other related uses, such as
                  targeting offers that may be of interest to you. If you desire
                  to opt out of the MC Offers program, you should promptly
                  notify Cantaloupe, following which your Enrolled Card shall no
                  longer be monitored for qualifying transactions in connection
                  with the MC Offers program.
                </p>
                <p>
                  6. <u>Termination.</u> Upon expiration or termination of this
                  MC Offers Addendum or these Terms, (a) all rights and licenses
                  granted hereunder with respect to your use of the MC Offers
                  will automatically terminate and no corresponding rebates will
                  be processed for you.
                </p>
                <p>
                  7. <u>Changes.</u> These terms are subject to change at any
                  time in Cantaloupe’s or Mastercard’s sole discretion in
                  accordance with Section 15 of the Terms.{' '}
                </p>
              </TextContainer>
            </>
          </BodyContainer>

          <FooterButtonAndLink>
            <Button
              text={`Back to ${from || 'Sign Up'}`}
              href={
                from
                  ? `${routes.cardDashboard.path}`
                  : `${routes.registration.path}?step=3`
              }
            />
          </FooterButtonAndLink>
        </Gutter>
      </PageContainer>
    </>
  );
};

export default TermsOfUse;
