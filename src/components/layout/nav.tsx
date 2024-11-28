import { IconChevronDown } from '@tabler/icons-react';
import { Button, buttonVariants } from '../custom/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from 'src/lib/utils';
import { SideLink } from 'src/data/sidelinks';
import Link from 'next/link';
import { Typography } from '../ui/typography';
import useCheckActiveNav from 'src/hooks/use-check-active-nav';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

export default function Nav({ links, isCollapsed, className, closeNav }: NavProps) {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub) return <NavLinkIconDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />;

    if (isCollapsed) return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub) return <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />;

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className,
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({ title, icon, label, href, closeNav, subLink = false }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const isActive = checkActiveNav(href);
  return (
    <Link
      href={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: isActive && !subLink ? 'secondary' : 'ghost', // Apply 'secondary' only if active
          size: 'sm',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        isActive && !subLink ? 'bg-primary-foreground border-l-4 border-l-primary' : '', // Active styles
        subLink && 'h-10 w-full px-2' // Sub-link styling
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`mr-2 ${isActive ? 'text-primary ' : ''}`}>{icon}</div>
      <Typography size="xs" className={`${isActive ? 'text-primary font-semibold' : ''}`}>
        {title}
      </Typography>
      {label && <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">{label}</div>}
    </Link>
  );
}


function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href)); // Check active state for sub-links

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          isChildActive ? 'bg-primary-foreground border-l-4 border-l-primary' : '',
          'group h-12 w-full justify-start rounded-none px-6'
        )}
      >
        <div className={`mr-2 ${isChildActive ? 'text-primary' : ''}`}>{icon}</div>
        <Typography size="xs" className={`${isChildActive ? 'text-primary font-semibold' : ''}`}>
          {title}
        </Typography>
        {label && <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">{label}</div>}
        <span className={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}>
          <IconChevronDown stroke={1} className={`${isChildActive ? 'text-primary' : ''}`} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}


function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const isActive = checkActiveNav(href);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              size: 'icon',
            }),
            'h-12 w-12',
            isActive ? 'bg-primary-foreground border-l-4 border-l-primary' : ''
          )}
        >
          {icon}
          <Typography size="xs" className={`sr-only ${isActive ? 'text-primary font-semibold' : ''}`}>
            {title}
          </Typography>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        <Typography size="xs" className={`${isActive ? 'text-primary font-semibold' : ''}`}>
          {title}
        </Typography>
        {label && <span className="ml-auto text-muted-foreground">{label}</span>}
      </TooltipContent>
    </Tooltip>
  );
}


function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
 
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant={isChildActive ? 'secondary' : 'ghost'} size='icon' className='h-12 w-12'>
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {title} {label && <span className='ml-auto text-muted-foreground'>{label}</span>}
          <IconChevronDown size={18} className='-rotate-90 text-muted-foreground' />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }: any) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link href={href} className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}>
              {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
              {label && <span className='ml-auto text-xs'>{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
