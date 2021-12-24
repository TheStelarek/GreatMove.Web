import { FC, FormEvent } from 'react';
import Modal from '@/components/core/modal/Modal';
import Button from '@/components/core/button/Button';
import styles from '@/components/my-recipes/deleteRecipeModal/DeleteRecipeModal.module.scss';

interface DeleteRecipeModalProps {
   isOpen: boolean;
   isLoading: boolean;
   closeModal: () => void;
   removeRecipe: (e: FormEvent<HTMLFormElement>) => Promise<void>;
   deleteError: string;
}

const DeleteRecipeModal: FC<DeleteRecipeModalProps> = ({
   isOpen,
   isLoading,
   closeModal,
   removeRecipe,
   deleteError,
}) => (
   <Modal isOpen={isOpen} handleClose={closeModal}>
      <div className={styles.deleteModalContainer}>
         <div className={styles.modalHeader}>
            <span className={styles.heading}>Delete recipe</span>
            <p className={styles.description}>
               Are you sure you want to delete this recipe? By doing this you will lose all of your saved data and will
               not be able to retrive it.
            </p>
            {deleteError && <p className="error">{deleteError}</p>}
         </div>
         <form className={styles.deleteRecipeForm} onSubmit={(e) => removeRecipe(e)}>
            <div className={styles.buttonsWrapper}>
               <button className={styles.cancelBtn} onClick={closeModal}>
                  Cancel
               </button>
               <Button type="submit" variant="warning" borderRadius={5} isBold isLoading={isLoading}>
                  Delete recipe
               </Button>
            </div>
         </form>
      </div>
   </Modal>
);

export default DeleteRecipeModal;
