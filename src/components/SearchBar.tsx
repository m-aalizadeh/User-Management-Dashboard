import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  initialValue: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({ initialValue, onSearch }: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);

      if (value) {
        searchParams.set("search", value);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch, searchParams, setSearchParams]);

  const handleClear = () => {
    setValue("");
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};
