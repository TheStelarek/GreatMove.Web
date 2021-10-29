import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
   requireAuth?: boolean;
   getLayout?: (page: ReactElement) => ReactNode;
};
