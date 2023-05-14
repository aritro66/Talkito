import React from "react";
import landingStyles from "./style.module.css";
import chaticonsrc from "./../../assets/icon.jpg";
import chatsrc from "./../../assets/chat.jpg";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../api/firebase";
import { createUser } from "../../api/api";

export default function Landing() {
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await createUser({
          email: result.user.email,
          name: result.user.displayName,
          imgURL: result.user.photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id={landingStyles.landing}>
      <header id={landingStyles.header}>
        <img src={chaticonsrc} alt="" />
        <span>Talkito</span>
      </header>
      <div id={landingStyles.cont}>
        <div id={landingStyles.description}>
          <div>
            <h1>
              Talking With <span> Everyone</span>
              <br />
              and Keep <span> Secure</span>
            </h1>

            <div id={landingStyles.wrapper}>
              <p id={landingStyles["static-text"]}>
                Talk with everyone and keep your conversations secure with our
                trusted chat application. Connect with confidence, anytime and
                anywhere.{" "}
              </p>
            </div>
            <br />

            <button onClick={handleAuth} id={landingStyles.service}>
              Register/Login
            </button>
          </div>
        </div>
        <div id={landingStyles.imgholder}>
          <img src={chatsrc} alt="" />
        </div>
      </div>
    </div>
  );
}
