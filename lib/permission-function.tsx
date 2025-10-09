// import {
//   CRUDOperation,
//   menuData,
//   MenuItem,
//   SubMenuItem,
//   userPermissions,
// } from "@/constant/sidebar-manu-data";

import {
  CRUDOperation,
  menuData,
  MenuItem,
  SubMenuItem,
} from "@/constant/sidebar-manu-data";
import { usePermissions } from "@/hooks/use-permission";
type PermissionsObject = Record<string, CRUDOperation[]>;

// for middleware
export function getHrefValues(data: any[]): string[] {
  const hrefs: string[] = [];

  function traverse(items: any) {
    if (!Array.isArray(items)) return;

    for (const item of items) {
      // If item is an array, recursively traverse it
      if (Array.isArray(item)) {
        traverse(item);
        continue;
      }

      // Check if item has children (non-empty array)
      const hasChildren =
        item?.children &&
        Array.isArray(item.children) &&
        item.children.length > 0;

      // Only add href if item has no children and has an href
      if (item?.href && !hasChildren) {
        hrefs.push(item.href);
      }

      // Recursively traverse children if they exist
      if (hasChildren) {
        traverse(item.children);
      }
    }
  }

  traverse(data);
  return hrefs;
}

export function sidebarAllHref({
  permissions,
}: {
  permissions: PermissionsObject;
}) {
  const middlewareHref = menuData
    ?.map((item) => filterByPermissions(item.items, permissions))
    .filter((section) => section.length > 0 && section.length > 0);

  const middleWareData = getHrefValues(middlewareHref);
  return middleWareData;
}

//
//
//main menu data for sidebar

export function hasPermissionSet(
  permissions: PermissionsObject,
  permissionKey?: string,
  requiredOperation: CRUDOperation = "READ"
): boolean {
  // If no permission key is specified, allow access
  if (!permissionKey) return true;
  // Check if the permission key exists in user permissions
  const operations = (permissions as PermissionsObject)[permissionKey] || [];

  // If the key doesn't exist or has no operations, deny access
  if (!operations || operations.length === 0) return false;

  // Check if the required operation is in the allowed operations
  return operations.includes(requiredOperation);
}
const filterSubMenuByPermissions = (
  items: SubMenuItem[],
  permissions: PermissionsObject
): SubMenuItem[] => {
  return items
    .filter((item) =>
      hasPermissionSet(permissions, item.permissionKey, item.requiredOperation)
    )
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(
          item.children,
          permissions
        );
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};

const filterByPermissions = (
  items: MenuItem[],
  permissions: PermissionsObject
): MenuItem[] => {
  return items
    .filter((item) =>
      hasPermissionSet(permissions, item.permissionKey, item.requiredOperation)
    )
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(
          item.children,
          permissions
        );
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};
const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
  if (!query.trim()) return items;

  const searchLower = query.toLowerCase();

  const filterRecursive = (
    item: MenuItem | SubMenuItem
  ): MenuItem | SubMenuItem | null => {
    const matchesLabel = item.label.toLowerCase().includes(searchLower);

    if (item.children) {
      const filteredChildren = item.children
        .map((child) => filterRecursive(child))
        .filter(Boolean) as SubMenuItem[];

      if (matchesLabel || filteredChildren.length > 0) {
        return {
          ...item,
          children:
            filteredChildren.length > 0 ? filteredChildren : item.children,
        };
      }
    } else if (matchesLabel) {
      return item;
    }

    return null;
  };

  return items
    .map((item) => filterRecursive(item))
    .filter(Boolean) as MenuItem[];
};

export function mainMenuData({
  searchQuery,
  permissions,
}: {
  searchQuery: string;
  permissions: PermissionsObject;
}) {
  const filteredMenuData = menuData
    .map((section) => ({
      ...section,
      items: filterMenuItems(
        filterByPermissions(section.items, permissions),
        searchQuery
      ),
    }))
    .filter((section) => section.items.length > 0);
  return filteredMenuData;
}
