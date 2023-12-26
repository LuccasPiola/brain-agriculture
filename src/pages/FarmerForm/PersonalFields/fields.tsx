import { cpf, cnpj } from 'cpf-cnpj-validator';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { BRAZIL_STATES, INPUT_MASKS } from '@/lib/input-utils';
import { useAppSelector } from '@/store/hooks';
import { selectFarmersDocument } from '@/store/farmers/slice';

type FieldProps = {
  formHandles: UseFormType;
};

const PersonName = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;

  return (
    <Controller
      name="name"
      control={control}
      rules={{
        required: { value: true, message: 'Campo obrigatório' },
        minLength: { value: 6, message: 'Mínimo de 6 caracteres' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          id="name"
          label="Nome"
          placeholder="Nome do produtor"
          size="medium"
          className="flex-[1.9]"
          error={!!errors.name}
          helperText={errors.name?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

const Document = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
    resetField,
    getFieldState,
    watch,
  } = formHandles;
  const documentFormValue = watch('document');
  const documentIsCNPJ = documentFormValue.includes('/');
  const farmerDocuments = useAppSelector(selectFarmersDocument);

  const [personType, setPersonType] = useState<'cpf' | 'cnpj'>(
    documentIsCNPJ ? 'cnpj' : 'cpf'
  );

  const handlePersonTypeChange = (personType: 'cpf' | 'cnpj') => {
    resetField('document');
    setPersonType(personType);
  };

  return (
    <div className="flex items-start">
      <Controller
        name="document"
        control={control}
        rules={{
          validate: {
            documentIsValid: (value) =>
              personType === 'cpf'
                ? cpf.isValid(value) || 'CPF inválido'
                : cnpj.isValid(value) || 'CNPJ inválido',
            notRepeated: (value) => {
              const { isDirty } = getFieldState('document');
              if (!isDirty) return true;
              return (
                !farmerDocuments.includes(value) || 'Documento já cadastrado'
              );
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { ref, ...field } }) => (
          <MaskedInput
            {...field}
            mask={INPUT_MASKS[personType]}
            guide={false}
            render={(ref, props) => (
              <TextField
                {...props}
                id={personType}
                label={personType.toUpperCase()}
                placeholder={`Seu ${personType.toUpperCase()}`}
                size="medium"
                className="mr-5"
                error={!!errors.document}
                helperText={errors.document?.message || ' '}
                inputRef={ref}
                InputLabelProps={{ shrink: !!documentFormValue }}
              />
            )}
          />
        )}
      />
      <RadioGroup row name="person-type-selection">
        <FormControlLabel
          className="pt-2"
          value="cpf"
          control={
            <Radio
              checked={personType === 'cpf'}
              onChange={() => handlePersonTypeChange('cpf')}
            />
          }
          label="CPF"
        />
        <FormControlLabel
          className="pt-2"
          value="cnpj"
          control={
            <Radio
              checked={personType === 'cnpj'}
              onChange={() => handlePersonTypeChange('cnpj')}
            />
          }
          label="CNPJ"
        />
      </RadioGroup>
    </div>
  );
};

const State = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;
  return (
    <Controller
      name="state"
      control={control}
      rules={{ required: { value: true, message: 'Campo obrigatório' } }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          select
          id="state"
          label="Estado"
          SelectProps={{ MenuProps: { style: { maxHeight: 500 } } }}
          className="flex-1"
          error={!!errors.state}
          helperText={errors.state?.message || ' '}
          defaultValue=""
          inputRef={ref}
        >
          {BRAZIL_STATES.map((state) => (
            <MenuItem key={state.value} value={state.value}>
              {state.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

const City = ({ formHandles }: FieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHandles;
  return (
    <Controller
      name="city"
      control={control}
      rules={{
        required: { value: true, message: 'Campo obrigatório' },
        minLength: { value: 6, message: 'Mínimo de 6 caracteres' },
      }}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          id="city"
          label="Cidade"
          placeholder="Cidade onde reside"
          size="medium"
          className="flex-[2] ml-2"
          error={!!errors.city}
          helperText={errors.city?.message || ' '}
          inputRef={ref}
        />
      )}
    />
  );
};

export { PersonName, Document, State, City };
