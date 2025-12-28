import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { NotificationPreferences, InsertNotificationPreferences } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/auth-utils";

async function fetchNotificationPreferences(): Promise<NotificationPreferences | null> {
  const response = await fetch("/api/notifications/preferences", {
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

async function saveNotificationPreferences(
  prefs: Partial<InsertNotificationPreferences>
): Promise<NotificationPreferences> {
  const response = await fetch("/api/notifications/preferences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(prefs),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || response.statusText}`);
  }

  return response.json();
}

export function useNotificationPreferences() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: preferences, isLoading } = useQuery<NotificationPreferences | null>({
    queryKey: ["/api/notifications/preferences"],
    queryFn: fetchNotificationPreferences,
    retry: false,
  });

  const saveMutation = useMutation({
    mutationFn: saveNotificationPreferences,
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/notifications/preferences"], data);
      toast({
        title: "Preferences updated",
        description: "Your notification settings have been saved.",
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
        description: error.message || "Failed to save preferences",
        variant: "destructive",
      });
    },
  });

  return {
    preferences,
    isLoading,
    savePreferences: saveMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}
