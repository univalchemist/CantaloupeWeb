import * as Styled from './styles';

interface IDisclaimer {
  text?: string;
}

export default function Disclaimer({
  text = `Note: After payment account is connected your Cantaloupe Easy Pay Card will be available to add to your wallet and start using.`,
}: IDisclaimer) {
  return <Styled.Text>{text}</Styled.Text>;
}
