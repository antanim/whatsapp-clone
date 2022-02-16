import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route
            path="/"
            element={<Home currentUser={user} logout={logout} />}
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
