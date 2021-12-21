import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/types/AppDispatch';

export const useAppDispatch = () => useDispatch<AppDispatch>();
