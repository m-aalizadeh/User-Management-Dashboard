import { Typography, Button, Paper } from "@mui/material";
import { ErrorOutlined } from "@mui/icons-material";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "#fff5f5",
        border: "1px solid #fcc",
        borderRadius: 2,
      }}
    >
      <ErrorOutlined sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        Try Again
      </Button>
    </Paper>
  );
};
