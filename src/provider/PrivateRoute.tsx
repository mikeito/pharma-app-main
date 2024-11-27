'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalUser, getUserToken } from 'src/helpers/auth';
import UnAuthorized from 'src/app/not-authorized';
import { menuItems } from 'src/data/menuitems';
import { getAuthorizedMenuItems } from 'src/helpers/filterlinks';
interface PrivateRouteProps {
  children: React.ReactNode;
//   allowedRoles: string[]; 
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = getLocalUser();
  const token = getUserToken();
  const router = useRouter();
  const pathname= usePathname()
  console.log({ user });

    if (!user || !token) {
      router.push('/login'); 
    } 
    if (pathname === "/login" && token) {
        router.push("/search");
      }

      
      const userMenuItems = getAuthorizedMenuItems(menuItems, user?.role);
    console.log({userMenuItems})

      const authorizedRoute = userMenuItems.some((allowedPath) =>
        pathname.startsWith(allowedPath.href)
      );
      if (!authorizedRoute && pathname !== "/") return UnAuthorized();
      return <>{children}</>;
};

export default PrivateRoute;
