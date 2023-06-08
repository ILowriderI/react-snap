import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../../redux/slices/productSlice";
import { isTokenPresent } from "../../utils/token";
import { getRequest } from "../../utils/network";
import { Link, useParams } from "react-router-dom";
import SendMessage from "../SendMessage/SendMessage";
import SavedButton from "../buttons/SavedButton/SavedButton";
import Slider from "../Slider/Slider";
import defaultImg from "../../img/default-img.jpg"
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
  const senderId = useSelector((state) => state.tokenReducer.item.userId);
  const [item, setItem] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([{ url: "" }]);
  const [date, setDate] = useState([]);
  const errImg = [ { url:defaultImg, }];
  const urlProd = `http://localhost:8080/product/id/${id}`;

 

useEffect(() => {
    getRequest(urlProd).then(({ data }) => {
      setItem(data);
      data.imageList.length !== 0
        ? setSlides(data.imageList)
        : setSlides(errImg);
      setDate(data.dateOfCreated);
      dispatch(setProduct(data));
    });
  }, [id, dispatch]);

  return (
    <div className={styles.wrap}>
      <h1>{item.title}</h1>
      <Slider slides={slides} />
<div className={styles.save_btn}>
  <SavedButton productId={item.id}  />
</div>
      <ul>
        <li>author name : {item.userName} </li>
        <li>price: {item.price}$ </li>
        <li>
          date of created : {date[2]}.{date[1]}.{date[0]}{" "}
        </li>
        <li>
          time of created : {date[3]}:{date[4]}{" "}
        </li>
        <li>description : </li>
      </ul>
      <div className={styles.description}>{item.description}</div>
      {isTokenPresent() ? 
      senderId !== item.userId ?  <SendMessage  senderId={senderId} recipientId={item.userId} /> : ""
       : 
        <div className={styles.message }>
          If you want to send a message to the authors you must
          <Link to="/register"> register </Link> or{" "}
          <Link to="/login"> login </Link>
        </div>
      }
    </div>
  );
};

export default ProductPage;
