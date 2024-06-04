import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditOrderButton from './EditOrderButton.tsx';
import { useUserContext } from '../contexts/UserContext.tsx';
import './DataTable.css';

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
  apiRef: any;
}

const columns = () => [
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

const DataTable: React.FC<DataTableProps> = ({ apiRef }) => {

  const { tableData } = useUserContext();

  return (
      <div style={{ minHeight: '100%', width: '98%', margin: '0 auto', textAlign: 'center' }}>
        <DataGrid
          autoHeight {...tableData}
          rows={tableData}
          columns={columns()}
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
          getRowClassName={(params) => 'data-grid-row'}
        />
      </div>
  );
};

export default DataTable;
