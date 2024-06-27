"use client";

// Navigation.tsx

import Link from 'next/link';
import '@/styles/Navigation.css'

const Navigation = () => {
  return (
    <nav className="nav">
      <div className="nav-items">
        <Link href="/">
          Home
        </Link>
        <br /><br />
        <Link href="/codes">
          Codes
        </Link>
        <br /><br />
        <Link href="/services">
          Services
        </Link>
      </div>
        <a href="https://www.google.com/adsense" className="adsense-link">
          <div className="adsense-box">
            <p>AdSense setup completed, awaiting verification</p>
          </div>
        </a>
    </nav>
  );
};

export default Navigation;

