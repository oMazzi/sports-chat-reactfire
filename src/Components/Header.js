import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from './Header.module.css';
import LogOut from './LogOut';

const Header = () => {
  const auth = useAuth();
  const [user] = useAuthState(auth);

  const firstName = () => {
    if (user?.displayName) {
      const name = user.displayName.split(' ')[0];
      return name;
    }
    return null;
  };

  const handleClick = () => {
    window.location.href = '/signup';
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.navContainerLogo}>
          <Link
            className={styles.logo}
            to="/sports-chat-reactfire/"
            aria-label="Sports Chat Home"
          >
            Sports Chat
          </Link>
        </div>
        <div className={styles.navLinks}>
          {user ? (
            <>
              <Link to={'/chat'} className={styles.navLinkText}>
                Chat
              </Link>
              <span to={'/chat'} className={styles.navLinkText}>
                {firstName() ? `Hello ${firstName()}!` : 'Hello again!'}
              </span>
            </>
          ) : (
            <Link to={'/login'} className={styles.navLinkText}>
              Sign in
            </Link>
          )}
          {user ? (
            <LogOut />
          ) : (
            <button className={styles.navButton} onClick={handleClick}>
              SIGN UP
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
