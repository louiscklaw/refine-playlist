'use client';
import authOptions from '@app/api/auth/[...nextauth]/options';
import { AuthPage } from '@components/auth-page';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default async function Logout() {
  useEffect(() => {
    redirect('/login');
  }, []);
  return <>logout page</>;
}

async function getData() {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}
