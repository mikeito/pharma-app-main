import { SideLink } from "src/data/menuitems";
import { SiteRole } from "src/types";

export const getAuthorizedMenuItems = (menuItems: SideLink[], userRole: SiteRole): SideLink[] => {
    return menuItems
      .filter((menuItem) => menuItem.roles.includes(userRole)) // Filter items where the user role is included
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