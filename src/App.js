import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import MyAccount from './Components/MyAccount';
import styles from './App.module.css';

// import { auth } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  // const user = useAuthState(auth);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/myaccount/*" element={<MyAccount />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
