import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFirebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import React from "react";

interface FirebaseUser {
  id: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}

async function fetchUser(): Promise<FirebaseUser | null> {
  const response = await fetch("/api/auth/user", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  
  const { data: user, isLoading } = useQuery<FirebaseUser | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginWithGoogle = async () => {
    setIsLoggingIn(true);
    try {
      const auth = await getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      queryClient.setQueryData(["/api/auth/user"], data.user);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      const auth = await getFirebaseAuth();
      await firebaseSignOut(auth);
      
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      queryClient.setQueryData(["/api/auth/user"], null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    isLoggingIn,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
