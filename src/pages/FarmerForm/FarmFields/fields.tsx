import { Controller } from 'react-hook-form';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextField,
} from '@mui/material';
import YardIcon from '@mui/icons-material/Yard';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';

const FARM_CULTURES = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana'];

type HandleCheckboxBody = {
  checked: boolean;
  farmCulture: string;
};

type FieldProps = {
  formHandles: UseFormType;
};

const FarmName = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;
  return (
    <Controller
      name="farmName"
      control={control}
      rules={{
        required: { value: true, message: 'Campo obrigatório' },
        minLength: { value: 3, message: 'Mínimo de 3 caracteres' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          id="farmName"
          label="Nome"
          placeholder="Nome da sua fazenda"
          size="medium"
          className="flex-1"
          error={!!errors.farmName}
          helperText={errors.farmName?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

const FarmCultures = ({ formHandles }: FieldProps) => {
  const { setValue, watch } = formHandles;
  const formFarmCultures = watch('farmCultures');

  const handleCulturesCheckboxClick = (body: HandleCheckboxBody) => {
    const { checked, farmCulture } = body;
    const oldFarmCultures = formFarmCultures || [];
    let newFarmCultures: string[] = [];

    if (checked) newFarmCultures = [...oldFarmCultures, farmCulture];
    else
      newFarmCultures = oldFarmCultures.filter(
        (oldFarmCulture) => oldFarmCulture !== farmCulture
      );

    setValue('farmCultures', newFarmCultures, { shouldDirty: true });
  };

  return (
    <FormGroup className="flex flex-row flex-[1.5] ml-5 items-center mb-5">
      <h4 className="mr-3">Eu planto:</h4>
      <div>
        {FARM_CULTURES.map((farmCulture) => (
          <FormControlLabel
            key={farmCulture}
            control={
              <Checkbox
                icon={<YardOutlinedIcon />}
                checkedIcon={<YardIcon />}
                color="success"
                onChange={(_, checked) =>
                  handleCulturesCheckboxClick({ farmCulture, checked })
                }
                checked={formFarmCultures.includes(farmCulture)}
              />
            }
            label={farmCulture}
          />
        ))}
      </div>
    </FormGroup>
  );
};

const UsableArea = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;

  return (
    <Controller
      name="usableArea"
      control={control}
      rules={{
        required: { value: true, message: 'Campo obrigatório' },
        min: { value: 1, message: 'Digite um valor maior do que 0' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          type="number"
          id="usableArea"
          label="Área agriculturável em hectares"
          placeholder="Área agriculturável"
          InputProps={{
            endAdornment: <InputAdornment position="end">ha</InputAdornment>,
          }}
          InputLabelProps={{ shrink: true }}
          size="medium"
          className="flex-1 mr-2"
          error={!!errors.usableArea}
          helperText={errors.usableArea?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

const VegetableArea = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;

  return (
    <Controller
      name="vegetableArea"
      control={control}
      rules={{
        required: { value: true, message: 'Campo obrigatório' },
        min: { value: 1, message: 'Digite um valor maior do que 0' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          type="number"
          id="vegetableArea"
          label="Área de vegetação em hectares"
          placeholder="Área de vegetação"
          InputProps={{
            endAdornment: <InputAdornment position="end">ha</InputAdornment>,
          }}
          InputLabelProps={{ shrink: true }}
          size="medium"
          className="flex-1 mr-2"
          error={!!errors.vegetableArea}
          helperText={errors.vegetableArea?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

const TotalArea = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
    watch,
  } = formHandles;

  const usableAreaFormValue = Number(watch('usableArea'));
  const vegetableAreaFormValue = Number(watch('vegetableArea'));

  return (
    <Controller
      name="totalArea"
      control={control}
      rules={{
        validate: (value) =>
          Number(value) >= usableAreaFormValue + vegetableAreaFormValue ||
          'A área agriculturável somada a área de vegetação excedem o valor da área total',
        min: { value: 1, message: 'Digite um valor maior do que 0' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          type="number"
          id="totalArea"
          label="Área total em hectares"
          placeholder="Área total"
          InputProps={{
            endAdornment: <InputAdornment position="end">ha</InputAdornment>,
          }}
          InputLabelProps={{ shrink: true }}
          size="medium"
          className="flex-1"
          error={!!errors.totalArea}
          helperText={errors.totalArea?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

export { FarmName, FarmCultures, UsableArea, VegetableArea, TotalArea };
