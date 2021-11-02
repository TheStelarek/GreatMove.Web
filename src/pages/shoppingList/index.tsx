import React, { ReactElement, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { usePDF } from '@react-pdf/renderer';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import Layout from '@/components/core/layout/Layout';
import Save from '@/public/myShoppingList/save.svg';
import Print from '@/public/myShoppingList/print.svg';
import Trash from '@/public/myShoppingList/trash.svg';
import Empty from '@/public/myShoppingList/empty.svg';
import { shoppingListSelector, deleteProduct, clearState } from '@/store/shoppingList/ShoppingListSlice';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import ShoppingListTemplate from '@/utils/printTemplates/shoppingListTemplate/ShoppingListTemplate';
import { Ingredient } from '@/utils/types/Ingredient';
import chunks from '@/utils/functions/chunks';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import styles from './ShoppingList.module.scss';

const ShoppingList: NextApplicationPage = () => {
   const [dividedProducts, setDividedProducts] = useState<Array<Ingredient[]>>([]);
   const componentRef = React.useRef(null);
   const dispatch = useAppDispatch();

   const clearShoppingList = () => dispatch(clearState());

   const { products } = useAppSelector(shoppingListSelector);

   const [pdf, updatePdf] = usePDF({
      document: ShoppingListTemplate({ products: dividedProducts }),
   });

   useEffect(() => {
      setDividedProducts(chunks(products, 30));
   }, [products]);

   const [showMe, setShowMe] = useState(false);

   useEffect(updatePdf, [dividedProducts]);

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h1 className={styles.title}>My shopping list</h1>
            {!!products.length && (
               <div className={styles.buttons}>
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
                  <a href={pdf.url as string} download="shopping-list.pdf">
                     <button
                        type="button"
                        className={styles.saveButton}
                        disabled={!!(pdf.loading || pdf.error || !products.length)}
                     >
                        <Save className={styles.icon} />
                     </button>
                  </a>
               </div>
            )}
         </div>

         <div className={styles.productsContainer}>
            {products.length === 0 && (
               <div className={styles.productsEmpty}>
                  <Empty className={styles.emptyIcon} />
                  <p className={styles.emptyText}>
                     Your shopping list is empty. Check our recipes and add ingredients!
                  </p>
               </div>
            )}
            <ul className={styles.products}>
               {!!products.length &&
                  products.map(({ id, name, weight }, index) => (
                     <li className={styles.product} key={id}>
                        <div className={styles.productNumber}>{index + 1}. </div>
                        <div className={styles.productName}>{name}</div>
                        <div className={styles.productWeight}> {`${weight} g`}</div>
                        <div className={styles.productActions}>
                           <button
                              type="button"
                              className={styles.removesButton}
                              onClick={() => dispatch(deleteProduct(id))}
                           >
                              <span className={styles.removeButton} />
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

export default ShoppingList;

ShoppingList.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
