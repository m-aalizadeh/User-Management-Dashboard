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
import { UserTable } from "../components/UserTable";
import { UserModal } from "../components/UserModal";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const initialSearch = searchParams.get("search") || "";
  const initialSort = (searchParams.get("sort") as "asc" | "desc") || "asc";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSort,
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getItemsPerPage = () => {
    if (isMobile) return 5;
    if (isTablet) return 8;
    return 10;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isTablet]);

  const { users, allUsers, loading, error, total, totalPages } = useUsers({
    searchQuery,
    sortDirection,
    page: currentPage,
    itemsPerPage,
  });

  useEffect(() => {
    setSearchQuery(initialSearch);
    setSortDirection(initialSort);
    setCurrentPage(initialPage);
  }, [initialSearch, initialSort, initialPage]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      const params = new URLSearchParams(searchParams);
      params.delete("page");
      if (searchQuery) params.set("search", searchQuery);
      if (sortDirection) params.set("sort", sortDirection);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [searchQuery, sortDirection]);

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

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={handleRetry} />;
    }

    if (allUsers.length === 0) {
      return <EmptyState />;
    }

    return (
      <>
        <UserTable users={users} onViewDetails={handleViewDetails} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          User Management Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View and manage all users efficiently
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          mb: { xs: 2, sm: 3, md: 4 },
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
          <Box sx={{ flexShrink: 0 }}>
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
