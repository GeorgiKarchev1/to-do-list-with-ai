import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Създаваме начален контекст с default стойности
const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("AuthProvider mounted")
    
    // Get initial session
    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log("Initial session:", session)
        setUser(session?.user ?? null)
        
        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("Auth state changed:", event, session?.user)
          setUser(session?.user ?? null)
        })

        setLoading(false)
        return () => subscription.unsubscribe()
      } catch (error) {
        console.error("Auth setup error:", error)
        setLoading(false)
      }
    }

    setupAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log("Attempting sign in:", email)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    console.log("Sign in successful:", data.user)
    setUser(data.user)
  }

  const signUp = async (email: string, password: string) => {
    console.log("Attempting sign up:", email)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    console.log("Sign up successful:", data.user)
    setUser(data.user)
  }

  const signOut = async () => {
    console.log("Attempting sign out")
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    console.log("Sign out successful")
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut
  }

  console.log("AuthProvider rendering with user:", user)

  if (loading) {
    return null // или някакъв loading компонент
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    console.error("Auth context is undefined")
    throw new Error('useAuth must be used within an AuthProvider')
  }
  console.log("useAuth hook called, returning user:", context.user)
  return context
} 