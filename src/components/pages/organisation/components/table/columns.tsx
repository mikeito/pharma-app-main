'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from 'src/components/ui/badge';
import { Checkbox } from 'src/components/ui/checkbox';
import { DataTableRowActions } from './data-table-row-actions';

import { DataTableColumnHeader } from 'src/components/table/data-table-column-header';
import { statuses, types } from '../../data/data';
import { Transaction } from '../../data/transactions';
import capitalizeFirstLetter from 'src/helpers/capitalize';
import { IOrganisation } from 'src/app/(main)/search/data';
// import { IOrganisation } from 'src/app/(main)/client/search/data';

export const columns: ColumnDef<IOrganisation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Id' />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'user',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Owner' />,
    cell: ({ row: { original } }) => {
      const res= original;
      return (
        <div className="flex gap-x-2 items-center justify-center capitalize">            
          {res.user.username}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
 
  // {
  //   accessorKey: 'description',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
  //   cell: ({ row }) => {
  //     const type = types.find((type) => type.value === row.original.type);

  //     return (
  //       <div className='flex space-x-2'>
  //         {type && (
  //           <Badge variant='outline' className='rounded-lg'>
  //             {type.label}
  //           </Badge>
  //         )}
  //         <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>{row.getValue('description')}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
  },
  // {
  //   accessorKey: 'service_receiver',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Service Receiver' />
  //   ),
  // },
  {
    accessorKey: 'telephone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Telephone' />,
  },
  {
    accessorKey: 'longitude',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Longitude' />,
  },
  {
    accessorKey: 'latitude',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Latitude' />,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Address' />,
  },
  {
    accessorKey: 'openHours',
    header: ({ column }) => <DataTableColumnHeader column={column} title='OpenHours' />,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
  //   cell: ({ row }) => {
  //     const status = statuses.find((status) => status.value === row.getValue('status'));

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Creation Date' />,
  cell: ({ row }) => <div className='w-[80px]'>{row.getValue('createdAt')}</div>,

  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
