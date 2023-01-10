import React, { FC, createContext, useContext, useState } from 'react';

interface IProfileContext {
  name?: string,
  showAlert: boolean,
  signOut: () => void,
  alertType: string | undefined,
  alertMessage: string | undefined,
  signIn: (uName: string, uPassword: string) => string | void,
  setAlertState: (message?: string, type?: alertType) => void,
}

type Props = {
  children?: React.ReactNode
}

const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileProvider: FC<Props> = ({ children }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const signIn = (uName: string, uPassword: string) => {
    if(uName.toLowerCase() !== 'admin' || uPassword.toLowerCase() !== 'admin') {
      return 'Invalid credential!';
    }
    setName(uName);
  };

  const signOut = () => {
    setName(undefined);
  }

  const setAlertState = (message?: string, type?: alertType) => {
    if((!alertMessage && !alertType) || (!message && !type)) {
      setShowAlert(prevState => !prevState);
    }
    setAlertType(type);
    setAlertMessage(message);
  }

  const value = {
    name,
    signIn,
    signOut,
    showAlert,
    alertType,
    alertMessage,
    setAlertState,
  }

  return (
    <ProfileContext.Provider value={value}>
      { children }
    </ProfileContext.Provider>
  );
};

export enum alertType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
};

export default ProfileProvider;

export const useProfileContext = () => useContext(ProfileContext) as IProfileContext;