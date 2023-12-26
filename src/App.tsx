import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { fetchFarmersThunk } from '@/store/farmers/actions';
import { useAppDispatch } from '@/store/hooks';
import Menu from '@/components/Menu';

import RouteHandler from './routes';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFarmersThunk());
  }, [dispatch]);

  return (
    <Box className="flex">
      <Menu />
      <RouteHandler />
    </Box>
  );
}
