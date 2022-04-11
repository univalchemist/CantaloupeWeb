import ReactModal from 'react-modal';

export interface IProps {
  onClose?: () => void;
  isOpen: boolean;
}

const ModalClick2PayDcf: React.FC<IProps> = ({
  children,
  isOpen = false,
  onClose = () => false,
}) => {
  return (
    <ReactModal
      appElement={document.getElementById('__next') as HTMLElement}
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={() => onClose()}
      closeTimeoutMS={500}
      style={{
        content: {
          background: '#fff',
          borderRadius: '10px',
          inset: '0',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          maxWidth: '480px',
          maxHeight: '600px',
          margin: 'auto',
          padding: 0,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, .5)',
          zIndex: 1111,
        },
      }}>
      {children}
    </ReactModal>
  );
};

export default ModalClick2PayDcf;
