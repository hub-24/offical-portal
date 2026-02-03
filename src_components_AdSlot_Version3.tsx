import React, { useEffect } from 'react';

interface Props {
  id: string;
  adSlot?: string; // data-ad-slot id
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AdSlot component - renders an AdSense slot when adSlot is provided.
 * If script isn't loaded yet, pushing adsbygoogle is attempted (no crash).
 */
const AdSlot: React.FC<Props> = ({ id, adSlot, className = '', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // dev-time: no-op
    }
  }, []);

  return (
    <div id={id} className={className} style={style}>
      {adSlot ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8167320193401713"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div style={{ padding: 12, color: '#888', textAlign: 'center' }}>Ad slot: {id}</div>
      )}
    </div>
  );
};

export default AdSlot;