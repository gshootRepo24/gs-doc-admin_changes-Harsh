import React, { useEffect } from "react";

import Switch from "@mui/material/Switch";

function AddKeywords() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
}

export default AddKeywords;
