import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import type { SortDirection } from "../types";
import { useSearchParams } from "react-router-dom";

interface SortControlsProps {
  sortDirection: SortDirection;
  onSortChange: (direction: SortDirection) => void;
}

export const SortControls = ({
  sortDirection,
  onSortChange,
}: SortControlsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newDirection: SortDirection | null,
  ) => {
    if (newDirection !== null) {
      onSortChange(newDirection);

      searchParams.set("sort", newDirection);
      setSearchParams(searchParams);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Sort by Name:
      </Typography>
      <ToggleButtonGroup
        value={sortDirection}
        exclusive
        onChange={handleSortChange}
        aria-label="sort direction"
        size="small"
      >
        <ToggleButton value="asc" aria-label="ascending">
          <ArrowUpward fontSize="small" />
        </ToggleButton>
        <ToggleButton value="desc" aria-label="descending">
          <ArrowDownward fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
