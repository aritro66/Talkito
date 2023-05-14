import React from "react";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chatting";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase";
import Loader from "./components/Loader";
import { UserContext } from "./contexts/usercontext";
function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <UserContext.Provider
        value={{
          name: user?.displayName || "",
          email: user?.email || "",
          imgURL: user?.photoURL || "",
        }}
      >
        <BrowserRouter>
          <Loader isloading={loading}>
            <Routes>
              <Route
                path="/"
                element={user === null ? <Landing /> : <Navigate to="/chat" />}
              />
              <Route
                path="/chat"
                element={user !== null ? <Chat /> : <Navigate to="/" />}
              />
            </Routes>
          </Loader>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
