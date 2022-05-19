import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/features/application";
import styles from "./header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.application.token);
  const userId = useSelector((state) => state.application.Id)
  const user = useSelector(state => state.user.user)

  const user1 = user?.find((user) => user._id === userId);

  const handleExit = () => {
    dispatch(logOut());
  };
  
  return (
    <div className={styles.header}>
      <Link to={"/people"}>
        <div className={styles.people}>Accounts</div>
      </Link>
      <div className={styles.input}>
        <input type="text" name="" id="" />
      </div>
      {token ? <Link to={`/user/${userId}`}>
        <div className={styles.my_account}>
        <div className={styles.name}>
            <p>{user1?.name}</p>
          </div>
          <div className={styles.photo}>
            <img
              src="https://chto-eto-takoe.ru/uryaimg/32574385521dd1847f7d1e5b940491ef.jpg"
              alt=""
            />
          </div>
        </div>
      </Link> : <p className={styles.no_account}>Выполните вход</p>}
      <div className={styles.exit}>
        {token ? (
          <Link to='/people'><button className={styles.but_exit} onClick={handleExit}>
            Выход
          </button></Link>
        ) : (
          <Link to={"/"}>
            <button className={styles.but_exit}>Регистрация</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
