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

      const params = new URLSearchParams(searchParams);
      params.set("sort", newDirection);
      setSearchParams(params);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ whiteSpace: "nowrap" }}
      >
        Sort:
      </Typography>
      <ToggleButtonGroup
        value={sortDirection}
        exclusive
        onChange={handleSortChange}
        aria-label="sort direction"
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            px: 1,
            py: 0.5,
            border: "1px solid",
            borderColor: "divider",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
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
