import React from 'react';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Portal } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOrderButton from './EditOrderButton.tsx';

function MyCustomToolbar(props: any) {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')!}>
        <GridToolbarQuickFilter {...props} variant="outlined" />
      </Portal>
      <GridToolbar {...props} />
    </React.Fragment>
  );
}

type StringToNumber = {
  [key: string]: number;
};
 
const orderTypeMap: StringToNumber = {
  "Standard": 1,
  "Sale Order": 2,
  "Purchase Order": 3,
  "Transfer Order": 4,
  "Return Order": 5,
};

interface DataTableProps {
  data: any[]; // Define the type of the data array
  apiRef: any;
  updateData: () => void;
}

const columns = (updateData: () => void) => [
  { field: 'id', headerName: 'Order ID', width: 300 },
  { field: 'createdDate', headerName: 'Creation Date', width: 200 },
  { field: 'createdByUsername', headerName: 'Created By', width: 200 },
  { field: 'orderType', headerName: 'Order Type', width: 250 },
  { field: 'customerName', headerName: 'Customer', width: 200 },
  {
    field: 'editButton',
    headerName: '', // Empty string for header
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderHeader: () => null, // Render empty header
    renderCell: (params: any) => {
      return (
        <EditOrderButton 
          aria-label="edit" 
          updateData={updateData} 
          id={params.row.id} 
          createdByUsername={params.row.createdByUsername} 
          customerName={params.row.customerName}
          orderType={orderTypeMap[params.row.orderType]}
        >
        </EditOrderButton>
      );
    },
  },
];

const DataTable: React.FC<DataTableProps> = ({ data, apiRef, updateData }) => {
  return (
    <div style={{ minHeight: '100%', width: '98%', margin: '0 auto', textAlign: 'center' }}>
      <DataGrid
        rows={data}
        columns={columns(updateData)}
        apiRef={apiRef}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: MyCustomToolbar }}
        
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
