import React from 'react';
import styles from './Chat.module.css';
import { auth, database } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [titles, setTitles] = React.useState([]);
  const [user] = useAuthState(auth);
  const sortedTitles = titles.sort((a, b) => a.title.localeCompare(b.title));

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        window.location.href = '/login';
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [user]);

  React.useEffect(() => {
    const q = query(collection(database, 'Sports'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let titles = [];
      querySnapshot.forEach((doc) => {
        titles.push({ ...doc.data(), id: doc.id });
      });
      setTitles(titles);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={styles.flexContainer}>
        <h1 className={styles.title}>Chat</h1>
      </div>
      <div className={styles.gridContainer}>
        <section>
          <aside>
            {titles &&
              sortedTitles.map((title) => (
                <Link to={`/chat/${title.title}`} key={title.title}>
                  {title.title}
                </Link>
              ))}
          </aside>
        </section>
        <main>caixa de texto</main>
      </div>
    </>
  );
};

export default Chat;
