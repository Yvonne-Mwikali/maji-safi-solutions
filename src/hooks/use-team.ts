import { mockTeam } from "@/data/mockData";

export function useTeam() {
  return {
    data: mockTeam,
    isLoading: false,
  };
}
