import React from 'react';
import { useAuth, useDatabase, useFirestoreCollectionData } from 'reactfire';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import styles from './Chat.module.css';
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
  const auth = useAuth();
  const database = useDatabase();
  const [user] = useAuthState(auth);

  const [titles, setTitles] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [selectedSportId, setSelectedSportId] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState('');
  const [isMenuActive, setIsMenuActive] = React.useState(true);

  const titlesRef = collection(database, 'Sports');
  const { data: sportsList } = useFirestoreCollectionData(titlesRef);

  const messagesRef = selectedSportId
    ? collection(database, 'Sports', selectedSportId, 'childItems')
    : collection(database, 'Sports', 'o5BaZ1PuxJBLUf2SvINB', 'childItems');
  const { data: messageList } = useFirestoreCollectionData(messagesRef);

  const iconsNames = [
    { name: 'Soccer', icon: Soccer },
    { name: 'Baseball', icon: Baseball },
    { name: 'Golf', icon: Golf },
    { name: 'Handball', icon: Handball },
    { name: 'Hockey', icon: Hockey },
    { name: 'Basketball', icon: Basketball },
    { name: 'Football', icon: Football },
  ];
  const sortedTitles =
    titles && titles.sort((a, b) => a.title.localeCompare(b.title));

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        window.location.href = '/login';
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [user]);

  React.useEffect(() => {
    setTitles(sportsList);
  }, [sportsList]);

  const handleSportClick = (sportId) => {
    setSelectedSportId(sportId);
  };

  React.useEffect(() => {
    setMessages(messageList);
  }, [messageList]);

  const handleSubmitNewMessage = async (e) => {
    e.preventDefault();
    if (!selectedSportId) {
      alert('Please select a channel');
    } else if (newMessage === '') {
      alert('Please enter a valid message');
    } else {
      await addDoc(messagesRef, {
        message: newMessage,
        timestamp: serverTimestamp(),
        uid: user.uid,
      });
      setNewMessage('');
    }
  };

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
                    onClick={() => handleSportClick(title.NO_ID_FIELD)}
                    to={`/chat/${title.title}`}
                    key={title.NO_ID_FIELD}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className={`${styles.button} ${styles.buttonSend}`}
              type="submit"
            >
              Send
            </button>
          </form>
          <section className={styles.scrollBox}>
            <div className={styles.divMessageSent}>
              {messages &&
                messages.map((message, index) => {
                  return (
                    <p key={index} className={styles.messageSent}>
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
