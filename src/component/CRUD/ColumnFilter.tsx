import { useMemo } from 'react';
// import {
//   MantineReactTable,
//   useMantineReactTable,
//   MRT_ColumnDef, // Updated type definition
// } from 'mantine-react-table';
import { IData } from '../../InterFace/commonInterface';
import { USERS } from '../user';

const Example = () => {
  const columns = useMemo( // Update the type here
    () => [
      {
        accessorKey: 'firstName',
        header: 'Name',
        filterVariant: 'text', // default
      },
      {
        accessorKey: 'lastName',
        header: 'lastName',
        filterVariant: 'text',
      },
      {
        accessorKey: 'emailAddress',
        header: 'City',
        filterVariant: 'text',
      },
      {
        accessorKey: 'password',
        header: 'password',
        filterVariant: 'text',
      },
    ],
    [],
  );

//   const table = useMantineReactTable({
//     columns,
//     USERS,
//     initialState: { showColumnFilters: true },
//   });

//   return <MantineReactTable table={table} />;
};

export default Example;
