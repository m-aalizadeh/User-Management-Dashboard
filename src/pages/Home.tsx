import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import type { User } from "../types";
import { useUsers } from "../hooks/useUsers";
import { SearchBar } from "../components/SearchBar";
import { SortControls } from "../components/SortControls";
import { UserList } from "../components/UserList";
import { UserModal } from "../components/UserModal";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";

export const Home = () => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialSearch = searchParams.get("search") || "";
  const initialSort = (searchParams.get("sort") as "asc" | "desc") || "asc";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSort,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { users, loading, error } = useUsers({
    searchQuery,
    sortDirection,
  });

  useEffect(() => {
    setSearchQuery(initialSearch);
    setSortDirection(initialSort);
  }, [initialSearch, initialSort]);

  const handleViewDetails = useCallback((user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedUser(null);
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={handleRetry} />;
    if (users.length === 0) return <EmptyState />;
    return <UserList users={users} onViewDetails={handleViewDetails} />;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          User Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View and manage all users efficiently
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            alignItems: isMobile ? "stretch" : "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchBar initialValue={searchQuery} onSearch={setSearchQuery} />
          </Box>
          <Box>
            <SortControls
              sortDirection={sortDirection}
              onSortChange={setSortDirection}
            />
          </Box>
        </Box>
      </Paper>
      {renderContent()}
      <UserModal
        user={selectedUser}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
};
