'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from 'src/components/ui/checkbox';
import { DataTableRowActions } from './data-table-row-actions';

import { DataTableColumnHeader } from 'src/components/table/data-table-column-header';
import { Transaction } from '../../data/transactions';

export const columns: ColumnDef<Transaction>[] = [
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
 
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
  },
  {
    accessorKey: 'organisation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Organisation' />,
    cell: ({ row: { original } }) => {
      const res= original;
      return (
        <div className="capitalize">            
          {res.organisation.name}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'organisationtype',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type of Organisation' />,
    cell: ({ row: { original } }) => {
      const res= original;
      return (
        <div className="capitalize">            
          {res.organisation.type}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Quantity' />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Unit Price' />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "XAF",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  // {
  //   accessorKey: 'service_receiver',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Service Receiver' />
  //   ),
  // },
  // {
  //   accessorKey: 'date',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
