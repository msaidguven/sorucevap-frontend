import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {


  const [categorys, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/category")
      .then(response => setCategory(response.data))
      .catch(error => console.log({ error }));
  }, []);


  const options = categorys.map((option) => {
    const firstLetter = option.categoryName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete margin="dense" id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      //groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.categoryName}
      renderInput={(params) => <TextField {...params} label="Categories" />}
    />
  );
}

