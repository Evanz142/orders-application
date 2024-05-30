import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditOrderButton from './EditOrderButton.tsx';

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
  { field: 'createdDateString', headerName: 'Creation Date', width: 200 },
  { field: 'createdByUsername', headerName: 'Created By', width: 200 },
  { field: 'orderType', headerName: 'Order Type', width: 250 },
  { field: 'customerName', headerName: 'Customer', width: 300 },
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
          createdDate={params.row.createdDate}
        >
        </EditOrderButton>
      );
    },
  },
  { field: 'createdDate'}
];

const DataTable: React.FC<DataTableProps> = ({ data, apiRef, updateData }) => {

  return (
    <div style={{ minHeight: '100%', width: '98%', margin: '0 auto', textAlign: 'center' }}>
      <DataGrid
        autoHeight {...data}
        rows={data}
        columns={columns(updateData)}
        apiRef={apiRef}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columnVisibilityModel={{
          createdDate: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        pageSizeOptions={[6, 12, 24]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
