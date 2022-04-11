import {icons} from '../../assets/icons';

import * as Styled from './styles';

interface ILoadingIndicatorFull {
  message: string;
}

const LoadingIndicatorFull: React.FC<ILoadingIndicatorFull> = ({
  message = 'Loading',
}) => {
  return (
    <Styled.Wrapper>
      <Styled.Loader>
        <img src={icons.loadingIconFull} alt="loading icon orange" />
      </Styled.Loader>
      <Styled.Message>{message}</Styled.Message>
    </Styled.Wrapper>
  );
};

export default LoadingIndicatorFull;
