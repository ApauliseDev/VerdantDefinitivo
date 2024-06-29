import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Mala',
  1: 'Mala',
  1.5: 'Okay',
  2: 'Okay',
  2.5: 'Buena',
  3: 'Buena',
  3.5: 'Genial',
  4: 'Genial',
  4.5: 'Legendaria',
  5: 'Legendaria',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingStars() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',   }}
    >
      <Rating
        sx={{color: "#5bd635",
          fontSize: 30
        }}
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55}} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2, color: "#5bd635", fontWeight:"bold"}}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
