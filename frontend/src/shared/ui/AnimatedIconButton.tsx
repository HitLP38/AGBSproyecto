import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

interface Props extends IconButtonProps {
  tooltip: string;
  icon: React.ReactNode;
}

export const AnimatedIconButton = ({ tooltip, icon, ...rest }: Props) => (
  <Tooltip title={tooltip}>
    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
      <IconButton {...rest}>{icon}</IconButton>
    </motion.div>
  </Tooltip>
);
