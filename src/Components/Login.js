import React from 'react';
import styles from './Login.module.css';
import SignInGoogle from './SignInGoogle';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const Login = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

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
        {error ? <p className={styles.error}>Invalid Credentials</p> : null}
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
