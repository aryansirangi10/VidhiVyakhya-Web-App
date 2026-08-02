import React from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
}
