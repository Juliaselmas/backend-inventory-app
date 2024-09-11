//"use client";  // Denna komponent körs på klienten

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Nollställ eventuella tidigare fel
  
    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
  
    const body = isLogin
      ? { email, password } // endast email och lösenord för inloggning
      : { email, password, name }; // lägg till namn för registrering
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Token received:", data.token);
  
        localStorage.setItem("@library/token", data.token);
        auth.setToken(data.token);
        router.push("/items"); // Omdirigera till items-sidan
      } else {
        const errorMessage = await response.json(); // Läs felmeddelandet från servern
        console.error("Error during login1:", errorMessage); // Uppdatera fel-loggen här
        setError(errorMessage.error || "Invalid login credentials"); // Sätt felmeddelandet
      }
    } catch (err) {
      console.error("Error during login2:", err); // Korrekt användning av err här
      setError("Something went wrong, please try again.");
    }
  }
    

  return (
    <div>
      
      <form className="form bg-white" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">
            {error}
        </p>}
        <button className="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="form__text">...or</p>
        <div className="form__group">
          <button
            className="form__button form__button--secondary"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;


/*
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {

    const router = useRouter()
    const auth = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("")

    const url = isLogin ? "/api/auth/login" : "/api/auth/register"
    console.log("Email:", email, "Password:", password);
    const response = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            name
        })
    })

    if(response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Token received:", data.token); 


        localStorage.setItem("@library/token", data.token)
        auth.setToken(data.token)
        router.push("/items")
        return
    }
    //setError("Invalid login credentials")
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error response:", errorData);
      setError(errorData.message || "Invalid login credentials");
      return;
    }
  }

  return (
    <div>
      
      <form className="form bg-white" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">
            {error}
        </p>}
        <button className="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="form__text">...or</p>
        <div className="form__group">
          <button
            className="form__button form__button--secondary"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
*/