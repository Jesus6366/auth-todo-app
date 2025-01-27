import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies);

  const viewLogin = (statusState) => {
    setError(null);
    setIsLogin(statusState);
  };

  const handleSubmit = async (e, enpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Asegurate que las contraseñas sean iguales");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_SERVERURL}/api/user/${enpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Por favor inicia sesion" : "Registrarse"}</h2>
          <input
            type="email"
            placeholder="correo"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirma contraseña"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "register")}
            className="crear"
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
            onClick={() => viewLogin(false)}
          >
            Registrar
          </button>
          <button
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
            onClick={() => viewLogin(true)}
          >
            Iniciar Sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
