import  PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {getRequestWithToken} from "../../utils/network"
import unreadIco from "../../img/unreded-message.png";
import styles from "./ChatItem.module.scss";


const ChatItem = ({ senderId, chatId }) => {
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const [secondUserName, setSecondUserName] = useState("");
  const [message, setMessage] = useState("");
  const [isRead, setIsRead] = useState();

  const urlSender = `https://spring-snap-itei.onrender.com/user/${senderId}`;
  const urlLastMessage = `https://spring-snap-itei.onrender.com/chat/message/last/${chatId}`;


  useEffect(() => {
 
    getRequestWithToken(urlSender,token)
    .then(({ data }) => setSecondUserName(data.name))
    .catch((error)=>console.log(error));

    getRequestWithToken(urlLastMessage,token)
      .then(({ data }) => {
        setMessage(data.body);
        setIsRead(data.isRead);
      }).catch((error)=>console.log(error));
    
  }, []);

  return (
    <div className={isRead ? styles.is_read_wrap : styles.wrap}>
      <span >
        {" "}
        From : {secondUserName}
      </span>
      <span> Last message :" {message} " </span>
      {isRead ? "" : <img src={unreadIco} alt="unread" />}
    </div>
  );
};

ChatItem.propTypes = {
  senderId: PropTypes.number,
  chatId: PropTypes.number,
};

export default ChatItem;
