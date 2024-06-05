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
import { Backdrop, Box, DialogActions, Fade, Modal, Typography } from '@mui/material';

interface OrderOptionsBarProps {
  apiRef: any; // apiRef for the data table
}

const OrderOptionsBar: React.FC<OrderOptionsBarProps> = ({ apiRef }) => {
  const [orderTypeFilter, setOrderTypeFilter] = useState({
    orderType: '',
  });
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    if (getSelectedRowAmount() > 1) {
      setModalOpen(true);
    }
    else {
      deleteHandler();
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const {getToken} = useSession();
  const {setFilterType, setFilterTypes, getData, uri} = useUserContext();

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

  const getSelectedRowAmount = () => {
    //console.log(apiRef.current.getSelectedRows().size);
    try {
      return apiRef.current.getSelectedRows().size;
    }
    catch {
      return 0;
    }
  }

  const deleteHandler = () => {
    //console.log(apiRef.current.getSelectedRows());
    handleModalClose();
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
            <Search></Search>
            <Stack direction="row" spacing={4}>
            <CreateOrderButton></CreateOrderButton>
            <Button onClick={handleModalOpen} variant="contained"><DeleteIcon style={{paddingRight: 10}}></DeleteIcon> Delete Selected</Button>
            </Stack>

            <MultiSelectDropdownProps 
            id='orderTypeDropdown'
            value={selectedOrderTypes}
            onChange={handleOrderTypeChange}></MultiSelectDropdownProps>
            <DateSelect></DateSelect>
        </Stack>

        {/* Delete confirmation modal */}
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={{ // modal styling
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            //border: '2px solid #000',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxWidth: 500
          }}>
            
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete {getSelectedRowAmount()} items? This cannot be undone.
            </Typography>

            <br></br>

            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button onClick={deleteHandler}>Delete</Button>
            </DialogActions>
                     
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default OrderOptionsBar;
