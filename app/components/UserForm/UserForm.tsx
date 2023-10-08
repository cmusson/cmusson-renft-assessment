"use client";

import { useAppContext } from "@/app/context/appContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const { login } = useAppContext();
  const { push } = useRouter();

  const userSignUp = () => {
    // add user to list of users in local storage and also in local state
    // login on signup
    return;
  };

  const userSignIn = () => {
    const userAccountsJSON = localStorage.getItem("userAccounts");
    if (userAccountsJSON === null) {
      return [];
    }
    const userAccounts = JSON.parse(userAccountsJSON) || [];

    const user = userAccounts.find((user: any) => user.username === username);

    if (user && user.password === password) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      login();
      push("/friends");
      alert("logged in!");
    } else {
      alert("failed login!");
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          userSignIn();
        }}
      >
        <input
          className="text-black"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="text-black"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserForm;
