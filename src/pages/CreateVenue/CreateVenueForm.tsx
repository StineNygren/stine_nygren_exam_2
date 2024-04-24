import { Controller, useForm } from "react-hook-form";
import { Button, Grid, TextField, Rating, Typography, Box } from "@mui/material";
import { useCreateVenueMutation } from "../../services/api.reducer";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';




type FormData = {

  name: string;
  description: string;
  media: [{
    url: string;
    alt: string;
}];
  price: number;
  maxGuests: number;
  rating: number;
  meta:{
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;

  }
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;  
  }

};


function CreateVenueForm() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
const [createVenue] = useCreateVenueMutation();
    const onSubmit = async (data: FormData) => {
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    data.rating = Number(data.rating);
        try{
          const result = await createVenue(data).unwrap();
          console.log(result);
        } catch (error) {
          console.error("Failed to create the venue: ", error);
        }
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({defaultValues: {name: "", description: "", media: [{url: "", alt: ""}], price: 0, maxGuests: 0, rating: 0, meta: {wifi: false, parking: false, breakfast: false, pets: false}, location: {address: "", city: "", zip: "", country: "", continent: ""}}});
    return ( 
        <>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Box display={"flex"} flexDirection={isSmallScreen? "column" : "row"}>
        <Grid container direction={"column"} paddingX={5} width={450} >
            <Typography variant="h4">Venue</Typography>
                <Controller control={control} name="name" rules={{required: "name is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="Name" onChange={onChange} value={value}  helperText={errors.name ? errors.name.message : null} />
                }/>
                <Controller control={control} name="description" rules={{required: "description is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="Description" onChange={onChange} value={value}  helperText={errors.description ? errors.description.message : null} />
                }/>
                <Controller control={control}  name="media.0.url"   render={({ field }) => (
                <TextField {...field} label="Image URL" variant="outlined" margin="normal" fullWidth />
                )} />
                <Controller control={control} name="price" rules={{required: "price is required",min: {value: 1, message: "Price must be at least 1"}}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="number" variant="outlined" label="Price" onChange={onChange} value={value}  helperText={errors.price ? errors.price.message : null} />
                }/>
                <Controller control={control} name="maxGuests" rules={{required: "Maxguests is required", min: {value: 1, message: "Maxguests must be at least 1"}}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="number" variant="outlined" label="Maxguests" onChange={onChange} value={value}  helperText={errors.maxGuests ? errors.maxGuests.message : null} />
                }/>
                        <Typography component="legend">Rating</Typography>
        <Controller
        
            name="rating"
            control={control}
            defaultValue={0}
            
            render={({ field }) => (
                <Rating
                sx={{marginBottom: 2}}
                    name="simple-controlled"
                    value={field.value}
                    onChange={(newValue) => {
                        field.onChange(newValue);
                    }}
                />
            )} />
            <Box marginBottom={5} display={"flex"} justifyContent={"space-between"}>
            <Controller
                    control={control}
                    name="meta.wifi"
                    render={({ field: { value, onChange } }) => (
                      <Box display={"flex"} flexDirection={"column"}>
                          <RssFeedIcon/>
                          <input
                              type="checkbox"
                              checked={value || false}
                              onChange={(e) => onChange(e.target.checked)}
                          />
                      </Box>
                    )}
                    />
            <Controller
                    control={control}
                    name="meta.parking"
                    render={({ field: { value, onChange } }) => (
                      <Box display={"flex"} flexDirection={"column"}>

                          <LocalParkingIcon/>
                          <input
                              type="checkbox"
                              checked={value || false}
                              onChange={(e) => onChange(e.target.checked)}
                          />
           
                      </Box>
                    )}
                    />
            <Controller
                    control={control}
                    name="meta.breakfast"
                    render={({ field: { value, onChange } }) => (
                      <Box display={"flex"} flexDirection={"column"}>
                          <RestaurantIcon/>
                          <input
                              type="checkbox"
                              checked={value || false}
                              onChange={(e) => onChange(e.target.checked)}
                          />
                      </Box>
                    )}
                    />
            <Controller
                    control={control}
                    name="meta.pets"
                    render={({ field: { value, onChange } }) => (
                      <Box display={"flex"} flexDirection={"column"}>
                          <PetsIcon/>
                          <input
                              type="checkbox"
                              checked={value || false}
                              onChange={(e) => onChange(e.target.checked)}
                          />
                      </Box>
                    )}
                    />
            </Box>
            </Grid>
            <Grid container direction={"column"} paddingX={5} width={450}>
            <Typography variant="h4">Location</Typography>
            <Controller control={control} name="location.address" rules={{required: "adress is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="adress" onChange={onChange} value={value}  helperText={errors.location?.address ? errors.location?.address.message : null} />
                }/>
            <Controller control={control} name="location.city" rules={{required: "city is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="city" onChange={onChange} value={value}  helperText={errors.location?.city ? errors.location?.city.message : null} />
                }/>
            <Controller control={control} name="location.zip" rules={{required: "zip is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="zip" onChange={onChange} value={value}  helperText={errors.location?.zip ? errors.location?.zip.message : null} />
                }/>
            <Controller control={control} name="location.country" rules={{required: "country is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="country" onChange={onChange} value={value}  helperText={errors.location?.country ? errors.location?.country.message : null} />
                }/>
            <Controller control={control} name="location.continent" rules={{required: "continent is required"}} render={({field:{onChange, value}}) =>
                <TextField margin="normal" type="text" variant="outlined" label="continent" onChange={onChange} value={value}  helperText={errors.location?.continent ? errors.location?.continent.message : null} />
                }/>

                <Button sx={{marginTop: 2}}  type="submit" variant="contained" color="primary">Post Venue</Button>
                </Grid>
                </Box>
        </form>
        </>
     );
}

export default CreateVenueForm;