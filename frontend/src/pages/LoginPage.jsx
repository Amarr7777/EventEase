import React, { useState } from "react";
import Login from "../components/authPage/Login";
import Register from "../components/authPage/Register";

function LoginPage() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}

export default LoginPage;
