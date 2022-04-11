import * as Styled from './styles';

export interface ISpacerContainer {
  margin: string;
}

const SpacerContainer: React.FC<ISpacerContainer> = ({children, margin}) => {
  return <Styled.Container margin={margin}>{children}</Styled.Container>;
};

export default SpacerContainer;
