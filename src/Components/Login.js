import React from 'react';
import styles from './Login.module.css';
import SignInGoogle from './SignInGoogle';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  const [formState, setFormState] = React.useState({
    inputEmail: '',
    inputPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          value={formState.inputEmail}
          onChange={handleChange}
        />
        <label label="Password:" className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={formState.inputPassword}
          onChange={handleChange}
        />
        <Link to={'/forgot'} className={styles.linkForgot}>
          Forgot password?
        </Link>
        <button>Sign in</button>
        <nav className={styles.navForgot}>
          Not sign up yet?<Link to={'/signup'}> Sign up!</Link>
        </nav>
        <SignInGoogle />
      </form>
    </div>
  );
};

export default Login;
