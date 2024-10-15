import type { IHtmlHeadProps } from '@/components/HtmlHead';
import type { AuthAccessLevel, UserRole, UserStatus } from '@/constants';
import type { RootState } from '@/redux/store';
import type { Layout } from '@/types';
import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';

export interface AppAdditionalProps {
  emotionCache?: EmotionCache;
}

export interface IAuthInitialProps {
  accessLevel: AuthAccessLevel;
  permissions?: UserRole[];
  statuses?: UserStatus[];
}

export interface IPageSettings {
  auth: IAuthInitialProps;
  metaData?: IHtmlHeadProps;
  layout?: Layout;
  initialReduxState?: RootState;
}

export type MyAppProps = AppProps & AppAdditionalProps;
