import { Column, TableInstance, useGlobalFilter, useSortBy, useTable } from 'react-table';
import GlobalFilter from '@/components/core/table/GlobalFilter';
import styles from '@/components/core/table/Table.module.scss';

interface TableProps {
   columns: Array<Column>;
   data: Array<any>;
   tableHooks?: any;
   isSortable?: boolean;
   hasGlobalFilter?: boolean;
}

const Table: React.FC<TableProps> = ({
   columns,
   data,
   tableHooks = (hooks: TableInstance) => hooks.state,
   isSortable = false,
   hasGlobalFilter = false,
}) => {
   const tableInstance = useTable(
      {
         columns,
         data,
         disableSortBy: !isSortable,
         disableGlobalFilter: !hasGlobalFilter,
      },
      tableHooks,
      useGlobalFilter,
      useSortBy,
   );

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state,
   } = tableInstance;

   return (
      <>
         {hasGlobalFilter && (
            <GlobalFilter
               preGlobalFilteredRows={preGlobalFilteredRows}
               setGlobalFilter={setGlobalFilter}
               globalFilter={state.globalFilter}
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
                                 <th key={columnKey} {...restColumnProps}>
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
                                 <td key={cellKey} {...restCellProps}>
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
      </>
   );
};

export default Table;
