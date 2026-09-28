import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // Basic login action—useEffect and localStorage will be introduced here
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  );
}

export default App;