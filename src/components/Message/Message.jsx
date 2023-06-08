import { isTokenPresent } from "../../utils/token";
import { useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequestWithToken } from "../../utils/network";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";
import ChatItem from "../ChatItem/ChatItem";
import Loader from "../Loader/Loader";

import styles from "./Message.module.scss";

const Message = () => {
  const [secondUserId, setSecondUserId] = useState([]);
  const item = useSelector((state) => state.tokenReducer.item);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const urlChat = `http://localhost:8080/chats/user/${item.userId}`;

  useEffect(() => {
    let arrayId = [];
    if(isTokenPresent())
    getRequestWithToken(urlChat, item.access_token).then(({ data }) => {
      setData(data);
      data.forEach((element) => {
        if (element.recipientId !== item.userId) {
          arrayId.push(element.recipientId);
          setSecondUserId(arrayId);
        } else {
          arrayId.push(element.senderId);
          setSecondUserId(arrayId);
        }
      });
      setIsLoading(false);
    }).catch(()=>setIsError(true));
  }, []);

  if (!isTokenPresent()) return <LoginPage />;
  return (
    <div className={styles.wrap}>
      <h1>Your messages</h1>
      {isLoading ? <Loader /> : ""}
      {isError ? <SimpleErrorMessage/> : ""}
      {data.map((item, index) => {
        return (
          <Link key={index} to={`/chat/${item.id}`}>
            <ChatItem senderId={secondUserId[index]} chatId={item.id} />
          </Link>
        );
      })}
    </div>
  );
};
export default Message;
