import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SleepLog, DietLog, ExerciseLog, InsertSleepLog, InsertDietLog, InsertExerciseLog } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/auth-utils";

// Sleep tracking
async function fetchSleepLogs(limit: number = 30): Promise<SleepLog[]> {
  const response = await fetch(`/api/sleep?limit=${limit}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function createSleepLog(log: InsertSleepLog): Promise<SleepLog> {
  const response = await fetch("/api/sleep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(log),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || response.statusText}`);
  }

  return response.json();
}

export function useSleepTracking(limit: number = 30) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: sleepLogs, isLoading } = useQuery<SleepLog[]>({
    queryKey: ["/api/sleep", limit],
    queryFn: () => fetchSleepLogs(limit),
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createSleepLog,
    onSuccess: (newLog) => {
      queryClient.setQueryData(["/api/sleep", limit], (old: SleepLog[] = []) => [newLog, ...old]);
      toast({
        title: "Sleep logged",
        description: "Your sleep data has been recorded.",
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
        description: error.message || "Failed to log sleep",
        variant: "destructive",
      });
    },
  });

  return {
    sleepLogs: sleepLogs || [],
    isLoading,
    createSleepLog: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}

// Diet tracking
async function fetchDietLogs(limit: number = 30): Promise<DietLog[]> {
  const response = await fetch(`/api/diet?limit=${limit}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function createDietLog(log: InsertDietLog): Promise<DietLog> {
  const response = await fetch("/api/diet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(log),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || response.statusText}`);
  }

  return response.json();
}

export function useDietTracking(limit: number = 30) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: dietLogs, isLoading } = useQuery<DietLog[]>({
    queryKey: ["/api/diet", limit],
    queryFn: () => fetchDietLogs(limit),
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createDietLog,
    onSuccess: (newLog) => {
      queryClient.setQueryData(["/api/diet", limit], (old: DietLog[] = []) => [newLog, ...old]);
      toast({
        title: "Meal logged",
        description: "Your nutrition data has been recorded.",
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
        description: error.message || "Failed to log meal",
        variant: "destructive",
      });
    },
  });

  return {
    dietLogs: dietLogs || [],
    isLoading,
    createDietLog: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}

// Exercise tracking
async function fetchExerciseLogs(limit: number = 30): Promise<ExerciseLog[]> {
  const response = await fetch(`/api/exercise?limit=${limit}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function createExerciseLog(log: InsertExerciseLog): Promise<ExerciseLog> {
  const response = await fetch("/api/exercise", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(log),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || response.statusText}`);
  }

  return response.json();
}

export function useExerciseTracking(limit: number = 30) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: exerciseLogs, isLoading } = useQuery<ExerciseLog[]>({
    queryKey: ["/api/exercise", limit],
    queryFn: () => fetchExerciseLogs(limit),
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createExerciseLog,
    onSuccess: (newLog) => {
      queryClient.setQueryData(["/api/exercise", limit], (old: ExerciseLog[] = []) => [newLog, ...old]);
      toast({
        title: "Activity logged",
        description: "Your exercise data has been recorded.",
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
        description: error.message || "Failed to log exercise",
        variant: "destructive",
      });
    },
  });

  return {
    exerciseLogs: exerciseLogs || [],
    isLoading,
    createExerciseLog: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
