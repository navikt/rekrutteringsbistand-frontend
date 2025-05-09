import RekrutteringsTreffLayout from './RekrutteringsTreffLayout';
import React from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RekrutteringsTreffLayout>{children}</RekrutteringsTreffLayout>;
}
