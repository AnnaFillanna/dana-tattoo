import { useEffect, useRef, useState } from 'react';

type LegalTextProps = { url: string; title: string };

export function LegalText({ url, title }: LegalTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new MutationObserver(() => {
      if (element.textContent?.trim() || element.querySelector('iframe')) {
        setLoaded(true);
      }
    });
    observer.observe(element, { childList: true, subtree: true });
    const script = document.createElement('script');
    script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
    script.async = true;
    // Defer insertion so React StrictMode's first setup is cleanly cancelled.
    const timer = window.setTimeout(() => document.body.appendChild(script), 0);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      script.remove();
    };
  }, [url]);

  return (
    <>
      {!loaded && (
        <p role="status">
          Falls der Text nicht angezeigt wird:{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title} direkt öffnen
          </a>
          .
        </p>
      )}
      <div ref={container} className="itrk-legaltext" data-itrk-legaltext-url={url} />
    </>
  );
}
