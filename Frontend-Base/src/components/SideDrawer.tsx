import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

interface SideDrawerProps {
    toggleDrawer: (val: boolean) => React.MouseEventHandler<HTMLDivElement>;
}

const itemsMap: { [key: string]: { icon: React.ReactElement, href: string } } = {
    'View Orders': { icon: <ManageSearchIcon />,  href: 'home'},
    'Statistics': { icon: <ShowChartIcon />, href: 'stats'},
};

const SideDrawer: React.FC<SideDrawerProps> = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const { getToken } = useSession();

    const handleNavigation = (href: string) => {
        navigate(`/${href}`);
        console.log("Redirecting to " + href);
    };

    // ------------ DATA GENERATION -------------

    const uri = 'https://localhost:7045/api/Orders';
    const generateID = () => {
        const chars = "AaBbCcDdEeFf1234567890";
        return [8,4,4,4,12].map(n => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("")).join("-");
    };

    const customers = ["Walmart", "Walmart", "Kroger", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Safeway", "Target", "Coca Cola", "Budweiser", "Coca Cola", "Coca Cola"];

    // Function to generate a random date with a weighted distribution towards recent dates
    const generateWeightedDate = () => {
        const now = Date.now();
        const sixMonthsAgo = now - 182 * 24 * 60 * 60 * 1000; // Approx. 6 months in milliseconds
        //console.log("Six months ago: "+sixMonthsAgo);
        const randomWeight = 1 - Math.exp(-Math.random()); // Exponential distribution favoring recent dates
        const date = new Date(sixMonthsAgo + Math.random() * (now - sixMonthsAgo));
        return date.toJSON();
    };

    // Function to generate a random order
    const generateRandomOrder = () => {
        return {
            id: generateID(),
            orderType: Math.floor(Math.random() * 5) + 1,
            customerName: customers[Math.floor(Math.random() * customers.length)],
            createdDate: generateWeightedDate(),
            createdByUsername: "PJ"
        };
    };

    const testFunction = () => {
        const token = getToken();
        if (!token) {
          console.error('No token available');
          return;
        }
        
        for (let i = 0; i < 45; i++) {
            const order = generateRandomOrder();
            
            fetch(uri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .catch(error => console.error('Unable to add item.', error));
            
           //console.log(order);
        }
    }
    // ------------ END DATA GENERATION -------------

    return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {['View Orders', 'Statistics'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(itemsMap[text].href)}>
                <ListItemIcon>
                    {itemsMap[text].icon}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <br></br>
        <Button onClick={testFunction} variant="contained">Generate Test Data</Button>
    </Box>
  );
}

export default SideDrawer;