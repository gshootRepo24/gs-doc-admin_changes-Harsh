import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarButton = () => {
  const [filled, setFilled] = useState(false);

  const handleStarClick = () => {
    setFilled(!filled);
  };

  return (
    <IconButton onClick={handleStarClick}>
      {filled ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default StarButton;
