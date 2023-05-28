import React from 'react';
import styles from './Chat.module.css';
import { auth, database } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  onSnapshot,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { MdSportsSoccer as Soccer } from 'react-icons/md'; //soccer
import { BiBaseball as Baseball } from 'react-icons/bi'; //baseball
import { MdOutlineSportsGolf as Golf } from 'react-icons/md'; //golf
import { MdOutlineSportsHandball as Handball } from 'react-icons/md'; //handball
import { MdSportsHockey as Hockey } from 'react-icons/md'; //hockey
import { CiBasketball as Basketball } from 'react-icons/ci'; //basketball
import { CiFootball as Football } from 'react-icons/ci'; //football
import { GrMenu } from 'react-icons/gr';

const Chat = () => {
  const [titles, setTitles] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [selectedSportId, setSelectedSportId] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState('');
  const [user] = useAuthState(auth);
  const [isMenuActive, setIsMenuActive] = React.useState(true);

  const iconsNames = [
    { name: 'Soccer', icon: Soccer },
    { name: 'Baseball', icon: Baseball },
    { name: 'Golf', icon: Golf },
    { name: 'Handball', icon: Handball },
    { name: 'Hockey', icon: Hockey },
    { name: 'Basketball', icon: Basketball },
    { name: 'Football', icon: Football },
  ];
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

  const handleSportClick = async (sportId) => {
    const subcollectionSnapshot = await getDocs(
      collection(database, 'Sports', sportId, 'childItems'),
    );
    let messages = [];
    subcollectionSnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messages);
    setSelectedSportId(sportId);
  };

  const handleSubmitNewMessage = async (e) => {
    e.preventDefault();
    if (!selectedSportId) {
      alert('Please select a channel');
      return;
    } else if (newMessage === '') {
      alert('Please enter a valid message');
      return;
    } else {
      const { uid } = auth.currentUser;
      await addDoc(
        collection(database, 'Sports', selectedSportId, 'childItems'),
        {
          message: newMessage,
          timestamp: serverTimestamp(),
          uid,
        },
      );
    }
  };

  React.useEffect(() => {
    if (selectedSportId) {
      const timeout = setTimeout(() => {
        const q = query(
          collection(database, 'Sports', selectedSportId, 'childItems'),
          orderBy('timestamp', 'desc'),
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages);
        });
        return () => unsubscribe;
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [selectedSportId, messages]);

  const handleMenuMobile = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <div className={styles.flexContainer}>
        <h1 className={styles.title}>Chat</h1>
      </div>
      <button
        onClick={handleMenuMobile}
        className={`${styles.buttonMobile} ${
          isMenuActive ? '' : `${styles.rotateMenu}`
        }`}
      >
        <GrMenu />
      </button>
      <div className={styles.gridContainer}>
        <section>
          <div
            className={`${styles.aside} ${
              !isMenuActive ? `${styles.menuMobileHidden}` : ''
            }`}
          >
            {titles &&
              sortedTitles.map((title) => {
                const matchedIcon = iconsNames.map((icon) => {
                  if (title.title === icon.name) {
                    return <icon.icon key={icon.name} />;
                  }
                  return null;
                });
                return (
                  <Link
                    onClick={() => handleSportClick(title.id)}
                    to={`/chat/${title.title}`}
                    key={title.title}
                  >
                    {matchedIcon}
                    <p>{title.title}</p>
                  </Link>
                );
              })}
          </div>
        </section>
        <main className={`${!isMenuActive ? `${styles.takeMenuMobile}` : ''}`}>
          <form onSubmit={handleSubmitNewMessage} className={styles.formSend}>
            <input
              className={styles.input}
              type="text"
              placeholder="Send your Message"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className={`${styles.button} ${styles.buttonSend}`}>
              Send
            </button>
          </form>
          <section className={styles.scrollBox}>
            <div className={styles.divMessageSent}>
              {messages &&
                messages.map((message) => {
                  return (
                    <p key={message.id} className={styles.messageSent}>
                      {message.message}
                    </p>
                  );
                })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Chat;
