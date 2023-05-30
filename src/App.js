import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import styles from './App.module.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Chat from './Components/Chat';

const App = () => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const database = getFirestore(firebaseApp);

  return (
    <DatabaseProvider sdk={database}>
      <AuthProvider sdk={auth}>
        <div className={styles.app}>
          <BrowserRouter>
            <Header />
            <main className={styles.main}>
              <Routes>
                <Route path="/sports-chat/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <Route path="chat/*" element={<Chat />} />
                <Route path="signup/*" element={<SignUp />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </DatabaseProvider>
  );
};

export default App;
