import React from 'react';
import Navigation from '@/components/Navigation';
import AdSenseAd from '@/components/AdSenseAd'; // Import the AdSenseAd component
import styles from '@/styles/layout.module.css';

export const metadata = {
  title: 'Streaming Search Service',
  description: 'Created by Sanju',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Navigation />
        <div className={styles.adContainer}>
          <AdSenseAd slot="1234567890" style={{ width: '100px', height: '300px' }} /> {/* Vertical Ad on the left */}
        </div>
        <main className={styles.main}>
          {children}
        </main>
        <div className={styles.rightAdContainer}>
          <AdSenseAd slot="0987654321" style={{ width: '100px', height: '300px' }} /> {/* Vertical Ad on the right */}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
