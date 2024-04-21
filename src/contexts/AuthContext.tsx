import { FC, useState, createContext } from 'react';
type User = {
  email: string | null;
  token: string | null;
};

type AuthUser = {
  user: User | null,
  setUser: (priority) => void;
}


//// eslint-disable-next-line @typescript-eslint/no-redeclare

export const AuthContext = createContext<AuthUser>(
  { user: null, setUser: () => { } }
);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );

};
