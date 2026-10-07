import { useEffect, useState, type FormEvent } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '../lib/supabase';
import { GalleryManager } from '../components/GalleryManager';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configurationError, setConfigurationError] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let active = true;
    let authChanged = false;
    let unsubscribe: (() => void) | undefined;
    // Defer configuration state updates and keep server/client initial markup identical.
    void Promise.resolve().then(async () => {
      if (!active) return;
      try {
        const supabase = await getSupabase();
        if (!active) return;
        if (!supabase) {
          setConfigurationError(true);
          setLoading(false);
          return;
        }
        setClient(supabase);
        const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          if (!active) return;
          authChanged = true;
          setSession(nextSession);
          setLoading(false);
        });
        unsubscribe = () => data.subscription.unsubscribe();
        const result = await supabase.auth.getSession();
        if (!active || authChanged) return;
        if (result.error) setError('Deine Sitzung konnte nicht geladen werden. Bitte melde dich erneut an.');
        setSession(result.error ? null : result.data.session);
        setLoading(false);
      } catch {
        if (!active) return;
        setConfigurationError(true);
        setLoading(false);
      }
    });
    return () => { active = false; unsubscribe?.(); };
  }, []);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client || busy) return;
    setBusy(true);
    setError('');
    try {
      const { error: loginError } = await client.auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) {
        setError(loginError.code === 'invalid_credentials'
          ? 'E-Mail oder Passwort ist falsch. Prüfe deine E-Mail und zeige das Passwort zur Kontrolle an. Verwende die Zugangsdaten für die Website-Verwaltung.'
          : loginError.status === 429
            ? 'Zu viele Anmeldeversuche. Bitte versuche es in einigen Minuten erneut.'
            : 'Die Anmeldung ist derzeit nicht möglich. Bitte prüfe deine Verbindung und versuche es erneut.');
      } else { setPassword(''); setShowPassword(false); }
    } catch {
      setError('Die Anmeldung ist derzeit nicht möglich. Bitte prüfe deine Verbindung und versuche es erneut.');
    } finally { setBusy(false); }
  };

  const logout = async () => {
    if (!client || busy) return;
    setBusy(true);
    setError('');
    try {
      const { error: logoutError } = await client.auth.signOut();
      if (logoutError) setError('Abmelden war nicht möglich. Bitte versuche es erneut.');
      else { setSession(null); setEmail(''); }
    } catch { setError('Abmelden war nicht möglich. Bitte prüfe deine Verbindung.'); }
    finally { setBusy(false); }
  };

  return (
    <main className={styles.page}>
      <section className={`${styles.panel} ${session ? styles.authenticated : ''}`} aria-labelledby="admin-title" aria-busy={loading || busy}>
        <p className={styles.eyebrow}>Dana Tattoo Studio</p>
        <h1 id="admin-title">{session ? 'Dana Tattoo Studio – Verwaltung' : 'Verwaltung'}</h1>
        {loading ? <p role="status">Sitzung wird geprüft …</p> : configurationError ? (
          <p role="alert">Die Verwaltung ist noch nicht eingerichtet. Bitte hinterlege die Supabase-Konfiguration und starte die Website erneut.</p>
        ) : session ? (
          <><button type="button" disabled={busy} onClick={() => void logout()}>{busy ? 'Abmelden …' : 'Abmelden'}</button>
          {client && <GalleryManager key={session.user.id} client={client} />}</>
        ) : (
          <form onSubmit={event => void login(event)}>
            <label htmlFor="admin-email">E-Mail</label>
            <input id="admin-email" name="email" type="email" inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="next" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} disabled={busy} />
            <label htmlFor="admin-password">Passwort</label>
            <input id="admin-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="go" required value={password} onChange={event => setPassword(event.target.value)} disabled={busy} />
            <button className={styles.passwordToggle} type="button" aria-controls="admin-password" aria-pressed={showPassword} disabled={busy} onClick={() => setShowPassword(value => !value)}>
              {showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
            </button>
            <button type="submit" disabled={busy}>{busy ? 'Anmelden …' : 'Anmelden'}</button>
          </form>
        )}
        {error && <p className={styles.error} role="alert">{error}</p>}
      </section>
    </main>
  );
};
