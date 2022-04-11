import ReactModal from 'react-modal';

import Button from '../Button';

import * as Styled from './styles';

export interface IModalProps {
  onClose: () => void;
  onBtnClick: (bool: boolean) => void;
  title: string;
  body?: string;
  isOpen: boolean;
  btnText: string;
  linkText: string;
}
const Modal: React.FC<IModalProps> = ({
  onClose = () => false,
  onBtnClick = () => false,
  isOpen = false,
  title = '',
  body = '',
  btnText = '',
  linkText = '',
}) => {
  const handleRequestClose = () => {
    onClose();
  };

  return (
    <ReactModal
      appElement={document.getElementById('__next') as HTMLElement}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={handleRequestClose}
      closeTimeoutMS={500}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, .5)',
          zIndex: 1111,
        },
        content: {
          background: '#fff',
          borderRadius: '10px',
          padding: '40px 32px',
          inset: '25px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          margin: '0 auto',
        },
      }}>
      <Styled.Container>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Body>{body}</Styled.Body>
        <Styled.Footer>
          <Button
            text={btnText}
            click={() => {
              onBtnClick(true);
            }}
          />
          <Styled.Link
            onClick={() => {
              onBtnClick(false);
            }}>
            {linkText}
          </Styled.Link>
        </Styled.Footer>
      </Styled.Container>
    </ReactModal>
  );
};

export default Modal;
