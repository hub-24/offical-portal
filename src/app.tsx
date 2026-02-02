// ... top imports ...
import { useEffect } from 'react';

function ensureAdsScriptPresent() {
  if ((window as any).adsbygoogle) return;
  const id = 'adsbygoogle-js';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8167320193401713';
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

const App = () => {
  useEffect(() => {
    ensureAdsScriptPresent();
  }, []);
  // rest of your App...
};
