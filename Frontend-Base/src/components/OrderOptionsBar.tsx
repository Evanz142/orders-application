import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DropdownSelect from './DropdownSelect.js';
import CreateOrderButton from './CreateOrderButton.js';
import Search from './Search.js';
import DeleteIcon from '@mui/icons-material/Delete';

const uri = 'https://localhost:7045/api/Orders';

interface OrderOptionsBarProps {
  updateData: (type?: number) => void; // Define the type of the getData function
  apiRef: any; // apiRef for the data table
}

const OrderOptionsBar: React.FC<OrderOptionsBarProps> = ({ updateData, apiRef }) => {
  const [orderTypeFilter, setOrderTypeFilter] = React.useState({
    orderType: '',
  });

  const handleOrderTypeFilterChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setOrderTypeFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
    updateData(value);
  };

  const deleteOrder = (id: string) => {
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      updateData();
    })
    .catch(error => console.error('Unable to delete item.', error));
  }

  const deleteHandler = () => {
    //console.log(apiRef.current.getSelectedRows());
    apiRef.current.getSelectedRows().forEach((value: any) => {
      console.log("Deleting order with id: "+value.id);
      deleteOrder(value.id);
    });
  }
  return (
    <div>
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <div></div>
            <div id="filter-panel"></div>
            {/* <Search></Search> */}
            <CreateOrderButton updateData={updateData}></CreateOrderButton>
            <Button onClick={deleteHandler} variant="contained"><DeleteIcon style={{paddingRight: 10}}></DeleteIcon> Delete Selected</Button>
            <div><DropdownSelect
            id='orderTypeDropdown'
            name="orderType"
            value={orderTypeFilter.orderType}
            onChange={handleOrderTypeFilterChange}></DropdownSelect></div>
        </Stack>
    </div>
  );
}

export default OrderOptionsBar;
