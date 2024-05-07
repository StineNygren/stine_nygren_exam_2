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
  refetch: () => void;
}

export default function EditVenue({ venueId, refetch }: InfoModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {  setOpen(true); };
  const handleClose = () => setOpen(false);

  const { data: venue, isLoading} = useGetVenueQuery(venueId);


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
          <p>Loading...</p> 
        ) : (
    <CreateVenueForm onSubmit={async (data) => {
        try {
            await editVenue({ id: venueId, body: data });
            refetch();
        } catch (error) {
            console.error(error);
            // Handle the error appropriately
        }
    }} initialData={venue} isEditMode />
        )}
        </Box>        
                
        </Box>
      </Modal>
    </div>
  );
}




