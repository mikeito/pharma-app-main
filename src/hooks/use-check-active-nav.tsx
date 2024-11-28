'use client'
import { usePathname } from 'next/navigation'

export default function useCheckActiveNav() {
  const pathname = usePathname();

  const checkActiveNav = (href: string): boolean => {
    return pathname === href; // Dynamically check the active route
  };

  return { checkActiveNav };
}
