import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../redux/features/application";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.application.error);

  const [select, setSelect] = useState("user");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const [nameErr, setNameErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [birthdayErr, setBirthdayErr] = useState();
  const [genderErr, setGenderErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [generalErr, setGeneralErr] = useState(true);

  const handleInput = (e, key) => {
    if (key === "name") {
      setName(e.target.value);
      e.target.value ? setNameErr(false) : setNameErr(true);
    }
    if (key === "birthday") {
      setBirthday(e.target.value);
      e.target.value ? setBirthdayErr(false) : setBirthdayErr(true);
    }

    if (key === "gender") {
      setGender(e.target.value);
      e.target.value ? setGenderErr(false) : setGenderErr(true);
    }
    if (key === "mail") {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      setMail(e.target.value);
      e.target.value ? setMailErr(false) : setMailErr(true);
      if (!reg.test(e.target.value)) {
        setMailErr(true);
      }
    }
    if (key === "password") {
      setPassword(e.target.value);
      e.target.value ? setPasswordErr(false) : setPasswordErr(true);
    }
    if (name && mail && password) {
      setGeneralErr(false);
    } else {
      setGeneralErr(true);
    }
  };

  const setAllClear = () => {
    setName("");
    setBirthday("");
    setGender("");
    setMail("");
    setPassword("");
    setImage("");
    setNameErr("");
    setBirthdayErr("");
    setGenderErr("");
    setMailErr("");
    setPasswordErr("");
    setImageErr("");
    setGeneralErr(true);
  };
  const checkError = () => {
    if (!error) {
      navigate("/signin");
    }
  };

  const signUpClient = () => {
    dispatch(createUser(name, mail, password, birthday, gender, image));
    checkError();
    setAllClear();
  };

  setTimeout(error, 3000);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.link}>
        <span>Уже есть аккаунт?</span>
        <Link to={"/signin"}>
          <p className={styles.entry}>Войти</p>{" "}
        </Link>
      </div>
      {select === "user" && (
        <div className={styles.form}>
          <h2>Зарегистрироваться</h2>

          <p>Имя</p>
          <input
            className={nameErr ? styles.error : styles.notErr}
            type="text"
            value={name}
            onChange={(e) => handleInput(e, "name")}
          />

          <p>
            <label htmlFor="birthday">Birthday:</label>
          </p>
          <input
            type="date"
            className={styles.birthday}
            id="birthday"
            value={birthday}
            onChange={(e) => handleInput(e, "birthday")}
          />

          <p>Пол</p>
          <select
            name="pol"
            onChange={(e) => setGender(e.target.value)}
            className={styles.gender_spisok}
          >
            <option value="Другое">Другое</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>

          <p>Электронная почта</p>
          <input
            className={mailErr ? styles.error : styles.notErr}
            type="text"
            value={mail}
            onChange={(e) => handleInput(e, "mail")}
          />
          <p>Пароль</p>
          <input
            className={passwordErr ? styles.error : styles.notErr}
            type="password"
            value={password}
            onChange={(e) => handleInput(e, "password")}
          />
          <div>
            <button
              disabled={generalErr}
              className={
                generalErr ? styles.signUpBtnDisabled : styles.signUpBtn
              }
              onClick={signUpClient}
            >
              Регистрация
            </button>
          </div>
          {error && (
            <div className={styles.errorInfo}>Поля заполнены некорректно</div>
          )}
          <Link to="/people">
            <button className={styles.but_gl}>На главную</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUp;
