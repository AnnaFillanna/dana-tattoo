import type { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

type PageLayoutProps = {
  title: string;
  children?: ReactNode;
  eyebrowClassName?: string;
};

export const PageLayout = ({ title, children, eyebrowClassName }: PageLayoutProps) => (
  <main className={styles.page}>
    <a className={styles.back} href="/">Zur Startseite</a>
    <header className={styles.heading}>
      <p className={eyebrowClassName}>Dana Tattoo Studio</p>
      <h1>{title}</h1>
    </header>
    <div className={styles.content}>
      {children ?? <p className={styles.placeholder}>Weitere Inhalte folgen in Kürze.</p>}
    </div>
  </main>
);
