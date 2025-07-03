import { Typography, Box } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <Box mb={2}>
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
