'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalUser, getUserToken } from 'src/helpers/auth';
import UnAuthorized from 'src/app/not-authorized';
import { menuItems } from 'src/data/menuitems';
import { getAuthorizedMenuItems } from 'src/helpers/filterlinks';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = getLocalUser(); // Retrieve user from local storage or auth context
  const token = getUserToken(); // Retrieve token
  const router = useRouter();
  const pathname = usePathname();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
    }
    if (pathname === '/login' && token) {
      router.push('/search');
    }
  }, [user, token, router, pathname]);

  if (!user || !token) return null; // Prevent rendering until redirection occurs

  // Compute authorized menu items
  const userMenuItems = getAuthorizedMenuItems(menuItems, user?.role);

  console.log({userMenuItems})
  // Verify if the current route is allowed
  const authorizedRoute = userMenuItems.some((allowedPath) =>
    pathname.startsWith(allowedPath.href)
  );

  if (!authorizedRoute && pathname !== '/login') {
    return <UnAuthorized />; // Render the unauthorized component
  }

  return <>{children}</>;
};

export default PrivateRoute;
