import { User } from "firebase";
import { auth } from "index";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    let isCurrent = true;

    auth.onAuthStateChanged(u => {
      if (isCurrent) setUser(u ?? undefined);
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
