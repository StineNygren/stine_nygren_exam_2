import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEditVenueMutation } from "../../services/api.reducer";
import CreateVenueForm from "../CreateVenue/CreateVenueForm";
import EditIcon from '@mui/icons-material/Edit';
import { useGetVenueQuery } from '../../services/api.reducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 5000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface InfoModalProps {
  venueId: string;
}

export default function EditVenue({ venueId }: InfoModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {  setOpen(true); };
  const handleClose = () => setOpen(false);

  const { data: venue, isLoading} = useGetVenueQuery(venueId);
  //console.log(venue)
    
    //   const isLoading = false;

// const venue = {
//     "name": "Soria Moria 3",
//     "description": "Kollektiv hus i et gammelt hus fra 1933",
//     "media": [
//       {
//         "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "alt": ""
//       }
//     ],
//     "price": 2500,
//     "maxGuests": 10,
//     "rating": 2,
//     "meta": {
//       "wifi": true,
//       "parking": false,
//       "breakfast": true,
//       "pets": false
//     },
//     "location": {
//       "address": "Adresseveien 22",
//       "city": "Oslo",
//       "zip": "string",
//       "country": "Norway",
//       "continent": "string",
//       "lat": 0,
//       "lng": 0
//     }
//   }




  const [editVenue] = useEditVenueMutation();




  return (
    <div>

      <Button variant="text" color="secondary" onClick={handleOpen}><EditIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <h1>Edit Venue</h1>
        {isLoading ? (
          <p>Loading...</p> // Replace this with a loading spinner if you want
        ) : (
          <CreateVenueForm onSubmit={(data) => editVenue({ id: venueId, body: data })} initialData={venue} isEditMode />
        )}
        </Box>        
                
        </Box>
      </Modal>
    </div>
  );
}




