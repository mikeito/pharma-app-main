import { SideLink } from "src/data/menuitems";
import { SiteRole } from "src/types";

export const getAuthorizedMenuItems = (menuItems: SideLink[], userRole: SiteRole): SideLink[] => {
  return menuItems
    .filter((menuItem) => 
      menuItem.roles.includes('ALL') || menuItem.roles.includes(userRole) // Allow 'ALL' items
    )
    .map((menuItem) => {
      // Recursively handle sub-menu items if they exist
      if (menuItem.sub) {
        return {
          ...menuItem,
          sub: getAuthorizedMenuItems(menuItem.sub, userRole),
        };
      }
      return menuItem;
    });
};
