import { Grid, Box, Typography } from "@mui/material";
import type { User } from "../types";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
  onViewDetails: (user: User) => void;
}

export const UserList = ({ users, onViewDetails }: UserListProps) => {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Showing {users.length} user{users.length !== 1 ? "s" : ""}
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid key={user.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <UserCard user={user} onViewDetails={onViewDetails} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
