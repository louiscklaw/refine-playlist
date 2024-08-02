'use client';

import { AuthPage as AuthPageBase } from '@refinedev/antd';
import type { AuthPageProps } from '@refinedev/core';
import { LoginPage } from './LoginPage';

export const AuthPage = (props: AuthPageProps) => {
  return (
    <>
      {/* <AuthPageBase
        {...props}
        formProps={{
          initialValues: {
            email: 'demo@refine.dev',
            password: 'demodemo',
          },
        }}
      /> */}
      <LoginPage {...props} />
    </>
  );
};
