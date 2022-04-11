import {icons} from '../../assets/icons';
import routes from '../../routing/routes';
import SocialButton from '../SocialButton';
import ChangeRouteText from '../ChangeRouteText';
import Header from '../Header';

import * as Styled from './styles';

export interface IProps {
  continueWithEmail?: () => void;
  isRegistration?: boolean;
  continueWithSocial: (connection: string) => void;
}

const SocialLogin: React.FC<IProps> = ({
  continueWithEmail,
  isRegistration = false,
  continueWithSocial,
}) => (
  <>
    <Styled.Container>
      <Header
        text={isRegistration ? 'Create Account' : 'Sign In'}
        margin="0 0 24px"
      />
      <SocialButton
        data-testid="appleButton"
        text="Continue with Apple"
        click={() => continueWithSocial('apple')}>
        <img src={icons.apple} alt="Apple Logo" width="24" />
      </SocialButton>
      <SocialButton
        data-testid="googleButton"
        text="Continue with Google"
        click={() => continueWithSocial('google-oauth2')}>
        <img src={icons.google} alt="Google Logo" width="30" />
      </SocialButton>
      <SocialButton
        data-testid="facebookButton"
        text="Continue with Facebook"
        click={() => continueWithSocial('facebook')}>
        <img src={icons.facebook} alt="Facebook Logo" width="28" />
      </SocialButton>
      <Styled.TextWrapper>
        You can also{' '}
        <Styled.TextLink
          onClick={continueWithEmail}
          data-testid="continueWithEmail">
          continue with email
        </Styled.TextLink>
        .
      </Styled.TextWrapper>
    </Styled.Container>
    {!isRegistration ? (
      <ChangeRouteText href={routes.index.path} text="Back home" />
    ) : null}
  </>
);

export default SocialLogin;
