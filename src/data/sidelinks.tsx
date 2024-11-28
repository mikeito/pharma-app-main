import {  Users, LayoutDashboard, Pill, Boxes, Layers3 } from 'lucide-react';
import { SiteRole } from 'src/types';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon?: JSX.Element;
  roles:SiteRole[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin',
    icon: <LayoutDashboard size={20} />,
    roles:["ADMIN"]
  },

  {
    title: 'Users',
    label: '',
    href: '/admin/users',
    icon: <Users size={20} />,
    roles:['ADMIN',]
  },
  {
    title: 'Organisations',
    label: '',
    icon: <Boxes size={20} />,
    href: '/admin/organisations',
    roles:['ADMIN']
  },
  {
    title: 'Drugs',
    label: '',
    href: '/admin/drugs',
    icon: <Pill size={20} />,
    roles:['ADMIN','PHARMACIST']
  },
  {
    title: 'Reservations',
    label: '',
    href: '/admin/reservations',
    icon: <Layers3 size={20} />,
    roles:['ADMIN','PHARMACIST','USER']
  },
];
