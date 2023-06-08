import  PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from "react-redux";
import { postRequestWithToken } from "../../utils/network";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";
import sendIco from "../../img/send.png";
import styles from "./SendMessage.module.scss";

const SendMessage = ({ senderId, recipientId }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const url = `https://spring-snap-itei.onrender.com/message/${senderId}/send/${recipientId}`;

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = () => {
    postRequestWithToken(url, { body: message }, token).catch(() =>
      setIsError(true)
    );

    setMessage("");
  };

  return (
    <div className={styles.wrap}>
      <h3>You can send a message to the author</h3>
      <textarea
        value={message}
        type="text"
        onChange={onChangeMessage}
      ></textarea>
      <button onClick={() => onSendMessage()}>
        send message <img src={sendIco} alt="send" />
      </button>
      {isError ? <SimpleErrorMessage /> : ""}
    </div>
  );
};

SendMessage.propTypes = {
  senderId: PropTypes.number,
  recipientId: PropTypes.number
}
export default SendMessage;
