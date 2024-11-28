import { IconChecklist, IconLayoutDashboard } from '@tabler/icons-react';
import { UserCog, BadgeInfo, Users, ClipboardCheck, HandPlatter, LayoutDashboard } from 'lucide-react';
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

export const menuItems: SideLink[] = [
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
    icon: <UserCog size={20} />,
    roles:['ADMIN', ]
  },
  {
    title: 'Organisations',
    label: '',
    icon: <Users size={20} />,
    href: '/admin/organisations',
    roles:['ADMIN']
  },
  {
    title: 'Drugs',
    label: '',
    href: '/admin/drugs',
    icon: <Users size={20} />,
    roles:['ADMIN','PHARMACIST']
  },
  {
    title: 'Reservations',
    label: '',
    href: '/admin/reservations',
    icon: <Users size={20} />,
    roles:['ADMIN','PHARMACIST','USER']
  },
  {
    title: 'Search',
    label: '',
    href: '/search',
    icon: <Users size={20} />,
    roles:['PHARMACIST','ADMIN','USER']
  },
  {
    title: 'Home',
    label: '',
    href: '/',
    icon: <Users size={20} />,
    roles:['ALL']
  },
];
