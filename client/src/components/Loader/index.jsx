import React from "react";
import chaticonsrc from "../../assets/icon.jpg";
import LandingStyles from "./style.module.css";
export default function Loader({ children, isloading }) {
  if (!isloading) {
    return <>{children}</>;
  } else {
    return (
      <>
        <div id={LandingStyles["loader"]}>
          <div id={LandingStyles["content"]}>
            <div>
              {" "}
              <img src={chaticonsrc} height="35px" width="35px" alt="" />{" "}
              <span>Talkito</span>
            </div>
            <div className={LandingStyles["lds-ellipsis"]}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
