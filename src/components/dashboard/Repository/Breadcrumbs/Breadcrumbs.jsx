import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useState } from 'react';

export default function BasicBreadcrumbs({isFileOpen, setFileOpen ,breadcrumbs, setBreadcrumbs, lookInsideId, setLookInsideId }) {

  const handleClick = (event, breadcrumb, index) => {
    event.preventDefault();
    console.info(`You clicked on breadcrumb ${breadcrumb.name} with index ${breadcrumb.index}.`);

    if (index === 0) {
      setFileOpen(true);
    }

    setLookInsideId(breadcrumb.index)

    const updatedBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(updatedBreadcrumbs);
  };

  return (
    <div role="presentation">
      <Breadcrumbs separator={<Typography variant="body1" style={{ fontWeight: 1000 }}>{" >> "}</Typography>} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href={`/${breadcrumb.name}`}
            onClick={(event) => handleClick(event, breadcrumb, index)}
          >
            {breadcrumb.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
