import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DropdownSelect from './DropdownSelect.js';
import MultiSelectDropdownProps from './DropdownMultiSelect.js';
import CreateOrderButton from './CreateOrderButton.js';
import Search from './Search.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from '../contexts/SessionContext.js';
import { useUserContext } from '../contexts/UserContext.js';
import DateSelect from './DateSelect.js';
import { useState } from 'react';

const uri = 'https://localhost:7045/api/Orders';

interface OrderOptionsBarProps {
  apiRef: any; // apiRef for the data table
}

const OrderOptionsBar: React.FC<OrderOptionsBarProps> = ({ apiRef }) => {
  const [orderTypeFilter, setOrderTypeFilter] = useState({
    orderType: '',
  });
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const {getToken} = useSession();
  const {setFilterType, setFilterTypes, getData} = useUserContext();

  const handleOrderTypeFilterChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setOrderTypeFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFilterType(value);
  };

  const handleOrderTypeChange = (event: React.ChangeEvent<{}>, value: any[]) => {
    setSelectedOrderTypes(value);
    setFilterTypes(value);
    console.log(value)
  };

  const deleteOrder = (id: string) => {
    const token = getToken();
    if (!token) {
      console.error('No token available');
      return;
    }

    fetch(`${uri}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: "DELETE",
    })
    .then(() => {
      getData();
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
            {/* <div id="filter-panel"></div> */}
            <Search></Search>
            <Stack direction="row" spacing={4}>
            <CreateOrderButton></CreateOrderButton>
            <Button onClick={deleteHandler} variant="contained"><DeleteIcon style={{paddingRight: 10}}></DeleteIcon> Delete Selected</Button>
            </Stack>
            
            {/* <DropdownSelect
            id='orderTypeDropdown'
            name="orderType"
            value={orderTypeFilter.orderType}
            onChange={handleOrderTypeFilterChange}></DropdownSelect> */}

            <MultiSelectDropdownProps 
            id='orderTypeDropdown'
            value={selectedOrderTypes}
            onChange={handleOrderTypeChange}></MultiSelectDropdownProps>
            <DateSelect></DateSelect>
        </Stack>
    </div>
  );
}

export default OrderOptionsBar;
