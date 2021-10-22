import React, { ReactElement, useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { usePDF } from '@react-pdf/renderer';
import styles from '@/styles/MyShoppingList.module.scss';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import Layout from '@/components/core/layout/Layout';
import Save from '@/public/myShoppingList/save.svg';
import Print from '@/public/myShoppingList/print.svg';
import Trash from '@/public/myShoppingList/trash.svg';
import {
  shoppingListSelector,
  deleteProduct,
  clearState,
} from '@/store/shoppingList/ShoppingListSlice';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import ShoppingListTemplate from '@/utils/printTemplates/shoppingListTemplate/ShoppingListTemplate';
import { Ingredient } from '@/utils/types/Ingredient';
import chunks from '@/utils/functions/chunks';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';

const ShoppingList: NextApplicationPage = () => {
  const [dividedProducts, setDividedProducts] = useState<Array<Ingredient[]>>(
    [],
  );
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

  useEffect(updatePdf, [dividedProducts]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My shopping list</h1>
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
          <button
            type="button"
            className={styles.trashButton}
            onClick={clearShoppingList}
          >
            <Trash className={styles.icon} />
          </button>
        </div>
      </div>
      <div>
        <div className={styles.categories}>
          <div className={styles.categoryNumber} />
          <div className={styles.categoryProduct}>Product</div>
          <div className={styles.categoryWeight}>Weight</div>
          <div className={styles.actionButtons} />
        </div>
        <ul className={styles.products}>
          {products.map(({ id, name, weight }, index) => (
            <li className={styles.product} key={id}>
              <div className={styles.productNumber}>{index + 1}</div>
              <div className={styles.productName}>{name}</div>
              <div className={styles.productWeight}>{`${weight} g`}</div>
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
    </div>
  );
};

export default ShoppingList;

ShoppingList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
