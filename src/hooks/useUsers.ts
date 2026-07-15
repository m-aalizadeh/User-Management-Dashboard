import { useState, useEffect, useMemo } from "react";
import type { User, SortDirection } from "../types";
import { fetchUsers } from "../services/api";

interface UseUsersProps {
  searchQuery: string;
  sortDirection: SortDirection;
  page: number;
  itemsPerPage: number;
}

export const useUsers = ({
  searchQuery,
  sortDirection,
  page,
  itemsPerPage,
}: UseUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [users, searchQuery, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result = processedUsers.slice(startIndex, endIndex);
    return result;
  }, [processedUsers, page, itemsPerPage]);

  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  return {
    users: paginatedUsers,
    allUsers: processedUsers,
    loading,
    error,
    total: processedUsers.length,
    totalPages: totalPages,
  };
};
