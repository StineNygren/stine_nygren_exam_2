import { Box, Button } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";

interface MediaItem {
    url: string;
    alt: string;
  }
  
  function Carousel({ media }: { media: MediaItem[] }) {
    const [index, setIndex] = useState(0);
  
    const handleRight = () => {
      if (index < media.length - 1) {
        setIndex(index + 1);
      }
    }
  
    const handleLeft = () => {
      if (index > 0) {
        setIndex(index - 1);
      }
    }
  

    return (
      <Box>
        <Box
          component="img"
          src={media && media[index] ? media[index].url : "https://via.placeholder.com/1800"}
          alt={media && media[index] ? media[index].alt : "Placeholder image"}
          sx={{
            height: '400px',
            objectFit: 'cover',
            width: '100%',

          }}
        />
        {media.length > 1 && (
          <Box display={"flex"} justifyContent={"center"}>
            <Button disabled={index === 0} onClick={handleLeft}><KeyboardArrowLeftIcon /></Button>
            <Button disabled={index >= media.length - 1} onClick={handleRight}><KeyboardArrowRightIcon /></Button>
          </Box>
        )}
      </Box>
    );
  }

export default Carousel;