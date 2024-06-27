"use client";

import React, { useEffect } from 'react';

const AdSenseAd: React.FC<{ slot: string, format?: string, layout?: string, style?: React.CSSProperties }> = ({ slot, format = 'auto', layout, style }) => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-9915864005145670"
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
    ></ins>
  );
};

export default AdSenseAd;
