'use client';

import { useNotificationProvider } from '@refinedev/antd';
import { type AuthBindings, GitHubBanner, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ColorModeContextProvider } from '@contexts/color-mode';
import { dataProvider } from '@providers/data-provider';
import '@refinedev/antd/dist/reset.css';

type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (props: React.PropsWithChildren<RefineContextProps>) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = ({ children, defaultMode }: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async ({ providerName, email, password }: any) => {
      if (providerName) {
        signIn(providerName, {
          // callbackUrl: to ? to.toString() : '/',
          redirect: false,
        });

        return { success: true, redirectTo: '/' };
      }

      const signInResponse = await signIn('CredentialsSignIn', {
        email,
        password,
        callbackUrl: to ? to.toString() : '/',
        redirect: false,
      });

      if (!signInResponse) {
        return { success: false };
      }

      const { ok, error } = signInResponse;

      if (ok) {
        return { success: true, redirectTo: '/' };
      }

      return {
        success: false,
        error: new Error(error?.toString()),
      };
    },
    logout: async () => {
      console.log('log user out');
      signOut({ redirect: false });

      // , redirectTo: '/login'
      return { success: true, redirectTo: '/logout' };
    },
    onError: async (error: any) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === 'unauthenticated') {
        return { authenticated: false, redirectTo: '/login' };
      }

      return { authenticated: true };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: 'customers',
                create: '/customers/create',
              },
              {
                name: 'blog_posts',
                list: '/blog-posts',
                create: '/blog-posts/create',
                edit: '/blog-posts/edit/:id',
                show: '/blog-posts/show/:id',
                meta: {
                  canDelete: true,
                },
              },
              {
                name: 'categories',
                list: '/categories',
                create: '/categories/create',
                edit: '/categories/edit/:id',
                show: '/categories/show/:id',
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            {children}
            <RefineKbar />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
