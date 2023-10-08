"use client";
import { createContext, useContext, useEffect, useState } from "react";
import userAccounts from "../data/usersData.json";
import { User } from "../typings/interfaces";

const AppContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  users: [] as User[],
  user: {} as User | undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initial population of local storage
  // Session storage authentication and the user authenticated

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const getDataFromLocalStorage = () => {
    const userAccountsJSON = localStorage.getItem("userAccounts");
    if (userAccountsJSON === null) {
      return [];
    }
    const parsedUserAccounts = JSON.parse(userAccountsJSON);
    return Array.isArray(parsedUserAccounts) ? parsedUserAccounts : [];
  };

  useEffect(() => {
    const initalAccounts = JSON.stringify(userAccounts);
    localStorage.setItem("userAccounts", initalAccounts);
    const initialUsers = getDataFromLocalStorage();
    setUsers(initialUsers);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const currentUserJSON = sessionStorage.getItem("currentUser");
      // Check if currentUser exists in sessionStorage
      if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);
        setUser(currentUser);
      }
    }
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{ isAuthenticated, login, logout, users, user }}
    >
      {children}
    </AppContext.Provider>
  );
};
