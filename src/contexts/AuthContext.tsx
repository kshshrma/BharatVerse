import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  assignedState: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  assignedState: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [assignedState, setAssignedState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (user: User) => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("assigned_state")
      .eq("user_id", user.id)
      .maybeSingle();

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    const actualRole = user.user_metadata?.role || user.user_metadata?.selected_role || roleData?.role;
    const actualState = user.user_metadata?.assigned_state || profileData?.assigned_state;

    setIsAdmin(actualRole === "admin");
    setAssignedState(actualState);
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setIsAdmin(false);
        setAssignedState(null);
      }
      if (mounted) setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        setLoading(true);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setIsAdmin(false);
          setAssignedState(null);
        }
        if (mounted) setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, assignedState, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
