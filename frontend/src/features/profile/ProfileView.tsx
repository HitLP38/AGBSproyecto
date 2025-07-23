// ✅ src/features/profile/ProfileView.tsx
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useProfileStore } from "@/store/userProfileStore";

const grados = ["Cadete", "Suboficial", "Oficial", "Reserva"];
const sexos = ["Masculino", "Femenino"];

export const ProfileView = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const { edad, sexo, grado, setEdad, setSexo, setGrado } = useProfileStore();

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Mi Perfil
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar src={user?.imageUrl} sx={{ width: 100, height: 100 }} />
          <Typography variant="h6">{user?.fullName}</Typography>
          <Typography color="text.secondary">
            {user?.emailAddresses[0]?.emailAddress}
          </Typography>

          <TextField
            label="Edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
            fullWidth
          />

          <TextField
            label="Sexo"
            select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            fullWidth
          >
            {sexos.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Grado militar"
            select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            fullWidth
          >
            {grados.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="outlined" color="error" onClick={() => signOut()}>
            Cerrar sesión
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
