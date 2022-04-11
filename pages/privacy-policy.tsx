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

const Table = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${COLOR_SECONDARY_GRAY_0};
    text-align: left;
    padding: 15px;
  }
`;
const H2 = styled.h2`
  line-height: 28px;
`;

const PrivacyPolicy = () => {
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
        title="Privacy Policy | Cantaloupe MORE"
        description="Get more with your More pass every time you make a purchase at a participating self-service retail locations like vending machines, kiosks, and car washes."
        canonical="https://cantaloupe.com/"
      />
      <PageContainer gradient={gradients.GRADIENT}>
        <Gutter>
          <Navbar />
          <BodyContainer>
            <HeaderContainer>
              <Header text="Privacy Policy" />
            </HeaderContainer>
            <TextContainer>
              <h3>Effective Date: November 17, 2016</h3>
              <h3>Last Updated: April 15, 2021</h3>
              <p>
                Cantaloupe, Inc. (collectively referred to herein as
                “Cantaloupe”, “we”, “our” or “us”), recognizes the importance of
                protecting Personal Information we may collect from visitors and
                any other individual or entity (“Users”, “you”, or “your”) who
                visit our web sites. This Privacy Policy applies to data
                collection by Cantaloupe and shall apply to your use of the
                website, www.cantaloupe.com and other Cantaloupe-related sites,
                applications, software, communications, capabilities and
                services (“Services”) accessible on or by any top-level
                Cantaloupe domain owned by us (each, a “Site” and collectively
                the “Sites”), but excluding services that state that they are
                offered under a different privacy policy.
              </p>
              <p>
                Our Privacy Policy explains: (1) what information we collect;
                (2) why we collect it; (3) how we use that information; (4) how
                we may share it; (5) the choices we offer, including how to
                access and update information; (6) and the measures we take to
                keep your information safe. Specifically, our Privacy Policy
                covers the following topics:
              </p>
              <H2>When this Privacy Policy Applies</H2>
              <p>
                Our Privacy Policy applies to all of the Services offered by
                Cantaloupe and its affiliates, including some Cantaloupe
                partners, and Services offered on other sites, but excludes
                services that have separate privacy policies that do not
                incorporate this Privacy Policy.
              </p>
              <p>
                Our Privacy Policy does not apply to services offered by other
                companies or individuals, including products or sites that may
                be displayed to you, or other sites linked from our Services.
                Our Privacy Policy does not cover the information practices of
                other companies and organizations who advertise our Services,
                and who may use cookies, pixel tags and other technologies to
                serve and offer relevant ads.
              </p>
              <H2>Terms of Service</H2>
              <p>
                By accessing or using the Sites in any manner, you also agree to
                Cantaloupe’s Terms of Service (the “Agreement”). Please read the
                Agreement carefully. If you do not accept all of the terms and
                conditions contained in or incorporated by reference into the
                Agreement, please do not use the Sites.
              </p>
              <H2>What information do we collect?</H2>
              <p>
                We may collect personal information from you when you register
                on our web sites. Personal Information means any information
                that identifies or can be used to identify you. Common examples
                of Personal Information include: full name, postal address,
                email address, digital identity, such as a login name or handle,
                information about your device, and certain metadata.
              </p>
              <p>
                When registering on our sites, as appropriate, you may be asked
                to enter your name, e-mail address, contact information, banking
                or credit card information. You may, however, visit our sites
                anonymously.
              </p>
              <p>
                We collect certain information automatically, such as your
                operating system version, browser type, and internet service
                provider. We also collect information about your interaction
                with the Services, such as creating or logging into your
                account, or opening or interacting with the Services on Your
                mobile device. When you use our Site, we automatically collect
                and store this information in service logs. This includes:
                details of how you used our Site; Internet protocol address;
                cookies that uniquely identify your browser, the referring web
                page and pages visited. We may also collect and process
                information about your actual location. The information we
                collect automatically is statistical data and may or may not
                include Personal Information, but we may maintain it or
                associate it with Personal Information we collect in other ways
                or receive from third parties.
              </p>
              <H2>
                What information do we collect related to California residents?
              </H2>
              <p>
                During the last twelve (12) months, we have collected the
                following categories of Personal Information from consumers.
              </p>
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Type of Identifiers We Collect</th>
                    <th>Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Identifiers.</td>
                    <td>
                      First and last name, personal postal address, unique
                      personal identifier, online identifier, Internet Protocol
                      address, personal email address, signatures, account ID
                      and password.
                    </td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>
                      Personal information categories listed in the California
                      Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                    </td>
                    <td>
                      A name, address, telephone number, credit card number,
                      debit card number, or any other financial information.
                    </td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>Internet or other similar network activity.</td>
                    <td>
                      Browsing history and time, search history, information on
                      a consumer’s interaction with a website, application, or
                      advertisement.
                    </td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>Commercial Information.</td>
                    <td>
                      Records of personal property, products or services
                      purchased, obtained, or considered, or other purchasing or
                      consuming histories or tendencies.
                    </td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>Inferences drawn from other Personal Information.</td>
                    <td>
                      Profile reflecting a person&apos;s preferences, behavior,
                      attitudes; and social media account information.
                    </td>
                    <td>YES</td>
                  </tr>
                </tbody>
              </Table>
              <p>
                We obtain the categories of Personal Information listed above
                from the following categories of sources:
              </p>
              <ul>
                <li>
                  Directly from our customers or their agents. For example, from
                  information that customers input into ePort Connect.
                </li>
                <li>
                  Indirectly from our customers or their agents. For example,
                  through information we collect from our clients in the course
                  of providing Services to them.
                </li>
                <li>
                  Directly and indirectly from activity on our website
                  (www.cantaloupe.com). For example, from website usage details
                  that are collected automatically. In addition, like many
                  companies, we use “cookies” which are small text files a
                  website can use to recognize repeat users, facilitate the
                  user’s ongoing access to and use of the site and to track
                  usage behavior of, for example, the webpages you visit.
                </li>
                <li>
                  From social media websites, such as Facebook, Twitter, and
                  LinkedIn.
                </li>
                <li>
                  From third parties that assist us in providing certain
                  transactions and services (e.g. payment processing, hosting),
                  even though it appears that you may not have left our Site.
                </li>
              </ul>
              <H2>How do we use your Personal Information?</H2>
              <p>
                Any of the information we collect from you may be used in one of
                the following ways:
              </p>
              <ul>
                <li>
                  <p>
                    <b>To personalize your experience</b>
                  </p>
                  <p>
                    Your information helps us to better respond to your
                    individual needs.
                  </p>
                </li>
                <li>
                  <p>
                    <b>To improve our websites</b>
                  </p>
                  <p>
                    We continually strive to improve our website offerings based
                    on the information and feedback we receive from you.
                  </p>
                </li>
                <li>
                  <p>
                    <b>To improve our customer service</b>
                  </p>
                  <p>
                    Your information helps us to more effectively respond to
                    your customer service requests and support needs.
                  </p>
                </li>
                <li>
                  <p>
                    <b>To process transactions</b>
                  </p>
                  <p>
                    Your information, whether public or private, will not be
                    sold, exchanged, transferred, or given to any other company
                    for any reason whatsoever, without your consent, other than
                    for the express purpose of delivering the purchased product
                    or service requested.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      To administer a contest, promotion, survey or other site
                      feature
                    </b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>To send periodic emails</b>
                  </p>
                  <p>
                    The email address you provide for order processing, may be
                    used to send you information and updates pertaining to your
                    order, in addition to receiving occasional company news,
                    updates, related product or service information, etc.
                  </p>
                  <p>
                    Note: If at any time you would like to unsubscribe from
                    receiving future emails, we include detailed unsubscribe
                    instructions at the bottom of each email.
                  </p>
                </li>
                <li>
                  <p>
                    <b>To comply with all applicable legal requirements</b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>To enforce our Terms of Use and other agreements</b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>To perform data analysis and testing</b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      To investigate possible fraud or other violations of our
                      Terms of Use or this Privacy Policy and/or attempts to
                      harm our Users
                    </b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>To resolve disputes</b>
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      To otherwise fulfill the purpose for which the information
                      was provided
                    </b>
                  </p>
                </li>
              </ul>
              <p>
                We use the information we collect from our Sites to provide,
                maintain, and improve them, to develop new services, and to
                protect our company and our Users.
              </p>
              <p>
                We use information collected from cookies and other
                technologies, to improve your User experience and the overall
                quality of our services. We may use your Personal Information to
                see which web pages you visit at our Site, which web site you
                visited before coming to our Site, and where you go after you
                leave our Site. We can then develop statistics that help us
                understand how our visitors use our Site and how to improve it.
                We may also use the information we obtain about you in other
                ways for which we provide specific notice at the time of
                collection.
              </p>
              <p>
                We will ask for your consent before using information for a
                purpose other than those set out in this Privacy Policy.
              </p>
              <H2>Do we sell your Personal Information?</H2>
              <p>
                In the preceding twelve (12) months, we have not sold any
                Personal Information.
              </p>
              <H2>How do we protect your information?</H2>
              <p>
                We implement a variety of security measures to maintain the
                safety of your Personal Information when you enter, submit, or
                access your Personal Information, taking into account
                technological reality, cost, the scope, context and purposes of
                processing weighted against the severity and likelihood that the
                processing could threaten individual rights and freedoms. For
                example, we restrict access to Personal Information to
                Cantaloupe employees, contractors, business partners and agents
                who need to know that information in order to operate, develop
                or improve our services. These individuals are bound by
                confidentiality obligations and may be subject to discipline,
                including termination and criminal prosecution, if they fail to
                meet these obligations. We use commercially reasonable security
                measures such as encryption, firewalls, and Secure Socket Layer
                software (SSL) or hypertext transfer protocol secure (HTTPS) to
                protect Personal Information.
              </p>
              <p>
                We offer the use of a secure server. All supplied
                sensitive/credit information is transmitted via industry
                accepted secure communication technology and then encrypted into
                our Database to be only accessed by those authorized with
                special access rights to our systems, and are required to keep
                the information confidential.
              </p>
              <p>
                We keep on file only the minimum required information to
                properly support our customers and their accounts. All other
                information is destroyed.
              </p>
              <H2>Do we use web site cookies and similar technologies?</H2>
              <p>
                We and our partners use various technologies to collect and
                store information when you visit one of our services, and this
                may include using cookies or similar technologies to identify
                your browser or device. We also use these technologies to
                collect and store information when you interact with services
                from our partners, such as advertising services. Our third party
                advertising and analytics partners include Adroll, Google Ads,
                Google Analytics, Mediavision, Facebook Ads and similar
                partners.
              </p>
              <p>
                The technologies we use for this automatic data collection may
                include:
              </p>
              <ul>
                <li>
                  <u>Cookies.</u> A cookie is a small file placed on the hard
                  drive of your computer. You may refuse to accept browser
                  cookies by activating the appropriate setting on your browser.
                  However, if you select this setting you may be unable to
                  access certain parts of our services. Unless you have adjusted
                  your browser setting so that it will refuse cookies, our
                  system will issue cookies when you direct your browser to our
                  services. For more information about the cookies we use on our
                  Site, please see our{' '}
                  <Anchor
                    href="http://www.cantaloupe.com/wp-content/uploads/2021/04/website-cookie-policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    Cookie Policy
                  </Anchor>
                  .
                </li>
                <li>
                  <u>Web Beacons.</u> Pages of our services or our e-mails may
                  contain small electronic files known as web beacons (also
                  referred to as clear gifs, pixel tags and single-pixel gifs)
                  that permit us, for example, to count Users who have visited
                  those pages or opened an e-mail and for other related website
                  statistics (for example, recording the popularity of certain
                  website content and verifying system and server integrity).
                </li>
                <li>
                  <u>Clickstream Data.</u> Clickstream data is information
                  collected by our computers when you request Web pages from the
                  Sites. Clickstream data may include information such as the
                  page served, the time spent viewing the page, source of the
                  request, type of browser making the request, the preceding
                  page viewed and similar information. Clickstream data permits
                  us to analyze how visitors arrive at the Sites, what type of
                  content is popular, what type of visitors in the aggregate are
                  interested in particular kinds of content on the Sites.
                </li>
              </ul>
              <H2>Do we disclose any information to outside parties?</H2>
              <p>
                We do not share Personal Information with companies,
                organizations and individuals outside of Cantaloupe unless one
                of the following circumstances applies:
              </p>
              <ul>
                <li>
                  <b>With your consent.</b> We will share Personal Information
                  with companies, organizations or individuals outside of
                  Cantaloupe when we have your consent to do so.
                </li>
                <li>
                  <b>Business Accounts.</b> Your employer or your organization
                  may offer you access to our Services. We will share Personal
                  Information with your employer or organization. Your employer
                  or organization can review and manage your use of such
                  Services.
                </li>
                <li>
                  <b>For external processing.</b> We may provide Personal
                  Information to our affiliates or other trusted businesses or
                  partners to process it for us, based on our instructions and
                  in compliance with our Privacy Policy and any other
                  appropriate confidentiality and security measures. These third
                  parties include marketing partners, third party hosted
                  services providers, and similar partners. It is our policy to
                  only share Personal Information with contractors, service
                  providers and other third parties who are bound by contractual
                  obligations to keep Personal Information confidential and use
                  it only for the purposes for which we disclose it to them.
                  Under certain circumstances, you may avoid having us share
                  your information with our business partners and vendors by not
                  granting us permission to share your information. Not granting
                  us permission to share your information with our business
                  partners or vendors may limit your access to their services
                  through the Sites.
                </li>
                <li>
                  <b>For Legal Reasons.</b> We will share Personal Information
                  with companies, organizations or individuals outside of
                  Cantaloupe if we have a good-faith belief that access, use,
                  preservation or disclosure of the information is reasonably
                  necessary to:
                  <ul>
                    <li>
                      meet any applicable law, regulation, legal process or
                      enforceable governmental request.
                    </li>
                    <li>
                      enforce applicable Terms of Use, including investigation
                      of potential violations.
                    </li>
                    <li>
                      detect, prevent, or otherwise address fraud, security or
                      technical issues.
                    </li>
                    <li>
                      protect against harm to the rights, property or safety of
                      Cantaloupe, our Users or the public as required or
                      permitted by law.
                    </li>
                  </ul>
                </li>
              </ul>
              <p>
                We attempt to notify Users about legal demands for their
                Personal Information when appropriate in our judgment, unless
                prohibited by law or court order or when the request is an
                emergency. We may dispute such demands when we believe, in our
                discretion, that the requests are overbroad, vague or lack
                proper authority, but we do not promise to challenge every
                demand.
              </p>
              <ul>
                <li>
                  <b>Business Transfers.</b> If we establish a new related
                  entity, are acquired by or merged with another organization,
                  or if substantially all of our assets are transferred to
                  another organization, Personal Information about our Users is
                  often a transferred business asset. In the event that
                  Cantaloupe itself or substantially all of our assets are
                  acquired, Personal Information about our Users may be one of
                  the transferred assets.
                </li>
                <li>
                  <b>Non-Personal and Aggregate Site Use Information.</b>{' '}
                  Cantaloupe may compile and share your information in
                  aggregated form (i.e., in a manner that would not personally
                  identify you) or in de-identified form so that it cannot
                  reasonably be used to identify an individual (“De-Identified
                  Information”). We may disclose such de-identified information
                  publicly and to third parties, or to Cantaloupe Partners under
                  agreement with us.
                </li>
              </ul>
              <p>
                In the preceding twelve (12) months, we have disclosed the
                following categories of Personal Information for one or more
                business purposes:{' '}
              </p>
              <ul>
                <li>Identifiers;</li>
                <li>
                  California Customer Records Personal Information categories;
                </li>
                <li>Commercial information;</li>
                <li>Internet or other network activity information;</li>
                <li>Inferences drawn from other Personal Information.</li>
              </ul>

              <p>
                We disclose your Personal Information for a business purpose to
                the following categories of third parties:
              </p>
              <ul>
                <li>Our affiliates;</li>
                <li>
                  Third parties to whom you or your agents authorize us to
                  disclose your Personal Information in connection with the
                  Services we provide to you.
                </li>
                <li>
                  Service providers and other third parties we use to support
                  our business, including without limitation those performing
                  core services (such as credit card processing, customer
                  support services, customer relationship management,
                  accounting, auditing, advertising and marketing, analytics,
                  email and mailing services, data storage, and security)
                  related to the operation of our business and/or the Services.
                </li>
                <li>Commercial providers;</li>
                <li>Enterprise accounts, such as your employer.</li>
              </ul>

              <p>
                We may disclose your Personal Information for legal reasons.
                Specifically, we will share Personal Information with companies,
                organizations or individuals outside of Cantaloupe if we have a
                good-faith belief that access, use, preservation or disclosure
                of the information is reasonably necessary to:
              </p>
              <ul>
                <li>Fulfill any purpose for which you provide it;</li>
                <li>
                  Meet any applicable law, regulation, legal process or
                  enforceable governmental request;
                </li>
                <li>
                  Enforce applicable Terms of Use, including investigation of
                  potential violations;
                </li>
                <li>
                  Detect, prevent, or otherwise address fraud, security or
                  technical issues;
                </li>
                <li>
                  Protect against harm to the rights, property, assets or safety
                  of Cantaloupe, our customers or the public, content found on
                  the Services, or to protect the Services from unauthorized use
                  or misuse, as required or permitted by law;
                </li>
                <li>
                  Facilitate a business transfer, such as to a buyer or other
                  successor in the event of merger, acquisition, consolidation,
                  divestiture, change in control, dissolution or other sale or
                  transfer of some or all of Cantaloupe&apos;s assets, whether
                  as a going concern or as part of bankruptcy, liquidation or
                  similar proceeding, in which Personal Information held by
                  Cantaloupe about its customers and users will be among the
                  assets to be transferred, and any such successor may use your
                  information for the same purposes set forth in the Privacy
                  Policy.
                </li>
                <li>
                  For any other purpose disclosed when you provide the
                  information; and,
                </li>
                <li>When we obtain your consent to do so.</li>
              </ul>

              <p>
                We attempt to notify you about legal demands for your Personal
                Information when appropriate in our judgment, unless prohibited
                by law or court order or when the request is an emergency. We
                may dispute such demands when we believe, in our discretion,
                that the requests are overbroad, vague or lack proper authority,
                but we do not promise to challenge every demand.
              </p>
              <H2>
                What if you don’t want to provide us with your Personal
                Information?
              </H2>
              <p>
                Your provision of Personal Information is required in order to
                use certain parts of our services and our programs. If you fail
                to provide such Personal Information, you may not be able to
                access and use our Services and/or our programs, or parts of our
                Services and/or our programs.
              </p>
              <H2>Do we retain your Personal Information?</H2>
              <p>
                We may retain your Personal Information for a period of time
                consistent with the original purpose for collection. For
                example, we keep your Personal Information for no longer than
                reasonably necessary for your use of our programs and Services
                and for a reasonable period of time afterward. We also may
                retain your Personal Information during the period of time
                needed for us to pursue our legitimate business interests,
                conduct audits, comply with our legal obligations, resolve
                disputes and enforce our agreements.
              </p>
              <p>
                We retain your Personal Information even after your business
                relationship with us ends if reasonably necessary to comply with
                our legal obligations (including law enforcement requests), meet
                regulatory requirements, resolve disputes, maintain security,
                prevent fraud and abuse, enforce our Terms of Use, or fulfill
                your request to “unsubscribe” from further messages from us.
              </p>
              <H2>What are your privacy rights and choices?</H2>
              <p>
                You may have certain rights relating to your Personal
                Information, subject to local data protection law. Whenever you
                use our Services, we aim to provide you with choices about how
                we use your Personal Information. We also aim to provide you
                with access to your Personal Information. If that information is
                wrong, we strive to give you ways to update it quickly or to
                delete it – unless we have to keep that information for
                legitimate business or legal purposes. Subject to applicable
                law, you may obtain a copy of Personal information we maintain
                about you or you may update or correct inaccuracies in that
                information by contacting us. To help protect your privacy and
                maintain security, we will take steps to verify your identity
                before granting you access to the information. In addition, if
                you believe that Personal Information we maintain about you is
                inaccurate, subject to applicable law, you may have the right to
                request that we correct or amend the information by contacting
                us as indicated in the How to Contact Us section below.
              </p>
              <ul>
                <li>Privacy Rights Specific to Californians</li>
              </ul>
              <p>
                Under the California Consumer Privacy Act, California residents
                have specific rights regarding their Personal Information. This
                section describes Californians’ rights and explains how
                California residents can exercise those rights.
              </p>
              <p>
                Below we further outline specific rights which California
                residents may have under the California Consumer Privacy Act.
              </p>
              <ul>
                <li>
                  Right to Access Your Personal Information. You have the right
                  to request that we disclose certain information to you about
                  our collection, use and disclosure of your Personal
                  Information over the past twelve (12) months. Any disclosures
                  we provide will only cover the 12-month period preceding the
                  receipt of your request. The response we provide will also
                  explain the reasons we cannot comply with a request, if
                  applicable.
                </li>
                <li>
                  Right to Data Portability. You have the right to a “portable”
                  copy of your Personal Information that you have submitted to
                  us. Generally, this means you have a right to request that we
                  move, copy or transmit your Personal Information stored on our
                  servers or information technology environment to another
                  service provider’s servers or information technology
                  environment.
                </li>
                <li>
                  Right to Delete Your Data. You have the right to request that
                  we delete any of your Personal Information that we collected
                  from you and retained, subject to certain exceptions. Once we
                  receive and confirm your verifiable consumer request, we will
                  delete (and direct our service providers to delete) your
                  Personal Information from our records, unless an exception
                  applies.
                </li>
                <li>
                  Right to Non-Discrimination for the Exercise of Your Privacy
                  Rights. You have the right not to receive discriminatory
                  treatment by us for exercising your privacy rights conferred
                  by the California Consumer Privacy Act.
                </li>
              </ul>
              <ul>
                <ul>
                  <li>
                    <u>Exercising Your Rights</u>
                  </li>
                </ul>
              </ul>
              <p>
                If you are a California resident who chooses to exercise your
                rights, you can:
              </p>
              <ol>
                <li>
                  Submit a request via email to{' '}
                  <Anchor
                    href="mailto:privacy@cantaloupe.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    privacy@cantaloupe.com
                  </Anchor>
                  , or
                </li>
                <li>Call 1-833-444-8728 to submit your request.</li>
              </ol>
              <p>
                You may also designate an agent to exercise your privacy rights
                on your behalf. In order to designate an authorized agent to
                make a request on your behalf, you must provide a valid power of
                attorney, the requester’s valid government-issued
                identification, and the authorized agent’s valid government
                issued identification.
              </p>
              <ul>
                <ul>
                  <li>
                    <u>Our Response to Your Request</u>
                  </li>
                </ul>
              </ul>
              <p>
                Upon receiving your request, we will confirm receipt of your
                request by sending you an email. To help protect your privacy
                and maintain security, we may take steps to verify your identity
                before granting you access to the information. In some
                instances, such as a request to delete Personal Information, we
                may first separately confirm that you would like for us to in
                fact delete your Personal Information before acting on your
                request.
              </p>
              <p>
                We will respond to your request within forty-five (45) days. If
                we require more time, we will inform you of the reason and
                extension period in writing. If you have an account with us, we
                will deliver our written response to that account. If you do not
                have an account with us, we will deliver our written response by
                mail or electronically, at your option.
              </p>
              <p>
                In some cases, our ability to uphold these rights for you may
                depend upon our obligations to process your information for
                security, safety, fraud prevention reasons, compliance with
                regulatory, contractual or legal requirements, listed below, or
                because processing is necessary to deliver the services you or
                one of our business customers have requested. Where this is the
                case, we will inform you of specific details in response to your
                request.
              </p>
              <p>
                We may deny your deletion request if retaining the information
                is necessary for us or our service providers to:
              </p>
              <ol>
                <li>
                  Complete the transaction for which we collected the Personal
                  Information, provide a good or service that you requested,
                  take actions reasonably anticipated within the context of our
                  ongoing business relationship with you, or otherwise perform
                  our contract with you;
                </li>
                <li>
                  Detect security incidents, protect against malicious,
                  deceptive, fraudulent, or illegal activity, or prosecute those
                  responsible for such activities;
                </li>
                <li>
                  Debug products to identify and repair errors that impair
                  existing intended functionality;
                </li>
                <li>
                  Exercise free speech, ensure the right of another consumer to
                  exercise their free speech rights, or exercise another right
                  provided for by law;
                </li>
                <li>
                  Comply with the California Electronic Communications Privacy
                  Act (Cal. Penal Code § 1546 seq.);
                </li>
                <li>
                  Engage in public or peer-reviewed scientific, historical, or
                  statistical research in the public interest that adheres to
                  all other applicable ethics and privacy laws, when the
                  information&apos;s deletion may likely render impossible or
                  seriously impair the research&apos;s achievement, if you
                  previously provided informed consent;
                </li>
                <li>
                  Enable solely internal uses that are reasonably aligned with
                  consumer expectations based on your relationship with us;
                </li>
                <li>Comply with a legal obligation; or</li>
                <li>
                  Make other internal and lawful uses of that information that
                  are compatible with the context in which you provided it.
                </li>
              </ol>
              <H2>What is our email policy?</H2>
              <p>
                By providing an email address on the Cantaloupe Sites or
                Services, you agree that we may contact you in the event of a
                change in this Privacy Policy, to provide you with any Service
                related notices, or to provide you with information about our
                events, invitations, or related educational information.
              </p>
              <p>
                For purposes of this Privacy Policy, “opt-in” is generally
                defined as any affirmative action by a User to submit or receive
                information, as the case may be.
              </p>
              <p>We currently provide the following opt-out opportunities:</p>
              <ol>
                <li>
                  At any time, you can follow a link provided in offers,
                  newsletters or other email messages (except for e-commerce
                  confirmation or service notice emails) received from us or a
                  Cantaloupe Partner to unsubscribe from the service.
                </li>
                <li>
                  At any time, you can contact us through privacy@cantaloupe.com
                  or the address or telephone number provided below to
                  unsubscribe from the service and opt-out of our right per your
                  consent under the terms of this Privacy Policy to share your
                  Personal Information.
                </li>
                <li>
                  At any time, you can reply “STOP” to the message in order to
                  opt-out of receiving SMS texts.
                </li>
              </ol>

              <p>
                Notwithstanding anything else in this Privacy Policy, please
                note that we always reserve the right to contact you in the
                event of a change in this Privacy Policy, or to provide you with
                any service related notices.
              </p>
              <H2>Children&apos;s Online Privacy Protection Act Compliance</H2>
              <p>
                The Site is not intended for use by children. We do not
                intentionally gather Personal Information about visitors who are
                under the age of 16. If a child has provided us with Personal
                Information, a parent or guardian of that child may contact us
                to have the information deleted from our records. If you believe
                that we might have any information from a child under age 16 in
                the applicable jurisdiction, please contact us at
                privacy@cantaloupe.com. If we learn that we have inadvertently
                collected the Personal Information of a child under 16, or
                equivalent minimum age depending on jurisdiction, we will take
                steps to delete the information as soon as possible.
              </p>
              <H2>Changes to this Privacy Policy</H2>
              <p>
                Our{' '}
                <Link href="/privacy-policy">
                  <Anchor>Privacy Policy</Anchor>
                </Link>{' '}
                may change from time to time. We will not reduce your rights
                under this Privacy Policy without your explicit consent. We will
                post any privacy policy changes on this page and, if the changes
                are significant, we will provide a more prominent notice
                (including, for certain services or programs, email notification
                or privacy policy changes). We will also keep prior versions of
                this Privacy Policy in an archive for your review.
              </p>
              <H2>Contacting Us</H2>
              <p>
                If there are any questions regarding this privacy policy you may
                contact us using the information below:
              </p>
              <p>
                <i>
                  <b>Cantaloupe, Inc.</b>
                  <br />
                  100 Deerfield Lane, Suite 300 Malvern, PA 19355 USA
                  <br />
                  Phone: 888-561-4748
                  <br />
                  Email:{' '}
                  <Anchor
                    href="mailto:privacy@cantaloupe.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    privacy@cantaloupe.com
                  </Anchor>
                  <br />
                  Website:{' '}
                  <Anchor
                    href="http://www.cantaloupe.com/"
                    target="_blank"
                    rel="noopener noreferrer">
                    http://www.cantaloupe.com/
                  </Anchor>
                  <br />
                </i>
              </p>
            </TextContainer>
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

export default PrivacyPolicy;
