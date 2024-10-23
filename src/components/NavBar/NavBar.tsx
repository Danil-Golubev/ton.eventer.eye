import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <>
      <div className={style.bottomNav}>
        <Link to="/">
          <div className={style.navButton}>
            <FontAwesomeIcon icon={faHome} /> {/* Иконка домика */}
          </div>
        </Link>
        <div className={style.divider}></div> {/* Разделитель */}
        <Link to="/config">
          <div className={style.navButton}>
            <FontAwesomeIcon icon={faQrcode} /> {/* Иконка QR-кода */}
          </div>
        </Link>
      </div>
    </>
  );
};
