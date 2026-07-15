import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  Business,
  LocationOn,
  Visibility,
} from "@mui/icons-material";
import type { User } from "../types";

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export const UserCard = ({ user, onViewDetails }: UserCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "primary.main",
                fontSize: 20,
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                @{user.username}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onViewDetails(user)}
            aria-label="View details"
          >
            <Visibility />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">{user.phone}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Business fontSize="small" color="action" />
            <Typography variant="body2">{user.company.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{user.address.city}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={user.address.city}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Chip label={user.company.name} size="small" variant="outlined" />
        </Box>
      </CardContent>
    </Card>
  );
};
