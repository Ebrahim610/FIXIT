import { createContext, ReactNode, useContext, useState } from 'react';

export type Role = 'customer' | 'technician';

type SessionValue = {
  name: string;
  role: Role;
  available: boolean; // technician availability switch
  signIn: (name: string, role: Role) => void;
  signOut: () => void;
  setAvailable: (value: boolean) => void;
};

const SessionContext = createContext<SessionValue | null>(null);

// There is no backend yet, so "signing in" just remembers a name and a role.
export function SessionProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Abdelrahman');
  const [role, setRole] = useState<Role>('customer');
  const [available, setAvailable] = useState(true);

  const signIn = (newName: string, newRole: Role) => {
    setName(newName);
    setRole(newRole);
  };

  const signOut = () => {
    setName('Abdelrahman');
    setRole('customer');
  };

  return (
    <SessionContext.Provider value={{ name, role, available, signIn, signOut, setAvailable }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
