import { Grid } from '@mui/material';
import { Input } from "../../controls";
import { useForm } from '../../useForm';

const initialFValues = {
  id: 0,
  name: '',
  usercode: '',
  username: '',
  password: '',
  role: 'root',
}

export default function FormUser() {

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.name.length > 3 ? "" : "This field is required."
    }
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    // resetForm
  } = useForm(initialFValues, true, validate);

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   if (validate()) {
  //     console.log('masuk gan')
  //     // employeeService.insertEmployee(values)
  //     resetForm()
  //   }
  // }

  return (

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input
          name="name"
          label="Nama"
          value={values.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          name="usercode"
          label="Kode User"
          value={values.mobile}
          onChange={handleInputChange}
          error={errors.mobile}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          name="username"
          label="Username"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          name="password"
          label="Password"
          value={values.city}
          onChange={handleInputChange}
          required
        />
      </Grid>
    </Grid>
  )
}