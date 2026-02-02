import React, { useEffect } from 'react';

interface Props {
  id: string;
  adSlot?: string; // data-ad-slot id
  className?: string;
  style?: React.CSSProperties;
}

const AdSlot: React.FC<Props> = ({ id, adSlot, className = '', style }) => {
  useEffect(() => {
    // Ensure adsbygoogle exists and push a slot if available
    // This will no-op if the global adsbygoogle script hasn't loaded yet.
    try {
      // @ts-ignore
      (window.adsbygoogle ||= []).push({});
    } catch (e) {
      // ignore: safe fallback for dev
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
        <div style={{ padding: 12, color: '#888', textAlign: 'center' }}>Ad: {id}</div>
      )}
    </div>
  );
};

export default AdSlot;
