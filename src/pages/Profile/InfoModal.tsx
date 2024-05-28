import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import { useGetVenueQuery } from '../../services/api.reducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface InfoModalProps {
  venueId: string;
}

export default function InfoModal({ venueId }: InfoModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {  setOpen(true); };
  const handleClose = () => setOpen(false);

  const { data: venue} = useGetVenueQuery(venueId);

  return (
    <div>

      <Button variant="text" color="secondary" onClick={handleOpen}><InfoIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <h2 id="modal-modal-title">Bookings for {venue?.name}</h2>
          {venue?.bookings.length === 0 && <p>No bookings</p>}
         { venue?.bookings?.map((booking) => (
          <div key={booking.id}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <p>{booking.dateFrom}</p>
              <p>{booking.dateTo}</p>
            </Box>
            
          </div>
           ))}
          <Button onClick={handleClose}>Close</Button>               
        </Box>
      </Modal>
    </div>
  );
}
