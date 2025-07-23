// ✅ src/features/user/UserProfileView.tsx
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { useUser, useClerk } from "@clerk/clerk-react";

export const UserProfileView = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Avatar
          src={user.imageUrl}
          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600}>
          {user.fullName || "Usuario"}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {user.primaryEmailAddress?.emailAddress || "Sin email"}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() =>
            signOut(() => {
              window.location.href = "/";
            })
          }
        >
          Cerrar sesión
        </Button>
      </Paper>
    </Container>
  );
};
