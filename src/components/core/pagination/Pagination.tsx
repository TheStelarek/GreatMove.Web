import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LeftArrow from '@/public/pagination/left-arrow.svg';
import RightArrow from '@/public/pagination/right-arrow.svg';
import styles from '@/components/core/pagination/Pagination.module.scss';

export interface PaginationProps {
  currentPage: string;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [paginationGroup, setPaginationGroup] = useState<number[]>([]);

  useEffect(() => {
    const start = Math.floor((parseInt(currentPage, 10) - 1) / 5) * 5;
    const group = new Array(5).fill(undefined).map((_, idx) => start + idx + 1);
    setPaginationGroup(group);
  }, [currentPage]);

  const nextDisabled = parseInt(currentPage, 10) === totalPages;
  const prevDisabled = parseInt(currentPage, 10) === 1;

  const prevPageUrl =
    currentPage === `2`
      ? `/recipes`
      : `/recipes/page/${parseInt(currentPage, 10) - 1}`;
  const nextPageUrl = `/recipes/page/${parseInt(currentPage, 10) + 1}`;

  const changePage = (item: number) =>
    item === 1 ? `/recipes` : `/recipes/page/${item}`;

  return (
    <div className={styles.paginationContainer}>
      {!prevDisabled && (
        <Link href={prevPageUrl}>
          <button type="button" className={styles.arrow}>
            <LeftArrow className={styles.icon} />
          </button>
        </Link>
      )}
      <div className={styles.buttons}>
        {paginationGroup.map((item) => (
          <Link href={changePage(item)} key={item}>
            <button type="button" className={styles.pageBtn}>
              <span>{item}</span>
            </button>
          </Link>
        ))}

        {!paginationGroup.includes(totalPages) && (
          <>
            <span className={styles.dots}>...</span>
            <Link href={changePage(totalPages)}>
              <button type="button" className={styles.pageBtn}>
                <span>{totalPages}</span>
              </button>
            </Link>
          </>
        )}
      </div>
      {!nextDisabled && (
        <Link href={nextPageUrl}>
          <button type="button" className={styles.arrow}>
            <RightArrow className={styles.icon} />
          </button>
        </Link>
      )}
      {/* Page {currentPage} of {totalPages} */}
    </div>
  );
};

export default Pagination;
