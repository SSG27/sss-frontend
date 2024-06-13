import React from 'react';
import Navigation from '@/components/Navigation';
import styles from '@/styles/layout.module.css';

export const metadata = {
  title: 'Streaming Search Service',
  description: 'Created by Sanju',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Navigation />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
