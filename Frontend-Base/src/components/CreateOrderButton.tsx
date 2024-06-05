import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DropdownSelect from './DropdownSelect.js';
import { useSession } from '../contexts/SessionContext.js';
import { useUserContext } from '../contexts/UserContext.js';
import { Modal, Backdrop, Box, Fade, Button, TextField, Typography, Stack, DialogActions, Select, MenuItem } from '@mui/material';


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

// format the order type to make it readable and not just a number
function formatOrderType(orderType: number): string {
  switch (orderType) {
      case 0:
          return 'None';
      case 1:
          return 'Standard';
      case 2:
          return 'Sale Order';
      case 3:
          return 'Purchase Order';
      case 4:
          return 'Transfer Order';
      case 5:
          return 'Return Order';
      default:
          return '';
  }
  }

interface CreateOrderButtonProps {

}

const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({  }) => {
  const [open, setOpen] = React.useState(false);
  const { getToken, session } = useSession();
  const [formData, setFormData] = React.useState({
    createdByUsername: session.user.email.match(/^[^@]+/)?.[0] || '',
    customerName: '',
    orderType: 0,
  });
  const [currentDraft, setCurrentDraft] = React.useState({
    createdByUsername: session.user.email.match(/^[^@]+/)?.[0] || '',
    customerName: '',
    orderType: 0,
  })
  const { getData, queueSnackbar, addDraft, deleteDraft, orderDrafts, uri } = useUserContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({ // reset the form so its empty if the user creates another order
      createdByUsername: session.user.email.match(/^[^@]+/)?.[0] || '',
      customerName: '',
      orderType: 0,
    })
  }
  
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

  const handleDraftSelect = (event: { target: { value: any; }; }) => {
    const draft = orderDrafts[event.target.value];
    setCurrentDraft(draft)
    setFormData(draft);
  };
  
  const handleDraft = () => {

    addDraft(formData);
    deleteDraft(currentDraft);

    queueSnackbar("Draft Saved!");
    resetFormData();
    handleClose();
  }

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
        getData();
      })
      .catch(error => console.error('Unable to add item.', error));
    
    queueSnackbar("Order Created!");
    setFormData({ // reset the form so its empty if the user creates another order
      createdByUsername: '',
      customerName: '',
      orderType: 0,
    })
    deleteDraft(currentDraft);
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Create Order
                </Typography>
                <Select
                  labelId="draft-select-label"
                  id="draft-select"
                  onChange={handleDraftSelect}
                  displayEmpty
                  sx={{ minWidth: 160 }}
                  defaultValue=""
                  size="small"
                >
                  <MenuItem value="" disabled>Select Draft</MenuItem>
                  {orderDrafts.map((draft, index) => (
                    <MenuItem key={index} value={index}>
                      {draft.createdByUsername}, {draft.customerName}, {formatOrderType(draft.orderType)}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
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
            
            <DialogActions>
              <Button onClick={handleDraft} style={{ marginRight: 'auto' }}>Save Draft</Button>
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
