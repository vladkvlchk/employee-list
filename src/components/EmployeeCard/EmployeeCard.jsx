import styles from "./EmployeeCard.module.scss";
import avatar from "../../assents/avatar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
    background: "rgba(0, 0, 0, 0.87)",
    padding: "3px 16px",
  },
});

const EmployeeCard = ({ email, photo, name, position, phone }) => {
  return (
    <div className={styles.card}>
      <picture className={styles.profilePhoto}>
        {photo ? <img src={photo} alt="profile photo" /> : avatar}
      </picture>
      <p>{name}</p>
      <div className={styles.aboutMember}>
        <p>{position}</p>
        <NoMaxWidthTooltip title={email}>
          <p>{email}</p>
        </NoMaxWidthTooltip>
        <p>{`${phone.slice(0, 3)} (${phone.slice(3, 6)}) ${phone.slice(
          6,
          9
        )} ${phone.slice(9, 11)} ${phone.slice(11)}`}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
