import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRequestWithToken,postRequestWithToken } from "../../utils/network";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage"
import checkIco from "../../img/check-mark.png";
import sendIco from "../../img/send-message.png";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const userId = useSelector((state) => state.tokenReducer.item.userId);
  const { id } = useParams();
  const [secondUserId, setSecondUserId] = useState();
  const [sendMessage, setSendMessage] = useState();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMesseges] = useState([]);
  const [chatUserName, setChatUserName] = useState("");
  const [isError,setIsError] = useState(false);
  
  const urlSendMessage = `https://spring-snap-itei.onrender.com/message/${userId}/send/${secondUserId}`;
  const urlGetMessages = `https://spring-snap-itei.onrender.com/chat/messages/${id}/${userId}`;
  const urlGetUser = "https://spring-snap-itei.onrender.com/user/";

  const getChatData = () => {
getRequestWithToken(urlGetMessages,token)
.then(({data})=>{
  setMesseges(data);
  data.forEach(element => {
    if(element.recipient !== userId){
setSecondUserId(element.recipient);
getRequestWithToken(urlGetUser + element.recipient,token)
.then(({ data }) => setChatUserName(data.name))
.catch((error)=>console.log(error));
    }else{
      setSecondUserId(element.sender);
      getRequestWithToken(urlGetUser + element.sender,token)
.then(({ data }) => setChatUserName(data.name))
.catch((error)=>console.log(error));
    }
   
  });
})


  };

  useEffect(() => {
    getChatData();
  }, [sendMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      getChatData();
    }, 30000);
    return () => clearInterval(interval);
  }, [sendMessage]);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onSendMessage = () => {
    postRequestWithToken(urlSendMessage, { body: inputValue },token)
    .then((res) => setSendMessage(res))
    .catch(()=>setIsError(true))
    setInputValue("");
  };

  return (
    <div className={styles.wrap}> 
      <div className={styles.chat}>
        <div className={styles.chat_header}>
          Chat with user : {chatUserName}
        </div>
        {messages.map((item, index) => {
          return (
            <div key={index}>
              <div
                className={
                  item.sender !== secondUserId
                    ? styles.my_message
                    : styles.user_message
                }
              >
                {item.body}
                <span>
                  {item.dateOfCreated[3]}:{item.dateOfCreated[4]}{" "}
                </span>
                {item.sender !== secondUserId ? (
                  <img src={checkIco} alt="chek mark" />
                ) : (
                  ""
                )}
                {item.sender !== secondUserId && item.isRead === true ? (
                  <img
                    className={styles.isRead}
                    src={checkIco}
                    alt="chek mark"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
        <input value={inputValue} type="text" onChange={onChangeInput} />
        <button onClick={onSendMessage}>
          {" "}
          <img src={sendIco} alt="send message" />
        </button>
        {isError ? <SimpleErrorMessage/> : ""}
      </div>
      
    </div>
  );
};

export default ChatPage;







