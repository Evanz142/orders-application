import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabase = createClient('https://hfhrezvxbnkvvkujmswp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHJlenZ4Ym5rdnZrdWptc3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODUxMjIsImV4cCI6MjAzMjY2MTEyMn0.HSp2UZVT6W1AxkoDUgz1cFoeXvSb7Oky2HwCUtcuOAc');

// Create a context to hold the session and authentication methods
interface SessionContextType {
  session: Session | null;
  loading: boolean;
  logout: () => void;
  getToken: () => string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Create a provider component
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    })

    return () => subscription.unsubscribe()
  }, [])

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    setSession(null);
  };

  const getToken = (): string | null => {
    return session?.access_token || null;
  };

  return (
    <SessionContext.Provider value={{ session, loading, logout, getToken }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionContext;
