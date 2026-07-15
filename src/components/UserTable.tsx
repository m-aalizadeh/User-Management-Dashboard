import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Visibility,
  Email,
  Phone,
  Business,
  LocationOn,
} from "@mui/icons-material";
import type { User } from "../types";

interface UserTableProps {
  users: User[];
  onViewDetails: (user: User) => void;
}

export const UserTable = ({ users, onViewDetails }: UserTableProps) => {
  const theme = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getColor = (id: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.secondary.main,
    ];
    return colors[id % colors.length];
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              "& .MuiTableCell-head": {
                fontWeight: 600,
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${alpha(theme.palette.divider, 0.8)}`,
                py: 2,
                fontSize: "0.85rem",
              },
            }}
          >
            <TableCell sx={{ width: "5%" }}>ID</TableCell>
            <TableCell sx={{ width: "22%" }}>User</TableCell>
            <TableCell sx={{ width: "22%" }}>Email</TableCell>
            <TableCell sx={{ width: "18%" }}>Phone</TableCell>
            <TableCell sx={{ width: "18%" }}>Company</TableCell>
            <TableCell sx={{ width: "10%" }}>Location</TableCell>
            <TableCell align="center" sx={{ width: "5%" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => onViewDetails(user)}
              sx={{
                transition: "all 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                },
                "& .MuiTableCell-root": {
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  py: 1.5,
                },
              }}
            >
              <TableCell>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  #{user.id}
                </Typography>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: getColor(user.id),
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      @{user.username}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: "action.active" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: "action.active" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {user.phone}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Business sx={{ fontSize: 16, color: "action.active" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {user.company.name}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: "action.active" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  >
                    {user.address.city}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell align="center">
                <Tooltip title="View Details">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(user);
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
