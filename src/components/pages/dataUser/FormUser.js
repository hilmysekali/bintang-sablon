import * as React from 'react';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { ColorInput, Input, Select } from '../../controls';
import { api } from '../../../config/api';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../../features/notificationSlice';

const validation = {
  usercode: {
    required: 'Kode User harus di isi!',
    minLength: {
      value: 3,
      message: 'Minimal 3 Karakter!'
    },
    maxLength: {
      value: 10,
      message: 'Maksimal 10 Karakter!'
    }
  },
  name: {
    required: 'Nama harus di isi!',
    minLength: {
      value: 3,
      message: 'Minimal 3 Karakter!'
    },
    maxLength: {
      value: 50,
      message: 'Nama terlalu panjang!'
    }
  },
  username: {
    required: 'Username harus di isi!',
    minLength: {
      value: 3,
      message: 'Minimal 3 Karakter!'
    },
    maxLength: {
      value: 50,
      message: 'Username terlalu panjang!'
    }
  },
  password: {
    required: 'Password harus di isi!',
    minLength: {
      value: 8,
      message: 'Minimal 8 Karakter!'
    },
    maxLength: {
      value: 50,
      message: 'Password terlalu panjang!'
    }
  },
  role: {
    required: 'Role harus di isi!',
  },
}

const roleItems = [
  { id: 'customer_service', name: 'Customer Service' },
  { id: 'admin_produksi', name: 'Admin Produksi' },
  { id: 'desainer', name: 'Desainer' },
  { id: 'owner', name: 'Owner' },
]

export const FormUser = props => {

  const { control, register, preview, setPreview, errors, setValue, id, jenis, setModal } = props;
  const dispatch = useDispatch();

  const handleChangeImage = props => {
    if (props.length === 0) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(props[0])
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await api().get(`api/user/${id}`).then((e) => {
          if (e.status === 200) {
            const users = e.data;
            setValue('usercode', users.usercode);
            setValue('name', users.name);
            setValue('username', users.username);
            setValue('color', users.color);
            setValue('role', users.role);
            if (users.photo) {
              setPreview('http://localhost:8000/images/photos/' + users.photo)
            }
          } else {
            setModal({
              id: null,
              jenis: null,
              title: null
            })
            dispatch(
              setNotification(
                {
                  snackbarOpen: true,
                  snackbarType: "error",
                  snackbarMessage: "Gagal! Silahkan Coba Lagi!"
                }
              ));
          }
        }).catch((error) => {
          setModal({
            id: null,
            jenis: null,
            title: null
          })
          dispatch(
            setNotification(
              {
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage: "Gagal! Silahkan Coba Lagi!"
              }
            ));
        })
      }
      fetchData();
    }
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Input
          rules={validation.usercode}
          name={"usercode"}
          control={control}
          label={"Kode User"}
          defaultValue={""}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          rules={validation.name}
          name={"name"}
          control={control}
          label={"Nama"}
          defaultValue={""}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          rules={validation.username}
          name={"username"}
          control={control}
          label={"Username"}
          defaultValue={""}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          rules={jenis === 'add' ? validation.password : { required: false }}
          name={"password"}
          control={control}
          label={jenis === 'add' ? "Password" : 'Biarkan Kosong jika tidak diubah'}
          defaultValue={""}
        />
      </Grid>
      <Grid item xs={6}>
        <ColorInput
          name={'color'}
          control={control}
          defaultValue={"#000000"}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          name={'role'}
          control={control}
          label={'Role'}
          options={roleItems}
          rules={validation.role}
          defaultValue={""}
        />
      </Grid>
      <Grid item xs={12} sx={{ pt: 5, textAlign: '-webkit-center' }}>
        <Avatar src={preview ? preview : ''} sx={{ width: 100, height: 100 }} />
        <Typography sx={{ pt: 2, color: 'red' }}>{errors.photo ? errors.photo.message[0] : ''}</Typography>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
        <Button color="primary" aria-label="upload picture" component="label" endIcon={<PhotoCamera />}>
          Pilih Foto Profile
          <input {...register("photo", {
            onChange: (e) => { handleChangeImage(e.target.files) },
          })} hidden accept="image/*" type="file" />
        </Button>
      </Grid>
    </Grid>
  )
}