import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DropdownSelect from './DropdownSelect.js';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from '../contexts/SessionContext.js';
import { useUserContext } from '../contexts/UserContext.js';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const uri = 'https://localhost:7045/api/Orders';

interface EditOrderButtonProps {
  id: string;
  createdByUsername: string;
  customerName: string;
  orderType: number;
  createdDate: string;
}

const EditOrderButton: React.FC<EditOrderButtonProps> = ({ id, createdByUsername, customerName, orderType, createdDate }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    createdByUsername: createdByUsername,
    customerName: customerName,
    orderType: orderType,
  });
  const { getToken } = useSession();
  const { getData } = useUserContext();
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // for managing state with the form data
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const order = {
        id: id,
        //createdDate: new Date().toJSON(),
        createdDate: createdDate,
        
        ...formData
    }
    console.log(order);
    const token = getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
    fetch(uri, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(order)
    })
      .then(() => {
        getData();
      })
      .catch(error => console.error('Unable to add item.', error));

    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="edit">
        <EditIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Order 
            </Typography>
            <br></br>
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <TextField
                required
                id="outlined-required"
                label="Your Name"
                //defaultValue={createdByUsername}
                name="createdByUsername"
                value={formData.createdByUsername}
                onChange={handleChange}
                variant="filled"
                />
                <TextField
                required
                id="outlined-required"
                name="customerName"
                label="Customer Name"
                //defaultValue={customerName}
                value={formData.customerName}
                onChange={handleChange}
                variant="filled"
                />
                <div><DropdownSelect
                id='orderTypeDropdown'
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}></DropdownSelect></div>

            </Stack>
            
            <br></br>
            {/* <Button onClick={handleSubmit} variant="contained">Submit</Button> */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditOrderButton;
