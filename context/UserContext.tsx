import React, { createContext, ReactNode, useState } from 'react';

export interface UserInfo {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  listed_cars: number[];
}

interface UserContextType {
  userInfos: UserInfo;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserProvider = createContext<UserContextType | undefined>(
  undefined,
);

interface UserContextProps {
  children: ReactNode;
}

export default function UserContext({ children }: UserContextProps) {
  const [userInfos, setUserInfos] = useState<UserInfo>({
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
    listed_cars: [],
  });

  return (
    <UserProvider.Provider value={{ userInfos, setUserInfos }}>
      {children}
    </UserProvider.Provider>
  );
}
