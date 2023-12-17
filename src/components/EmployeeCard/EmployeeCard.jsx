import styles from "./EmployeeCard.module.scss";

const EmployeeCard = ({ email, photo, name, position, phone }) => {
  return (
    <div className={styles.card}>
      <picture className={styles.profilePhoto}>
        <img src={photo} alt="profile photo" />
      </picture>
      <p>{name}</p>
      <div>
        <p>{position}</p>
        <p>{email}</p>
        <p>{`${phone.slice(0,3)} (${phone.slice(3,6)}) ${phone.slice(6,9)} ${phone.slice(9,11)} ${phone.slice(11)}`}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
