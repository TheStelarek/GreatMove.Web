import { useEffect, useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { usePDF } from '@react-pdf/renderer';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import ShoppingListTemplate from '@/features/shoppingList/utils/ShoppingListTemplate';
import { Ingredient } from '@/features/recipe/utils/types/Ingredient';
import styles from '@/features/shoppingList/containers/shoppingListContainer/ShoppingListContainer.module.scss';
import { shoppingListSelector, deleteProduct, clearState } from '@/features/shoppingList/store/ShoppingListSlice';
import chunks from '@/utils/functions/chunks';
import Save from '@/public/icons/save.svg';
import Print from '@/public/icons/print.svg';
import Trash from '@/public/icons/trash.svg';
import Empty from '@/public/illustrations/empty.svg';
import Remove from '@/public/icons/remove.svg';

const ShoppingListContainer = () => {
   const [dividedProducts, setDividedProducts] = useState<Array<Ingredient[]>>([]);
   const [pdf, updatePdf] = usePDF({
      document: ShoppingListTemplate({ products: dividedProducts }),
   });
   const { products } = useAppSelector(shoppingListSelector);
   const dispatch = useAppDispatch();
   const componentRef = useRef(null);

   useEffect(() => {
      setDividedProducts(chunks(products, 30));
   }, [products]);

   useEffect(updatePdf, [dividedProducts, updatePdf]);

   const clearShoppingList = () => dispatch(clearState());

   return (
      <div className={styles.shoppingListContainer}>
         <div className={styles.shoppingListHeader}>
            <h1 className={styles.title}>My shopping list</h1>
            {!!products.length && (
               <div className={styles.buttonsWrapper}>
                  <div ref={componentRef} className={styles.hidden}>
                     <ShoppingListTemplate products={dividedProducts} />
                  </div>
                  <ReactToPrint
                     trigger={() => (
                        <button type="button" className={styles.printButton}>
                           <Print className={styles.icon} />
                        </button>
                     )}
                     content={() => componentRef.current}
                  />
                  <a href={pdf.url as string} download="my-shopping-list.pdf">
                     <button type="button" className={styles.saveButton} disabled={!!(pdf.loading || pdf.error)}>
                        <Save className={styles.icon} />
                     </button>
                  </a>
               </div>
            )}
         </div>

         <div className={styles.productsContainer}>
            {products.length === 0 && (
               <div className={styles.emptyProducts}>
                  <Empty className={styles.illustration} />
                  <p className={styles.info}>Your shopping list is empty. Check our recipes and add ingredients!</p>
               </div>
            )}
            <ul className={styles.productsList}>
               {!!products.length &&
                  products.map(({ id, name, weight }, index) => (
                     <li className={styles.product} key={id}>
                        <div className={styles.productNumber}>{index + 1}.</div>
                        <div className={styles.productName}>
                           {name} <span className={styles.productWeight}>{`${weight}g`}</span>
                        </div>
                        <div className={styles.productActions}>
                           <button
                              type="button"
                              className={styles.removesButton}
                              onClick={() => dispatch(deleteProduct(id))}
                           >
                              <Remove />
                           </button>
                        </div>
                     </li>
                  ))}
            </ul>
         </div>
         {!!products.length && (
            <div className={styles.trashContainer}>
               <button type="button" className={styles.trashButton} onClick={clearShoppingList}>
                  <Trash className={styles.trashIcon} />
               </button>
            </div>
         )}
      </div>
   );
};

export default ShoppingListContainer;
