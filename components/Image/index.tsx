import * as Styled from './styles';

export interface IImage {
  width?: string;
  height?: string;
  alignCenter?: boolean;
  src: string;
  alt: string;
}

const Image: React.FC<IImage> = ({
  width = '',
  height = '',
  alignCenter = false,
  src = '',
  alt = '',
}) => {
  return (
    <Styled.Container alignCenter={alignCenter}>
      <Styled.Image src={src} alt={alt} height={height} width={width} />
    </Styled.Container>
  );
};

export default Image;
