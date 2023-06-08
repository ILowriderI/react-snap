import { useLocation } from "react-router-dom";
import img from "../../img/404.svg"
import styles from "./NotFound.module.scss";


const NotFound = ()=>{
    let location = useLocation();
    return(
        <>
         <div className={styles.cont}>
        <img className={styles.img} src={img} alt="Not found" />
        <p className={styles.text} > No match for <u>{location.pathname}</u></p>
        </div>
        </>
    )
}

export default NotFound;