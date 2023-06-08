import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { setTokenItem } from "../../redux/slices/tokenSlice";
import { setUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRequest, postRequest, getRequestWithToken,} from "../../utils/network";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";
import ConfirmButton from "../buttons/ConfirmButton/ConfirmButton";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserPresent, setIsUserPresent] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlAuth = "https://spring-snap-itei.onrender.com/auth/authenticate";

  const checkUser = (e) => {
    getRequest(`https://spring-snap-itei.onrender.com/auth/user/${e.target.value}`).then(
      ({ data }) => setIsUserPresent(data)
    );
  };

  const onChangeEmail = (e) => {
    checkUser(e)
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const user = {
    email: email,
    password: password,
  };

  const onLogin = () => {
    postRequest(urlAuth, user)
      .then(({ data }) => {
        dispatch(
          setTokenItem({
            userId: data.userId,
            access_token: data.access_token,
            exp: jwtDecode(data.access_token).exp,
          })
        );
        getRequestWithToken(`https://spring-snap-itei.onrender.com/user/${data.userId}`,data.access_token)
        .then(({ data }) => {
          dispatch(setUser(data));
          navigate("/");
        });
      })
      .catch(() => setIsError(true));
  };

  return (
    <div className={styles.wrap}>
      <h1>Login</h1>
      <div>
        <input placeholder="email" type="text" onBlur={onChangeEmail} />
        {isUserPresent ? (
          ""
        ) : (
          <span>user with this email is not registered</span>
        )}
        <input
          placeholder="password"
          type="password"
          onChange={onChangePassword}
        />

        <ConfirmButton
          text="Confirm"
          onClick={onLogin}
          disabled={isUserPresent ? false : true}
        />
        {isError ? <SimpleErrorMessage /> : ""}
        <div className={styles.register}>
          don't have an account yet?
          <Link to="/register">registration here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
