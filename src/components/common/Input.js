import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

const Input = ({ item, formik, handleChange, ...rest }) => {
  const { name, type, placeholder, id, label } = item
  const isError = formik.errors[name] && formik.touched[name]

  return (
    <>
      <InputLabel htmlFor={id}>Email</InputLabel>
      <OutlinedInput
        error={isError}
        required
        id={id}
        label={label}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        {...rest}
      />
      {formik.errors[name] && formik.touched[name] && (
        <Typography variant='caption' display='block' gutterBottom xs={{ color: 'red' }}>
          {formik.errors[name]}
        </Typography>
      )}
    </>
  )
}

export default Input
