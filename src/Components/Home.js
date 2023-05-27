import React from 'react';
import Background from '../Assets/Component-2.svg';
// import { ReactComponent as Background } from '../Assets/Component 1.svg';
import styles from './Home.module.css';

const Home = () => {
  const handleClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.principalText}>
        <h1 className={styles.title}>Connecting sport lovers</h1>
        <p className={styles.text}>
          A place where you are free to talk about your favorite sport, being a
          team fan or not. Where you can meet new people and spend time with
          your friends. A place that makes it easy to meet and connect you with
          other sport lovers.
        </p>
      </div>
      <img src={Background} alt="Background" className={styles.background} />
      <div className={styles.secondContainer}>
        <button onClick={handleClick} className={styles.button}>
          Get started!
        </button>
      </div>
    </div>
  );
};

export default Home;
