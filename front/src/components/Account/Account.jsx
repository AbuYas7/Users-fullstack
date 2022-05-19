import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../redux/features/user";
import Header from "../Header/Header";
import styles from "./account.module.css";
import EditAccount from "./EditAccountModal/EditAccount";

const Account = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user1 = user?.find((user) => user._id === params.id);

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const age = getAge(user1?.birthday);

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <Header />
      {user1 && (
        <div className={styles.account}>
          <div className={styles.account_card}>
            <div className={styles.image}>
              <img src={`http://localhost:4000/${user1?.image}`} alt="phot" />
            </div>
            <div className={styles.info}>
              <span className={styles.name}>Ваше имя: {user1.name}</span>
              <p className={styles.age}>Ваш возраст: {age}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
              }}
            >
              Редактирование
              <div
                onClick={handleShowEdit}
                className={`${styles.editInfo} ${styles.btnInfo} ${styles.btnSett}`}
              ></div>
              <EditAccount
                showEdit={showEdit}
                handleShowEdit={handleShowEdit}
                user={user}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
