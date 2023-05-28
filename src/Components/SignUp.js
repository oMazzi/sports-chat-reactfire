import React from 'react';
import styles from './Login.module.css';
import SignInGoogle from './SignInGoogle';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      window.location.href = '/chat';
    }
  }, [user]);
  console.log(user);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (email && password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
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
      <h1 className={styles.title}>Sign up</h1>
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
        <div className={styles.passwordInputContainer}>
          <label
            label="Confirm Password:"
            className={styles.label}
            htmlFor="confirmPassword"
          >
            Confirm password:
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
          id="confirmPassword"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <button className={styles.button} onClick={handleSignUp}>
          Sign up
        </button>
        <nav className={styles.navForgot}>
          Already sign up?<Link to={'/login'}> Sign in!</Link>
        </nav>
        <SignInGoogle />
      </form>
    </div>
  );
};

export default SignUp;
