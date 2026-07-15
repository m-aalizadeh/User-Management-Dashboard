import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Close,
  Email,
  Phone,
  Business,
  LocationOn,
  Language,
  Person,
} from "@mui/icons-material";
import type { User } from "../types";

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export const UserModal = ({ user, open, onClose }: UserModalProps) => {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Person color="primary" />
            <Typography variant="h5" component="span">
              User Details
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              @{user.username}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Email color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Phone color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Language color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Website
                  </Typography>
                  <Typography variant="body1">
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {user.website}
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <LocationOn color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {user.address.street} {user.address.suite}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Business color="action" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Company
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.company.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    &ldquo;{user.company.catchPhrase}&rdquo;
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user.company.bs}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Divider />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip label={`ID: ${user.id}`} size="small" />
              <Chip label={user.address.city} size="small" color="primary" />
              <Chip label={user.company.name} size="small" variant="outlined" />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
