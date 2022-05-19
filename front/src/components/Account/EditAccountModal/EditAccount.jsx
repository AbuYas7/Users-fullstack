import React from "react";
import styles from "./edit.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editAvatar, editUser } from "../../../redux/features/user";

const EditAccount = ({ showEdit, handleShowEdit, user }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(user.executor);
  const [image, setImage] = useState(user.phone);
  const [password, setPassword] = useState(user.city);
  const [stop, setStop] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEditInfo = async () => {
      dispatch(editAvatar(image));
    dispatch(editUser(name, password));
    handleShowEdit();
  };

  return (
    <div className={`${styles.modal} ${!showEdit ? styles.hide : styles.show}`}>
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Редактирование</h3>
            <a onClick={handleShowEdit} className={styles.close}>
              ×
            </a>
          </div>
          <div className={styles.modalBody}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
                padding: "10px 5px",
              }}
            >
              <div style={{ width: "35%" }}>Имя</div>
              <div style={{ width: "65%" }}>
                <input
                  value={name}
                  onChange={handleName}
                  style={{ width: "100%" }}
                  placeholder="Необходимо ввести имя"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
                padding: "10px 5px",
              }}
            >
              <div style={{ width: "35%" }}>Фото</div>
              <div style={{ width: "65%" }}>
                <input
                  type="file"
                  onChange={(e) => handleImage(e)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
                padding: "10px 5px",
              }}
            >
              <div style={{ width: "35%" }}>Пароль:</div>
              <div style={{ width: "65%" }}>
                <input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  style={{ width: "100%" }}
                  placeholder="Необходимо ввести пароль"
                />
              </div>
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "red",
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              {stop ? "Пожалуйста, обновите данные перед отправкой" : ""}
            </div>
            <div style={{ textAlign: "center", margin: "15px 0" }}>
              <button
                onClick={handleEditInfo}
                className={`${styles.editBtn} ${styles.button}`}
              >
                <span>Подтвердить</span>
              </button>
              <button
                onClick={handleShowEdit}
                className={`${styles.removeBtn} ${styles.button}`}
              >
                <span>Отменить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
