import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';

const BasicMenu = (props) => {

  const [isOpen, setIsOpen] = useState(null);
  const open = Boolean(isOpen);

  const handleClick = (event) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };
  
  return (
    <div>
        <IconButton onClick={handleClick}>
            <Avatar id="menuBtn" className='w-[40px] h-[40px] font-bold' style={{backgroundColor:'white', color:'black' }} >{props.UserName}</Avatar>
        </IconButton>
        <Menu id="basic-menu" anchorEl={isOpen} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => { handleClose(); props.signOut(); }}>Logout</MenuItem>
        </Menu>
    </div>
  );
}

export default BasicMenu
