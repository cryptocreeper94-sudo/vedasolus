import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserProfile, InsertUserProfile } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/auth-utils";

async function fetchProfile(): Promise<UserProfile | null> {
  const response = await fetch("/api/profile", {
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

async function saveProfile(profile: Partial<InsertUserProfile>): Promise<UserProfile> {
  const response = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || response.statusText}`);
  }

  return response.json();
}

export function useProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery<UserProfile | null>({
    queryKey: ["/api/profile"],
    queryFn: fetchProfile,
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: saveProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/profile"], data);
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    saveProfile: saveMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}
