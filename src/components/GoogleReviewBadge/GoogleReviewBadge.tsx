import { useId } from 'react';
import styles from './GoogleReviewBadge.module.scss';

export const GOOGLE_REVIEW_URL = 'GOOGLE_REVIEW_URL';

type GoogleReviewBadgeProps = {
  reviewUrl?: string;
};

export const GoogleReviewBadge = ({ reviewUrl = GOOGLE_REVIEW_URL }: GoogleReviewBadgeProps) => {
  const id = useId().replace(/:/g, '');
  return (
    <a className={styles.badge} href={reviewUrl} target="_blank" rel="noopener noreferrer" aria-label="Dana Tattoo Studio auf Google bewerten">
      <svg className={styles.ring} viewBox="0 0 180 180" aria-hidden="true" focusable="false">
        <defs>
          <path id={`${id}-top`} d="M 22,90 A 68,68 0 0,1 158,90" />
          <path id={`${id}-bottom`} d="M 18,90 A 72,72 0 0,0 162,90" />
        </defs>
        <circle cx="90" cy="90" r="86" className={styles.outerRing} />
        <circle cx="90" cy="90" r="60" className={styles.innerRing} />
        <text><textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">DEINE ERFAHRUNG</textPath></text>
        <text><textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">VIELEN LIEBEN DANK</textPath></text>
        <path className={styles.diamond} d="M14 87 17 90 14 93 11 90ZM166 87 169 90 166 93 163 90Z" />
      </svg>
      <span className={styles.content} aria-hidden="true">
        <span className={styles.flower}>✧</span>
        <span className={styles.title}>Bewerte mich</span>
        <span className={styles.subtitle}>auf Google</span>
        <span className={styles.stars}>★★★★★</span>
      </span>
    </a>
  );
};
