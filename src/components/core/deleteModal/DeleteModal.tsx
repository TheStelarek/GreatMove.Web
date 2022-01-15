import { FC } from 'react';
import Modal from '@/components/core/modal/Modal';
import Button from '@/components/core/button/Button';
import styles from '@/components/core/deleteModal/DeleteModal.module.scss';

interface DeleteModalProps {
   isOpen: boolean;
   isLoading?: boolean;
   closeModal: () => void;
   remove: any;
   deleteError?: string;
   heading?: string;
   description?: string;
   deleteButtonText?: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
   isOpen,
   isLoading = false,
   deleteError,
   closeModal,
   remove,
   heading = `Delete`,
   description = `Are you sure you want to delete this? By doing this you will lose all of your saved data and will not be able to retrive it.`,
   deleteButtonText = `Delete`,
}) => (
   <Modal isOpen={isOpen} handleClose={closeModal}>
      <div className={styles.deleteModalContainer}>
         <div className={styles.modalHeader}>
            <span className={styles.heading}>{heading}</span>
            <p className={styles.description}>{description}</p>
            {deleteError && <p className="error">{deleteError}</p>}
         </div>
         <form
            className={styles.deleteRecipeForm}
            onSubmit={(e) => {
               e.preventDefault();
               remove();
            }}
         >
            <div className={styles.buttonsWrapper}>
               <button className={styles.cancelBtn} onClick={closeModal}>
                  Cancel
               </button>
               <Button type="submit" variant="warning" borderRadius={5} isBold isLoading={isLoading}>
                  {deleteButtonText}
               </Button>
            </div>
         </form>
      </div>
   </Modal>
);

export default DeleteModal;
