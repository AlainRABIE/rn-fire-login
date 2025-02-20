import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { auth1 } from '@/config/config';
interface AuthContextType {
    user: User | null;
    loading: boolean;
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});
 
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth1, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
 
export function useAuth() {
    return useContext(AuthContext);
}