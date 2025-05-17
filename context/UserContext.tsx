import React, { createContext, useState, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface UserInfo {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
}

interface UserContextType {
  userInfos: UserInfo;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserProvider = createContext<UserContextType | undefined>(undefined);

interface UserContextProps {
  children: ReactNode;
}

export default function UserContext({ children }: UserContextProps) {
  const [userInfos, setUserInfos] = useState<UserInfo>({
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  return (
    <UserProvider.Provider value={{ userInfos, setUserInfos }}>
      {children}
    </UserProvider.Provider>
  );
}
