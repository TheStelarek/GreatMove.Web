import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ReactStars from 'react-stars';
import Modal from '@/components/core/modal/Modal';
import Button from '@/components/core/button/Button';
import TextArea from '@/components/core/textArea/TextArea';
import styles from '@/features/recipe/components/recipe/recipeReviewsAddModal/RecipeReviewsAddModal.module.scss';
import { useAddReviewMutation } from '@/features/recipe/api/recipesApi';
import { ErrorType } from '@/utils/types/ErrorType';

interface RecipeReviewsAddModalProps {
   isOpen: boolean;
   closeModal: () => void;
   recipeId: string;
}

const RecipeReviewsAddModal: FC<RecipeReviewsAddModalProps> = ({ recipeId, isOpen, closeModal }) => {
   const [addRecipe, result] = useAddReviewMutation();
   const [description, setDescription] = useState(``);
   const [rating, setRating] = useState(0);

   const ratingChanged = (newRating: number) => {
      setRating(newRating);
   };

   const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addRecipe({ recipeId, description, rating });
   };

   useEffect(() => {
      if (result.isSuccess) {
         closeModal();
         setDescription(``);
         setRating(0);
      }
   }, [closeModal, result]);

   return (
      <Modal hasCloseButton rounded isOpen={isOpen} handleClose={closeModal}>
         <form className={styles.recipeReviewForm} onSubmit={submit}>
            <TextArea
               label="Description"
               placeholder="Enter your review"
               radius={5}
               name="description"
               onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            <ReactStars
               value={rating}
               count={5}
               size={52}
               color1="#CAD5DE"
               color2="#FBBF24"
               half={false}
               onChange={ratingChanged}
               className={styles.starsWrapper}
            />
            {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
            <Button
               type="submit"
               size="large"
               variant="secondary"
               borderRadius={5}
               isFullWidth
               isLoading={result.isLoading}
            >
               ADD REVIEW
            </Button>
         </form>
      </Modal>
   );
};

export default RecipeReviewsAddModal;
