import { createContext, useContext, useState, ReactNode } from "react";

interface Authuser {
  token: string,
  user : {
       email: string,
       id: string,
       name:string,
      password:string,
  }
}
// Define a type for the authUser and setauthUser
type AuthContextType = {
  authUser: Authuser | null;
  setauthUser: React.Dispatch<React.SetStateAction<Authuser | null>>;
};


// Create context with default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }

  return context;
};

// AuthContextProvider component to manage the context state
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setauthUser] = useState<Authuser | null>(
    JSON.parse(localStorage.getItem("token") || "null")
  );

  return (
    <AuthContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
