import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const BasicMenu = (props) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(null);
  const open = Boolean(isOpen);

  const handleClick = (event) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const navigateProfilePage = () => {
      navigate(`/user/profile/${props.user.user_id}`)
  }
  
  return (
    <div>
        <IconButton onClick={handleClick}>
            <Avatar id="menuBtn" className='w-[40px] h-[40px] font-bold' style={{backgroundColor:'white', color:'black' }} >{props.user.UserName.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
        <Menu id="basic-menu" anchorEl={isOpen} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
            <MenuItem onClick={() => { handleClose(); navigateProfilePage(); }}>My Profile</MenuItem>
            <MenuItem onClick={() => { handleClose(); props.signOut(); }}>Logout</MenuItem>
        </Menu>
    </div>
  );
}

export default BasicMenu
