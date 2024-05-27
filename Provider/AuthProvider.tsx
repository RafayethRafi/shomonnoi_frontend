"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/User";
import { AuthContextData } from "@/types/AuthContext";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, userData: User) => {
    const currentDate = new Date();
    const sevenDaysInSeconds = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    Cookies.set("user", JSON.stringify(userData), {
      expires: sevenDaysInSeconds,
    });
    Cookies.set("token", token, { expires: sevenDaysInSeconds });
    Cookies.set("authenticated", "true", {
      expires: sevenDaysInSeconds,
    });
    setAuthenticated(true);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("authenticated");
    setAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const updateUserInfo = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    if (
      Cookies.get("authenticated") &&
      Cookies.get("token") &&
      Cookies.get("user")
    ) {
      setAuthenticated(true);
      setToken(Cookies.get("token") ?? null);
      setUser(
        Cookies.get("user")
          ? JSON.parse(Cookies.get("user") as string)
          : { name: "", email: "" }
      );
    }

    if (
      Cookies.get("user") === "undefined" ||
      Cookies.get("user") === "Could not validate the credentials"
    ) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("authenticated");
      setAuthenticated(false);
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        login,
        logout,
        updateUserInfo,
        authenticated,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
