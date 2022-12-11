import React, { useMemo ,useEffect,useState} from "react";
import MaterialReactTable from "material-react-table";

import Papa from 'papaparse';
import {Box} from '@mui/material'

export default function DataTable() {
  const [parsedCsvData, setParsedCsvData] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch("MOCK_DATA.csv");
            const reader = response.body.getReader();
            const result = await reader.read(); // raw array
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value); // the csv text
            const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
            const rows = results.data; // array of objects
            setParsedCsvData(rows);
        }
        getData();
    }, []);

    const columns = useMemo(
      () => [
        {
          accessorKey: 'first_name', //access nested data with dot notation
          header: 'First Name',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'last_name',
          header: 'Last Name',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'email', //normal accessorKey
          header: 'Email',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'gender',
          header: 'Gender',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'ip_address',
          header: 'IP Address',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'airport code',
          header: 'Airport Code',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'time',
          header: 'Time',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          enableColumnFilter: false,
          Cell: ({ cell }) => (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue() === 'true'? 'green':'red',
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem',
              })}

            >
              {cell.getValue()}
            </Box>
          ),
        },
        {
          accessorKey: 'mobile',
          header: 'Mobile Number',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'area',
          header: 'Area',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'show',
          header: 'Show',
          enableColumnFilter: false,
        },
        {
          accessorKey: 'edit',
          header: 'Edit',
          enableColumnFilter: false,
        },
        
      ],
      [],
    );
  

  return (
    <>
      <MaterialReactTable columns={columns} data={parsedCsvData}  enableTopToolbar={false} enableHiding={false} />;
    </>
  );
}
