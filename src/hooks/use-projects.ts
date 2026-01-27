import { useMemo } from "react";
import { mockProjects } from "@/data/mockData";

export function useProjects() {
  return {
    data: mockProjects,
    isLoading: false,
  };
}

export function useProject(id: number) {
  const project = useMemo(
    () => mockProjects.find((p) => p.id === id) ?? null,
    [id],
  );

  return {
    data: project,
    isLoading: false,
  };
}
