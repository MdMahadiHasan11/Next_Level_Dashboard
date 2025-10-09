import {
  MENU_CONFIG,
  MenuItem,
  PermissionAction,
  UserPermissions,
} from "@/constant/button-manu-data";
import { usePermissions } from "@/hooks/use-permission";

/**
 * Check if user has specific permission
 */
export function hasPermission(
  userPermissions: UserPermissions,
  module: string,
  action: PermissionAction
): boolean {
  const modulePermissions = userPermissions[module];
  if (!modulePermissions) return false;
  return modulePermissions.includes(action);
}

/**
 * Filter menu items based on user permissions
 */
export function filterMenuByPermissions(
  menuItems: MenuItem[],
  userPermissions: UserPermissions
): MenuItem[] {
  return menuItems
    .filter((item) => {
      // If no permission required, show the item
      if (!item.permission) return true;

      // Check if user has the required permission
      return hasPermission(
        userPermissions,
        item.permission.module,
        item.permission.action
      );
    })
    .map((item) => {
      // Recursively filter children if they exist
      if (item.children) {
        return {
          ...item,
          children: filterMenuByPermissions(item.children, userPermissions),
        };
      }
      return item;
    });
}

/**
 * Get all hrefs from menu items
 */
export function collectAllHrefs(menuItems: MenuItem[] = MENU_CONFIG): string[] {
  const hrefs: string[] = [];

  function traverse(items: MenuItem[]) {
    items.forEach((item) => {
      if (item.href) {
        hrefs.push(item.href);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  }

  traverse(menuItems);
  return hrefs;
}

/**
 * Get hrefs that user has permission to access
 */
export function collectPermittedHrefs(
  menuItems: MenuItem[] = MENU_CONFIG
): string[] {
  const { permissions } = usePermissions();
  const hrefs: string[] = [];
  const permittedItems = filterMenuByPermissions(menuItems, permissions);

  function traverse(items: MenuItem[]) {
    items.forEach((item) => {
      if (item.href) {
        hrefs.push(item.href);
      }
      if (item.hrefId) {
        hrefs.push(item.hrefId);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  }
  traverse(permittedItems);
  return hrefs;
}

/**
 * Find menu item by ID
 */
export function findMenuItemById(
  id: string,
  menuItems: MenuItem[] = MENU_CONFIG
): MenuItem | undefined {
  for (const item of menuItems) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuItemById(id, item.children);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Get accessible menu items for a user
 */
export function getAccessibleMenuItems(
  userPermissions: UserPermissions
): MenuItem[] {
  return filterMenuByPermissions(MENU_CONFIG, userPermissions);
}
