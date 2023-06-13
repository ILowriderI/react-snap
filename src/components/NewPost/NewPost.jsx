import { useSelector } from "react-redux";
import { isTokenPresent } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddPost from "../AddPost/AddPost";
import AddImgToPost from "../AddImgToPost/AddImgToPost";
import LoginPage from "../LoginPage/LoginPage";
import ConfirmButton from "../buttons/ConfirmButton/ConfirmButton";
import ModalNewPost from "../ModalNewPost/ModalNewPost";
import stImg from "../../img/step.png";
import styles from "./NewPost.module.scss";

const NewPost = () => {
  const postId = useSelector((state) => state.postIdReducer.id);

  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };
  const goAddPost = () => {
    setActive(false);
    window.location.reload();
    window.scrollTo(0, 0);
  };
 
  useEffect(() => {}, [active]);

  if (!isTokenPresent()) return <LoginPage />;
  return (
    <div className={styles.wrap}>
      <AddPost />
      <h1>
        Second step <img src={stImg} alt="step" />{" "}
      </h1>
      <div className={styles.msg}>
        {" "}
        If you want to add an image to this ad, when you're done click on the
        button below
      </div>
      {[...new Array(6)].map((_, index) => (
        <AddImgToPost postId={postId} key={index} />
      ))}
      <ConfirmButton text="Complete" onClick={() => setActive(true)} />
      <ModalNewPost
        active={active}
        setActive={setActive}
        onClickHome={goHomePage}
        onClickAddMore={goAddPost}
      />
    </div>
  );
};

export default NewPost;
