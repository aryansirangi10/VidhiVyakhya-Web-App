export type Role = "Admin" | "CharteredAccountant" | "Lawyer" | "Citizen";

export interface Permission {
  action: "read" | "write" | "delete" | "admin";
  resource: "bills" | "documents" | "calculator" | "ai" | "settings";
}

export const rolePermissions: Record<Role, Permission[]> = {
  Admin: [
    { action: "admin", resource: "settings" },
    { action: "write", resource: "documents" },
    { action: "read", resource: "bills" },
    { action: "read", resource: "calculator" },
    { action: "read", resource: "ai" },
  ],
  CharteredAccountant: [
    { action: "write", resource: "calculator" },
    { action: "read", resource: "bills" },
    { action: "read", resource: "documents" },
    { action: "read", resource: "ai" },
  ],
  Lawyer: [
    { action: "read", resource: "bills" },
    { action: "read", resource: "documents" },
    { action: "read", resource: "ai" },
  ],
  Citizen: [
    { action: "read", resource: "bills" },
    { action: "read", resource: "calculator" },
    { action: "read", resource: "ai" },
  ],
};

export const hasPermission = (userRole: Role, action: Permission["action"], resource: Permission["resource"]): boolean => {
  const perms = rolePermissions[userRole] || [];
  return perms.some((p) => (p.action === action || p.action === "admin") && p.resource === resource);
};
