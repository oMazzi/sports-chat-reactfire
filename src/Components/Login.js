import React from 'react';
import styles from './Login.module.css';
import SignInGoogle from './SignInGoogle';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (user) {
      window.location.href = '/chat';
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
          window.location.href = '/chat';
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label label="Password:" className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className={styles.error}>Invalid Credentials</p> : null}
        <Link to={'/forgot'} className={styles.linkForgot}>
          Forgot password?
        </Link>
        <button onClick={handleLogin}>Sign in</button>
        <nav className={styles.navForgot}>
          Not sign up yet?<Link to={'/signup'}> Sign up!</Link>
        </nav>
        <SignInGoogle />
      </form>
    </div>
  );
};

export default Login;
