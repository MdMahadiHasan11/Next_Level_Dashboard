"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { findMenuItemById, hasPermission } from "@/lib/permission-button";
import { usePermissions } from "@/hooks/use-permission";
import { MenuItem } from "@/constant/button-manu-data";

interface PermissionButtonProps {
  buttonId: string;
  className?: string;
  onClick?: () => void;
  id?: string;
  query?: { page?: number; limit?: number; [key: string]: any }; // Support pagination and other query params
}

// Custom function to serialize query parameters
const serializeQuery = (query: { [key: string]: any } | undefined): string => {
  if (!query) return "";
  const params = Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== null) // Exclude undefined/null values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return params ? `?${params}` : "";
};

export function PermissionButton({
  query,
  id,
  onClick,
  buttonId,
  className,
}: PermissionButtonProps) {
  const { permissions } = usePermissions();
  const router = useRouter();
  const menuItem: MenuItem | undefined = findMenuItemById(buttonId);

  if (!menuItem) {
    console.warn(`MenuItem with id "${buttonId}" not found`);
    return null;
  }

  // Check permission
  if (menuItem?.permission) {
    const hasAccess = hasPermission(
      permissions,
      menuItem.permission.module,
      menuItem.permission.action
    );

    if (!hasAccess) {
      console.warn(`No access for menuItem "${buttonId}"`);
      return null; // Don't render if no permission
    }
  }

  const handleClick = () => {
    // If has href, navigate with query parameters
    if (menuItem?.href) {
      const queryString = serializeQuery(query);
      router.push(`${menuItem.href}${id ? `/${id}` : ""}${queryString}`);
      return;
    }
    // Fallback to custom onClick prop
    if (onClick) {
      onClick();
      return;
    }
  };

  return (
    <Button
      variant={menuItem?.variant || "default"}
      onClick={handleClick}
      className={cn("gap-2", className)}
    >
      {menuItem?.icon && menuItem.icon}
      {menuItem?.label || "Button"} {/* Fallback label */}
    </Button>
  );
}
