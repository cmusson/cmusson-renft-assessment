"use client";

import { useAppContext } from "@/app/context/appContext";
import { IUser } from "@/app/typings/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IUserForm {
  type: "signIn" | "signUp";
}

const UserForm = ({ type }: IUserForm) => {
  // use type to dictate if using signUp or signIn function
  /* 
    * username must only contain alphanumeric characters and underscores.
    * password must not contain the same character more than twice and any 
    character must have two different characters before being allowed to 
    occur again. Valid inputs would be: f0o, b4rc0de, bazqaz. Invalid 
    inputs would be: foo, b4r4ck, bazqaiqa.
    * Validation is triggered on input and on submit.
    * Valid form submissions are saved into LocalStorage
  .*/

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { login } = useAppContext();
  const { push } = useRouter();

  const updateButtonState = () => {
    // Regular expression to validate alphanumeric username with underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    // Regular expression to validate password
    const passwordRegex = /^(?!.*?(.)\1{2,})[a-zA-Z0-9]+$/;

    // Check if username and password are not empty strings
    const isUsernameNotEmpty = username.trim() !== "";
    const isPasswordNotEmpty = password.trim() !== "";

    const isUsernameValid = isUsernameNotEmpty && username.match(usernameRegex);
    const isPasswordValid = isPasswordNotEmpty && password.match(passwordRegex);

    // Enable the button only if both username and password are valid
    setButtonDisabled(!isUsernameValid || !isPasswordValid);
  };

  const userSignIn = () => {
    const userAccountsJSON = localStorage.getItem("userAccounts");
    if (userAccountsJSON === null) {
      return [];
    }
    const userAccounts = JSON.parse(userAccountsJSON);

    const user = userAccounts.find((user: any) => user.username === username);

    if (user && user.password === password) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      login();
      push("/feed");
      alert("logged in!");
    } else {
      alert("failed login!");
    }
  };

  const userSignUp = () => {
    // Read the current userAccounts from local storage
    const userAccountsJSON = localStorage.getItem("userAccounts");
    if (userAccountsJSON === null) {
      return [];
    }
    const userAccounts = JSON.parse(userAccountsJSON);

    // Check if the username is already taken
    const usernameExists = userAccounts.some(
      (user: IUser) => user.username === username
    );

    if (usernameExists) {
      alert("Username is already taken. Please choose a different one.");
    } else {
      // Create a new user object with the provided username and password
      const newUser = {
        username: username,
        password: password,
        friends: [],
        posts: [],
      };

      // Add the new user to the userAccounts array
      userAccounts.push(newUser);

      // Update the userAccounts array in local storage
      localStorage.setItem("userAccounts", JSON.stringify(userAccounts));

      // Sign in the new user
      sessionStorage.setItem("currentUser", JSON.stringify(newUser));
      login();
      push("/feed");
      alert("Successfully signed up and logged in!");
    }
  };

  const handleClick = type === "signIn" ? userSignIn : userSignUp;

  useEffect(() => {
    updateButtonState();
  }, [username, password]);

  return (
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <input
          className="text-black p-1"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="text-black p-1"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className={`border p-2 border rounded ${
            buttonDisabled
              ? "cursor-not-allowed"
              : "hover:bg-white hover:text-black"
          }`}
          type="submit"
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UserForm;
