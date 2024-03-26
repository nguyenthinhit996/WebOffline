"use client";

import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const SelectInput = ({ items, value, handleChange }) => {
  return (
    <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="simple-select-standard-label"
        id="simple-select-standard"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {items?.length > 0 &&
          items.map((item) => {
            return (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
