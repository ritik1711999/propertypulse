"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unreadCount, setUndreadCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUndreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUndreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
