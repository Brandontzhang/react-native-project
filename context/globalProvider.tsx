import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext({
  user: {
    $id: "",
    username: "",
    avatar: "",
  },
  setUser: (doc: any) => { },
  setCurrentUser: () => { },
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => { },
  isLoading: true,
  setIsLoading: (isLoading: boolean) => { },
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentUser();
  }, []);

  const setCurrentUser = () => {
    getCurrentUser().then((res) => {
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    }).catch((error) => {
      setIsLoggedIn(false);
      setUser(null);
      console.log(error.message);
    }).finally(() => {
      setIsLoading(false);
    })

  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
