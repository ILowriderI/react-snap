import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from "react-redux";
import { postRequest, postRequestWithToken } from "../../utils/network";
import doneImg from "../../img/checked.png";
import erImg from "../../img/warning.png";

import styles from "./AddImgToPost.module.scss";

const AddImgToPost = ({ postId }) => {
  const [imgName, setImgName] = useState("");
  const [img, setImg] = useState(null);
  const [isImgAdded, setIsImgAdded] = useState(false);
  const [isImgError, setIsImgError] = useState(false);
  const token = useSelector((state) => state.tokenReducer.item.access_token);

  const urlSaveImg = "https://api.imgbb.com/1/upload?&key=11e3a4e95a0b6e75bb573a0db1f3795a";
  const urlAddImgToPost = `http://localhost:8080/product/add-image/${postId}`;

  let payload = new FormData();
  payload.append("image", img);

  const handleImg = (e) => {
    setImg(e.target.files[0]);
    setImgName(e.target.files[0].name);
  };

  const addImgToPost = (img) => {
    postRequestWithToken(urlAddImgToPost, img, token);
  };

  const onSendImg = () => {
    postRequest(urlSaveImg, payload)
      .then(({ data }) => {
        addImgToPost({ url: `${data.data.image.url}` });
        setIsImgAdded(true);
        setIsImgError(false);
      })
      .catch(() => {
        setIsImgError(true);
        alert("try agian");
      });
  };

  return (
    <div className={styles.wrap}>
      <label>
        <input type="file" onChange={handleImg} />
        Choose an image
      </label>
      <div>{imgName}</div>
      <button onClick={onSendImg}>Add image</button>
      <img src={erImg} alt="error" className={isImgError ? "" : styles.none} />
      <img src={doneImg} alt="done" className={isImgAdded ? "" : styles.none} />
    </div>
  );
};


AddImgToPost.propTypes = {
  
  postId: PropTypes.number,

}

export default AddImgToPost;
