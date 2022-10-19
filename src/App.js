import * as React from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/authSlice';
import { Loading } from './components/Layout/Loading';
import RequireAuth from './components/RequireAuth';
import CustomizedSnackbars from './components/Layout/Notification';
import Login from './pages/Login';
import Initial from './pages/Initial';
import DataUser from './pages/DataUser';
import Dashboard from './pages/Dashboard';
import Rekap from './pages/Rekap';
import Antrian from './pages/Antrian';
import Pendapatan from './pages/Pendapatan';
import SedangDikerjakan from './pages/SedangDikerjakan';
import Pencapaian from './pages/Pencapaian';
import Pengaturan from './pages/Pengaturan';
import Checkout from './pages/Checkout';
import { NotFound, Refused } from './pages/ErrorPage';
import './index.css';
import ToLogin from './pages/ToLogin';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  React.useEffect(() => {
    document.title = `${process.env.REACT_APP_SITE_TITLE}`;
    if (!user) {
      dispatch(getMe());
    }

    // Check LocalStorage size;
  }, [dispatch, user]);

  return (
    <>
      <Loading />
      <CustomizedSnackbars />
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/refused" element={<Refused />} />
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Initial />} />

            {/* ROLE BASED */}
            {/* Owner, Customer Service */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pendapatan" element={<Pendapatan />} />
            {/* add Root */}
            <Route path="/rekap" element={<Rekap />} />

            {/* Customer Service, Desainer, Admin Produksi, Root */}
            <Route path="/antrian" element={<Antrian />} />

            {/* Desainer & Admin Produksi */}
            <Route path="/my-project" element={<SedangDikerjakan />} />
            {/* Add Owner */}
            <Route path="/pencapaian" element={<Pencapaian />} />

            {/* Owner only */}
            <Route path="/pengaturan" element={<Pengaturan />} />
            <Route path="/data_user" element={<DataUser />} />

            {/* CS only */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='*' element={<ToLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
