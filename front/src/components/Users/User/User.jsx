import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/features/user";
import styles from "./user.module.css";

const User = ({ image }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.application.Id)

const usersWithoutCurrent = user?.filter((item, i) => {
    if(item._id === userId){
      user.splice(i, 1)
    }else{
      return user
    }
})

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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

  return (
    <div className={styles.user_card}>
      {usersWithoutCurrent?.map((data, i) => {
        return (
          <div key={data.id} className={styles.info} >
            <div className={styles.image}>
             <img src={`http://localhost:4000/${data?.image}`} alt="phot" />
            </div>
            <div className={styles.info_user}>
              <div className={styles.name}>Имя:{data?.name}</div>
              <div className={styles.age}>Возраст:{getAge(data?.birthday)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
