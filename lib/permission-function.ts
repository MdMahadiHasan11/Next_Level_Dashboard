import {
  CRUDOperation,
  menuData,
  MenuItem,
  SubMenuItem,
  userPermissions,
} from "@/constant/sidebar-manu-data";

const hasPermission = (
  permissionKey?: string,
  requiredOperation: CRUDOperation = "READ"
): boolean => {
  // If no permission key is specified, allow access
  if (!permissionKey) return true;

  // Check if the permission key exists in user permissions
  const operations = userPermissions[permissionKey];

  // If the key doesn't exist or has no operations, deny access
  if (!operations || operations.length === 0) return false;

  // Check if the required operation is in the allowed operations
  return operations.includes(requiredOperation);
};

const filterSubMenuByPermissions = (items: SubMenuItem[]): SubMenuItem[] => {
  return items
    .filter((item) => hasPermission(item.permissionKey, item.requiredOperation))
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(item.children);
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};

const filterByPermissions = (items: MenuItem[]): MenuItem[] => {
  return items
    .filter((item) => hasPermission(item.permissionKey, item.requiredOperation))
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterSubMenuByPermissions(item.children);
        return {
          ...item,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }
      return item;
    });
};
//
//
//
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
// middleware permission
const middlewareHref = menuData
  ?.map((item) => filterByPermissions(item.items))
  .filter((section) => section.length > 0 && section.length > 0);

export const middleWareData = getHrefValues(middlewareHref);
