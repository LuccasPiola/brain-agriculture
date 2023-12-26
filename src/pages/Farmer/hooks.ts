import { useParams, redirect } from 'react-router-dom';

import { selectFarmer } from '@/store/farmers/slice';
import { useAppSelector } from '@/store/hooks';

const useFarmerHandles = () => {
  const { farmerId } = useParams<{ farmerId: string }>();
  const farmer = useAppSelector((state) =>
    selectFarmer(state, Number(farmerId))
  );

  if (!farmerId) {
    redirect('/produtores');
    return null;
  }

  if (!farmer) {
    redirect('/produtores');
    return null;
  }

  return farmer;
};

export default useFarmerHandles;
