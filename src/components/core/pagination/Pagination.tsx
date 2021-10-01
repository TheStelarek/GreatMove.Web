import React from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import LeftArrow from '@/public/pagination/left-arrow.svg';
import RightArrow from '@/public/pagination/right-arrow.svg';
import styles from '@/components/core/pagination/Pagination.module.scss';

interface PaginationProps {
  currentPage: string;
  totalPages: number;
  url: string;
}

interface SelectedItem {
  selected: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  url,
}) => {
  const router = useRouter();

  const paginationHandler = ({ selected }: SelectedItem) => {
    const link = selected + 1 === 1 ? url : `${url}/page/${selected + 1}`;
    router.push(link);
  };

  const linkHref = (pageIndex: number) =>
    pageIndex === 1 ? url : `${url}/page/${pageIndex}`;

  return (
    <ReactPaginate
      previousLabel={<LeftArrow className={styles.icon} />}
      nextLabel={<RightArrow className={styles.icon} />}
      previousClassName={styles.arrow}
      nextClassName={styles.arrow}
      previousLinkClassName={styles.arrowLink}
      nextLinkClassName={styles.arrowLink}
      disabledClassName={styles.arrowDisabled}
      containerClassName={styles.paginationContainer}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.pageActive}
      breakClassName={styles.break}
      breakLabel="..."
      pageCount={totalPages}
      initialPage={parseInt(currentPage, 10) - 1}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      hrefBuilder={linkHref}
      onPageChange={paginationHandler}
    />
  );
};

export default Pagination;
