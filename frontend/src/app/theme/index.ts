import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { radius } from "./radius";
import { motion } from "./motion";
import { breakpoints } from "./breakpoints";
import { zIndex } from "./zIndex";

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  radius,
  motion,
  breakpoints,
  zIndex,
} as const;

export { colors, spacing, typography, shadows, radius, motion, breakpoints, zIndex };
export default theme;
