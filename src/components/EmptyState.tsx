import { Typography, Paper } from "@mui/material";
import { PeopleOutlined } from "@mui/icons-material";

export const EmptyState = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        border: "2px dashed #dee2e6",
        borderRadius: 2,
      }}
    >
      <PeopleOutlined sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        No users found
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Try adjusting your search or filter criteria
      </Typography>
    </Paper>
  );
};
