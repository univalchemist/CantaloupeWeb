import Header from '../Header';

import * as Styled from './styles';

export default function CustomerSupport() {
  return (
    <Styled.Wrapper>
      <Header text="FAQ" leftAlign />
      <Styled.SubHeaderBlack>
        If I already have a MORE Loyalty Card, can I use my existing account to
        log in to the new Web Application?
      </Styled.SubHeaderBlack>
      <Styled.Text>
        If you have an existing MORE Card &amp; a Cantaloupe GetMORE.com
        account, you can use your existing credentials to log in to the new Web
        Application. If you do not have a GetMORE.com account, you will have to
        create a new account within the new Web Application.
      </Styled.Text>
      <Styled.SubHeaderBlack>
        How do I add funds to my MORE Account within the App?
      </Styled.SubHeaderBlack>
      <Styled.Text>
        Within the MORE App, you will click into the MORE Prepaid card icon, and
        you will have the option to manually add funds to your account or you
        can set up an &quot;automatic reload&quot; when your funds fall below a
        specific threshold. This feature can be turned on and off.
      </Styled.Text>
      <Styled.SubHeaderBlack>
        Can I track my purchases within the Web App?
      </Styled.SubHeaderBlack>
      <Styled.Text>
        Yes. There is a transactions section within the app that will keep track
        of your purchases and when funds are added to your account.
      </Styled.Text>
      <Styled.SubHeaderBlack>
        If I make an incorrect purchase or need a refund on my account, who do I
        contact?
      </Styled.SubHeaderBlack>
      <Styled.Text>
        Please find contact information for the machine operator on the specific
        machine to contact them for a refund on your account.
      </Styled.Text>
      <Styled.SubHeaderBlack>
        How do I add my Bakkt Card to my MORE Account?
      </Styled.SubHeaderBlack>
      <Styled.Text>
        Within the Web Application there is an option, &quot;Add Bakkt
        Card&quot;, from there you will be directed to the Bakkt app, and you
        can link to your existing accounts with your Bakkt login, or you have
        the ability to create a brand-new account with Bakkt and then link your
        accounts.
      </Styled.Text>
    </Styled.Wrapper>
  );
}
