import { FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from '@/components/core/modal/Modal.module.scss';

ReactModal.setAppElement(`#__next`);

interface ModalProps {
   handleClose: () => void;
   isOpen: boolean;
   hasCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({ handleClose, isOpen, hasCloseButton, children }) => {
   useEffect(
      () => () => {
         handleClose();
      },
      [],
   );

   return (
      <ReactModal
         style={{ overlay: { zIndex: 100 } }}
         isOpen={isOpen}
         onRequestClose={handleClose}
         className={styles.modalContainer}
      >
         {children}
         {hasCloseButton && (
            <button onClick={handleClose} className={styles.closeBtn}>
               <span className={styles.line} />
               <span className={styles.line} />
            </button>
         )}
      </ReactModal>
   );
};

export default Modal;
