import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';

import styles from './Login.module.css';
import SignInGoogle from './SignInGoogle';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const Login = () => {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  React.useEffect(() => {
    if (user) {
      window.location.href = '/chat';
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!(email && password)) setError('Please fill all the fields');
    try {
      const response = await signInWithEmailAndPassword(email, password);
      if (response === undefined) setError('Invalid credentials');
    } catch {
      setError('Invalid credentials');
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
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
        <div className={styles.passwordInputContainer}>
          <label label="Password:" className={styles.label} htmlFor="password">
            Password:
          </label>
          <button
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <button className={styles.button} onClick={handleLogin}>
          Sign in
        </button>
        <nav className={styles.navForgot}>
          Not sign up yet?<Link to={'/signup'}> Sign up!</Link>
        </nav>
        <SignInGoogle />
      </form>
    </div>
  );
};

export default Login;
