import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { createFarmerThunk, editFarmerThunk } from '@/store/farmers/actions';
import { selectFarmer, selectFarmers } from '@/store/farmers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const BLANK_FARMER: FarmerFormFields = {
  name: '',
  document: '',
  state: '',
  city: '',
  farmName: '',
  farmCultures: [],
  usableArea: '',
  vegetableArea: '',
  totalArea: '',
};

const useFarmerFormHandles = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { farmerId: farmerIdParam } = useParams<string>();
  const { loading } = useAppSelector(selectFarmers);
  const oldFarmerValues = useAppSelector((state) =>
    selectFarmer(state, Number(farmerIdParam))
  );

  const farmerDefaultValues = useMemo(() => {
    if (!farmerIdParam) return BLANK_FARMER;
    if (!oldFarmerValues) return BLANK_FARMER;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...farmerValues } = oldFarmerValues;
    return farmerValues;
  }, [farmerIdParam, oldFarmerValues]);

  const formHandles = useForm<FarmerFormFields>({
    mode: 'onTouched',
    defaultValues: farmerDefaultValues,
  });

  const { handleSubmit, reset } = formHandles;

  const headerText = !farmerIdParam ? 'Cadastrar' : 'Editar';

  const onSubmit: SubmitHandler<FarmerFormFields> = async (data) => {
    if (!farmerIdParam) {
      const createdFarmer = (await dispatch(createFarmerThunk(data)))
        .payload as Farmer;
      return navigate('/produtores/' + createdFarmer.id);
    }

    const updatedFarmer = (
      await dispatch(editFarmerThunk({ id: Number(farmerIdParam), ...data }))
    ).payload as Farmer;
    return navigate('/produtores/' + updatedFarmer.id);
  };

  useEffect(() => {
    reset(farmerDefaultValues);
  }, [farmerDefaultValues, reset]);

  return {
    handleSubmit,
    headerText,
    onSubmit,
    formHandles,
    navigate,
    farmerIdParam,
    loading,
  };
};

export default useFarmerFormHandles;
