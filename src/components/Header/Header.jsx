import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { isTokenPresent } from "../../utils/token";
import { getRequestWithToken } from "../../utils/network";
import profileIco from "../../img/user.png";
import likeIco from "../../img/heart-header.png";
import msgIco from "../../img/messege-ico.png";
import addIco from "../../img/add-ico.png";
import menuIco from "../../img/menu.png";
import searchIco from "../../img/search-header.png";
import logo from "../../img/header-logo.png";
import styles from "./Header.module.scss";



const Header = () => {
  
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const userName = useSelector((state) => state.userReducer.user);
  const userId = useSelector((state) => state.tokenReducer.item.userId);
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const [countMessage, setCountMessage] = useState(0);
  const urlChat = `https://spring-snap-itei.onrender.com/chats/user/${userId}`;
  



  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const getCountUnreadMessage = () => {
    let count = 0;
    if (isTokenPresent()) {
      getRequestWithToken(urlChat, token).then(({ data }) => {
        data.forEach((element) => {
          element.messageList.forEach((el) => {
            if (el.isRead === false && el.recipient === userId) count++;
            setCountMessage(count);
          });
        });
      });
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    getCountUnreadMessage();
    
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCountUnreadMessage();
    }, 30000);
    return () => clearInterval(interval);
  }, [countMessage]);

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        {" "}
        <Link to="/">
          <img src={logo} alt="logo" /> <span>Snap Trade</span>{" "}
        </Link>
      </div>

      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames={styles.NavAnimation}
        unmountOnExit
      >
        <nav className={styles.Nav}>
          <Link to="/search">
            <img src={searchIco} alt="search" />
          </Link>
          <Link to="/message">
            <img src={msgIco} alt="message" />{" "}
            {isTokenPresent() ? (
              <span className={styles.count}>{countMessage}</span>
            ) : (
              ""
            )}
          </Link>
          <Link to="/saved">
            <img src={likeIco} alt="saved" />
          </Link>

          <Link to="/new-post" className={styles.add_btn}>
            <img src={addIco} alt="add" />
          </Link>
          <Link to="/profile">
            {" "}
            <img src={profileIco} alt="profile" />{" "}
            <span>{userName.email || ""}</span>
          </Link>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className={styles.Burger}>
        <img src={menuIco} alt="menu" />
      </button>
    </header>
  );
};

export default Header;
