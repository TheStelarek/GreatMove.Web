import { ChangeEvent } from 'react';
import { Row, useAsyncDebounce } from 'react-table';
import { useForm } from 'react-hook-form';
import Input from '@/components/core/input/Input';

const GlobalFilter: React.FC<{
   preGlobalFilteredRows: Row<any>[];
   globalFilter: string;
   setGlobalFilter: (filterValue: any) => void;
}> = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
   const { register, setValue } = useForm<{ search: string }>();
   const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value);
   }, 300);

   const searchField = register(`search`);
   setValue(`search`, globalFilter);

   const count = preGlobalFilteredRows.length;

   return (
      <div style={{ marginBottom: `10px` }}>
         <Input
            radius={5}
            size="big"
            {...searchField}
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
               onChange(e.target.value);
               searchField.onChange(e);
            }}
            placeholder={`Search among ${count} records ...`}
            type="text"
         />
      </div>
   );
};

export default GlobalFilter;
