import React, { useState } from "react";
import "./App.css";
import {
  Numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const MakePassword = (e) => {
    let characters = "";
    const countConditions = [uppercase, lowercase, numbers, symbols].filter(
      (item) => item !== false
    );
    if (countConditions.length === 0) {
      return notify("select at least one conditions", true);
    }
    if (passwordLength < 8) {
      return notify("password length can't be less than 8", true);
    }
    if (passwordLength > 20) {
      return notify("password length can't be more than 20", true);
    }
    if (uppercase) {
      characters += upperCaseLetters;
    }
    if (lowercase) {
      characters += lowerCaseLetters;
    }
    if (numbers) {
      characters += Numbers;
    }
    if (symbols) {
      characters += specialCharacters;
    }

    setPassword(MakeMyPassword(characters));
  };
  const decrease = () => {
    setPasswordLength(passwordLength - 1);
    if (passwordLength === 8) {
      setPasswordLength(passwordLength);
    }
  };
  const increase = () => {
    setPasswordLength(passwordLength + 1);
    if (passwordLength === 20) {
      setPasswordLength(passwordLength);
    }
  };
  const copyFunction = (e) => {
    const textarea = document.createElement("textarea");
    textarea.innerText = password;
    if (!textarea.innerText) {
      notify("nothing to copy", true);
    } else {
      notify("password copied successfully");
    }
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const notify = (message, error = false) => {
    if (error) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const MakeMyPassword = (characters) => {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.round(Math.random() * characters.length);
      password += characters.charAt(charactersIndex);
    }
    return password;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">Password Bakery</h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button onClick={copyFunction} className="copy__btn">
              <i className="far fa-copy"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Length</label>
            {/* <input value={passwordLength} onChange={(e)=>setPasswordLength(e.target.value)} type="number" id="password-strength" name="password-strength" max="20" min="4"/> */}
            <div class="number-input">
              <button onClick={decrease}></button>
              <input
                class="quantity"
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                type="number"
                type="number"
                id="password-strength"
                name="password-strength"
                max="20"
                min="8"
              />
              <button onClick={increase} class="plus"></button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Uppercase</label>
            <label class="switch">
              <input
                type="checkbox"
                value={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                type="checkbox"
                id="uppercase-letters"
                name="uppercase-letters"
              />
              <span class="slider round"></span>
            </label>
            </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Lowercase</label>
            <label class="switch">
              <input
                type="checkbox"
                value={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                type="checkbox"
                id="lowercase-letters"
                name="lowercase-letters"
                />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Numbers</label>
            <label class="switch">
              <input
                type="checkbox"
                value={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                type="checkbox"
                id="include-numbers"
                name="include-numbers"
                  />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Symbols</label>
            <label class="switch">
              <input
              value={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
              <span class="slider round"></span>
            </label>
          </div>
          <button onClick={MakePassword} className="generator__btn">
            Bake A Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
