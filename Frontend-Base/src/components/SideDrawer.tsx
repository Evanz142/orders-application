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

interface SideDrawerProps {
    toggleDrawer: (val: boolean) => React.MouseEventHandler<HTMLDivElement>;
}

const itemsMap: { [key: string]: { icon: React.ReactElement, href: string } } = {
    'View Orders': { icon: <ManageSearchIcon />,  href: ''},
    'Statistics': { icon: <ShowChartIcon />, href: 'stats'},
};

const SideDrawer: React.FC<SideDrawerProps> = ({ toggleDrawer }) => {
    const navigate = useNavigate();

    const handleNavigation = (href: string) => {
        navigate(`/${href}`);
        console.log("Redirecting to " + href);
    };

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
    </Box>
  );
}

export default SideDrawer;