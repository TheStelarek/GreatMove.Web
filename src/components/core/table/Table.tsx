import { Dispatch, SetStateAction, useEffect } from 'react';
import { Column, TableInstance, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import Select from 'react-select';
import GlobalFilter from '@/components/core/table/GlobalFilter';
import styles from '@/components/core/table/Table.module.scss';
import Input from '@/components/core/input/Input';
import LeftArrow from '@/public/icons/left-arrow.svg';
import RightArrow from '@/public/icons/right-arrow.svg';
import DoubleLeftArrow from '@/public/icons/double-left-arrow.svg';
import DoubleRightArrow from '@/public/icons/double-right-arrow.svg';

interface TableProps {
   columns: Array<Column>;
   data: Array<any>;
   tableHooks?: any;
   isSortable?: boolean;
   hasGlobalFilter?: boolean;
   hasPagination?: boolean;
   isEquallyGrow?: boolean;
   fetchData?: (pageSize: number, pageIndex: number) => Promise<void>;
   pageCount?: number;
   setSize?: Dispatch<SetStateAction<number>>;
   setIndex?: Dispatch<SetStateAction<number>>;
}

const Table: React.FC<TableProps> = ({
   columns,
   data,
   tableHooks = (hooks: TableInstance) => hooks.state,
   isSortable = false,
   hasGlobalFilter = false,
   hasPagination,
   isEquallyGrow,
   fetchData,
   pageCount: controlledPageCount,
   setSize,
   setIndex,
}) => {
   const tableInstance = useTable(
      {
         columns,
         data,
         initialState: { pageIndex: 0 },
         disableSortBy: !isSortable,
         disableGlobalFilter: !hasGlobalFilter,
         manualPagination: true,
         pageCount: controlledPageCount,
         autoResetPage: false,
      },
      tableHooks,
      useGlobalFilter,
      useSortBy,
      usePagination,
   );

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { pageIndex, pageSize, globalFilter },
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
   } = tableInstance;

   useEffect(() => {
      if (fetchData) fetchData(pageSize, pageIndex);
      if (setSize && setIndex) {
         setSize(pageSize);
         setIndex(pageIndex);
      }
   }, [fetchData, pageIndex, pageSize]);

   return (
      <>
         {hasGlobalFilter && (
            <GlobalFilter
               preGlobalFilteredRows={preGlobalFilteredRows}
               setGlobalFilter={setGlobalFilter}
               globalFilter={globalFilter}
            />
         )}
         <div className={styles.tableWrapper}>
            <table {...getTableProps()} className={styles.table}>
               <thead className={styles.head}>
                  {headerGroups.map((headerGroup) => {
                     const { key: headerKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();

                     return (
                        <tr key={headerKey} {...restHeaderGroupProps}>
                           {headerGroup.headers.map((column) => {
                              const { key: columnKey, ...restColumnProps } = column.getHeaderProps(
                                 column.getSortByToggleProps(),
                              );

                              return (
                                 <th
                                    key={columnKey}
                                    {...restColumnProps}
                                    className={isEquallyGrow ? styles.growEqually : ``}
                                 >
                                    {column.render(`Header`)}
                                    {column.isSorted && (column.isSortedDesc ? ` ▼` : ` ▲`)}
                                 </th>
                              );
                           })}
                        </tr>
                     );
                  })}
               </thead>

               <tbody className={styles.body} {...getTableBodyProps()}>
                  {rows.map((row) => {
                     prepareRow(row);
                     const { key: rowKey, ...restRowProps } = row.getRowProps();

                     return (
                        <tr key={rowKey} {...restRowProps}>
                           {row.cells.map((cell) => {
                              const { key: cellKey, ...restCellProps } = cell.getCellProps();

                              return (
                                 <td
                                    key={cellKey}
                                    {...restCellProps}
                                    className={isEquallyGrow ? styles.growEqually : ``}
                                 >
                                    {cell.render(`Cell`)}
                                 </td>
                              );
                           })}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         {hasPagination && (
            <div className={styles.paginationContainer}>
               <div className={styles.paginationWrapper}>
                  <div className={styles.buttonsWrapper}>
                     <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={styles.arrowBtn}>
                        <DoubleLeftArrow className={styles.doubleIcon} />
                     </button>
                     <button onClick={() => previousPage()} disabled={!canPreviousPage} className={styles.arrowBtn}>
                        <LeftArrow className={styles.icon} />
                     </button>
                     <button onClick={() => nextPage()} disabled={!canNextPage} className={styles.arrowBtn}>
                        <RightArrow className={styles.icon} />
                     </button>
                     <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className={styles.arrowBtn}
                     >
                        <DoubleRightArrow className={styles.doubleIcon} />
                     </button>
                  </div>
                  <p className={styles.currentPage}>
                     Page
                     <span>
                        {pageIndex + 1} of {pageOptions.length}
                     </span>
                  </p>
               </div>
               <div className={styles.inputsContainer}>
                  <div className={styles.inputWrapper}>
                     <Input
                        size="small"
                        radius={5}
                        type="number"
                        min={0}
                        placeholder="Enter number of page"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                           gotoPage(pageNumber);
                        }}
                     />
                  </div>
                  <div className={styles.inputWrapper}>
                     <Select
                        isSearchable={false}
                        classNamePrefix="react-select"
                        className="rs rs-small rs-radius-5"
                        options={[
                           { value: 10, label: `Show 10` },
                           { value: 20, label: `Show 20` },
                           { value: 30, label: `Show 30` },
                           { value: 40, label: `Show 40` },
                           { value: 50, label: `Show 50` },
                           { value: 100, label: `Show 100` },
                        ]}
                        placeholder="Select your activity"
                        value={{ value: pageSize, label: `Show ${pageSize}` }}
                        onChange={(event) => setPageSize(Number(event?.value))}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Table;
