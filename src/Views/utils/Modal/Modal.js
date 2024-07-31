import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 700,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   borderRadius: 2
  
// };

export default function BasicModal(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2
    
  };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
        props.handleClose();
    };

    React.useEffect(() => {
        setOpen(props.open)
    },[props.open])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
            <Fade in={open} >
                <Box sx={style}>
                    <div>{props.Header}</div>
                    <div>{props.Content}</div>
                    <div>{props.Footer}</div>
                </Box>
            </Fade>
        </Modal>
    </div>
  );
}