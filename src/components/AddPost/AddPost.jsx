import { useEffect, useState } from "react";
import { setId } from "../../redux/slices/postIdSlice";
import { useDispatch, useSelector } from "react-redux";
import { postRequestWithToken } from "../../utils/network";
import { uaCity } from "../../data/uacity";
import { adaptArrayForSelect } from "../../utils/select";
import ConfirmButton from "../buttons/ConfirmButton/ConfirmButton";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";
import Select from "react-select";
import stImg from "../../img/step.png";
import okayIco from "../../img/okay.png";
import styles from "./AddPost.module.scss";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [isError, setIsErrror] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const userId = useSelector((state) => state.tokenReducer.item.userId);

  const dispatch = useDispatch();

  const urlAddPost = `http://localhost:8080/product/create/${userId}`;

  const post = {
    title: title,
    price: price,
    description: description,
    city: city,
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "25px",
    }),
    container: (provided) => ({
      ...provided,
      marginTop: "20px",
      width: "37.8%",
    }),
  };

  const isAllFillFilled = () => {
    if (
      title.length !== 0 &&
      price.length !== 0 &&
      city.length !== 0 &&
      description.length !== 0
    )
      return true;
    return false;
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.label);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onClickPost = () => {
    if (isAllFillFilled()) {
      postRequestWithToken(urlAddPost, post, token)
        .then(({ data }) => {
          dispatch(setId(data));
          setIsAdded(true);
        })
        .catch(() => setIsErrror(true));
    } else {
      alert("you must fill in all fields");
    }
  };

  useEffect(() => {
    setOptions(adaptArrayForSelect(uaCity));
  }, []);

  return (
    <div className={styles.wrap}>
      <h1>
        First step <img src={stImg} alt="step" />
      </h1>
      <div className={styles.msg}>
        Now concentrate, you must fill in all the fields
      </div>
      <span>*</span>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      <span>*</span>
      <input type="number" placeholder="Price" onChange={onChangePrice} />
      <span>*</span>
      <Select options={options} onChange={onChangeCity} styles={customStyles} />
      <span>*</span>
      <textarea
        type="text"
        placeholder="Description"
        onChange={onChangeDescription}
      />
      <div className={styles.msg}>
        If you have filled in all the fields, click on this button.
      </div>
      <ConfirmButton text="Confirm" onClick={onClickPost} />
      {isError ? <SimpleErrorMessage /> : ""}
      {isAdded ? <img className={styles.img} src={okayIco} alt="okay" /> : ""}
    </div>
  );
};

export default AddPost;
