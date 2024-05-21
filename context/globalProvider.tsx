import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

const GlobalContext = createContext({
  user: null,
  setUser: (doc: any) => { },
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
      Alert.alert("Error", error.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
