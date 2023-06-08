import { useDispatch } from "react-redux";
import { useState } from "react";
import { setTokenItem } from "../../redux/slices/tokenSlice";
import { setUser } from "../../redux/slices/userSlice";
import {getRequest, postRequest,getRequestWithToken} from "../../utils/network";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../buttons/ConfirmButton/ConfirmButton";
import SimpleErrorMessage from "../SimpleErrorMessage/SimpleErrorMessage";
import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUserPresent, setIsUserPresent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const urlReg = "http://localhost:8080/auth/register";
  const dispatch = useDispatch();
  const naigate = useNavigate();

  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegExp = /^[A-Za-z][A-Za-z0-9_#$~`]{2,29}$/;
  const passwordRegExp =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
  const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  const checkUser = (e) => {
    getRequest(`http://localhost:8080/auth/user/${e.target.value}`).then(
      ({ data }) => setIsUserPresent(data)
    );
  };

  const onChangeEmail = (e) => {
    checkUser(e);
    if (emailRegExp.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    if (passwordRegExp.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    setPassword(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    if (phoneRegExp.test(e.target.value)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
    setPhoneNumber(e.target.value);
  };
  const onChangeName = (e) => {
    if (nameRegExp.test(e.target.value)) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setName(e.target.value);
  };

  const user = {
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  };

  const onSendRegistration = () => {
    postRequest(urlReg, user)
      .then(({ data }) => {
        dispatch(
          setTokenItem({
            userId: data.userId,
            access_token: data.access_token,
            exp: jwtDecode(data.access_token).exp,
          })
        );
        getRequestWithToken(
          `http://localhost:8080/user/${data.userId}`,
          data.access_token
        ).then(({ data }) => {
          dispatch(setUser(data));
          naigate("/");
        });
      })
      .catch(() => setIsError(true));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.cont}>
        <span>Enter your email</span>
        <input
          className={isEmailValid ? styles.valid_input : styles.invalid_input}
          placeholder="email"
          type="text"
          onBlur={onChangeEmail}
        />
        {isUserPresent ? (
          <div className={styles.msg}>
            user with this email address already exists{" "}
          </div>
        ) : (
          ""
        )}
        <span>
          Password length should be 8 - 16 characters , must contain at least 1
          uppercase letter and 1 lowercase letter and 1 number, must contain any
          of this special characters $ % # * & - .
        </span>
        <input
          className={
            isPasswordValid ? styles.valid_input : styles.invalid_input
          }
          type="password"
          placeholder="password"
          onBlur={onChangePassword}
        />
        <span>
          Name length should be 3 - 29 characters , can contain any of this
          special characters $ % # * & - .
        </span>
        <input
          className={isNameValid ? styles.valid_input : styles.invalid_input}
          type="text"
          placeholder="name"
          onBlur={onChangeName}
        />
        <span>Enter your phone number</span>
        <input
          className={isPhoneValid ? styles.valid_input : styles.invalid_input}
          type="text"
          placeholder=" phone number"
          onBlur={onChangePhoneNumber}
        />
        <ConfirmButton
          disabled={
            isEmailValid &&
            isPasswordValid &&
            isNameValid &&
            isPhoneValid &&
            !isUserPresent
              ? false
              : true
          }
          text="Confirm"
          onClick={onSendRegistration}
        />
      </div>
      {isError ? <SimpleErrorMessage /> : ""}
    </div>
  );
};

export default RegisterPage;
