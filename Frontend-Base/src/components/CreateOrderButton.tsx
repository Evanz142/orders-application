import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DropdownSelect from './DropdownSelect.js';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import { useSession } from '../contexts/SessionContext.js';


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

interface CreateOrderButtonProps {
  updateData: () => void; // Define the type of the data array
}

const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({ updateData }) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    createdByUsername: '',
    customerName: '',
    orderType: 0,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getToken } = useSession();
  const generateID = () => {
    const chars = "AaBbCcDdEeFf1234567890";
    return [8,4,4,4,12].map(n => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("")).join("-");
  };

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
        id: generateID(),
        createdDate: new Date().toJSON(),
        
        ...formData
    }
    console.log("Submitted Order:\t" + order);
    const token = getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateData();
      })
      .catch(error => console.error('Unable to add item.', error));

    handleClose();
  }

  return (
    <div>
      <Button style={{height: '100%'}} onClick={handleOpen} variant="contained">
        <AddIcon style={{ paddingRight: 10 }}></AddIcon>
        Create Order
      </Button>
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
              Create Order 
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
                name="createdByUsername"
                value={formData.createdByUsername}
                onChange={handleChange}
                />
                <TextField
                required
                id="outlined-required"
                name="customerName"
                label="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
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
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateOrderButton;
