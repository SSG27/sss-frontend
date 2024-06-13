"use client";

import Link from 'next/link';
import '@/styles/Navigation.css'

const Navigation: React.FC = () => {
  return (
    <nav className="nav">
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
    </nav>
  );
};

export default Navigation;
