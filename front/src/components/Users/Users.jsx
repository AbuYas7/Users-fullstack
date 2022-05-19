import React, { useEffect } from "react";
import Header from "../Header/Header";
import User from "./User/User";
import styles from "./users.module.css";

const Users = () => {
  return (
    <>
    <Header/>
        <div className={styles.cards_users}>
        <User/>
        </div>
    </>
  );
};

export default Users;
