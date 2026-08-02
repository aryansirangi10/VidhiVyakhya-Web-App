import React from "react";

export type CardVariant =
  | "default"
  | "interactive"
  | "glass"
  | "gradient"
  | "bordered"
  | "elevated";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}
