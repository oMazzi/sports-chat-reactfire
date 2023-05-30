import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AuthProvider,
  DatabaseProvider,
  useFirebaseApp,
  /*FirebaseAppProvider,*/
  /*useFirestore,*/
  /*useFirestoreDocData,*/
  /*useDatabase,*/
  /*useFirebaseApp,*/
} from 'reactfire';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import styles from './App.module.css';
import Chat from './Components/Chat';
import { /*doc,*/ getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const App = () => {
  // const firestoreRef = doc(useFirestore(), 'Sports');
  // const { status, data } = useFirestoreDocData(firestoreRef);
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
