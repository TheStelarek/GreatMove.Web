import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/utils/types/RootState';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
