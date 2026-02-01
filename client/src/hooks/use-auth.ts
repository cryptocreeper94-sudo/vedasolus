import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface User {
  id: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}

async function fetchUser(): Promise<User | null> {
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
  
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const login = async (email: string, password: string) => {
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 403 && data.requiresVerification) {
          throw { requiresVerification: true, email: data.email, message: data.message };
        }
        throw new Error(data.message || "Login failed");
      }

      queryClient.setQueryData(["/api/auth/user"], data.user);
      return data.user;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName?: string) => {
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return { email: data.email, message: data.message };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Verification failed");
    }

    queryClient.setQueryData(["/api/auth/user"], data.user);
    return data.user;
  };

  const resendVerification = async (email: string) => {
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to resend verification");
    }

    return data;
  };

  const logout = async () => {
    try {
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
    login,
    signup,
    verifyEmail,
    resendVerification,
    isLoggingIn,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
