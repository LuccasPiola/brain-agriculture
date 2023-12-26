import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';

import PersonalFields from './PersonalFields';
import useFarmerFormHandles from './hooks';
import FarmFields from './FarmFields';

export default function FarmerForm() {
  const {
    headerText,
    onSubmit,
    handleSubmit,
    formHandles,
    navigate,
    farmerIdParam,
    loading,
  } = useFarmerFormHandles();

  const {
    formState: { isDirty, isValid },
  } = formHandles;

  return (
    <main className="w-8/12 3xl:w-1/2 px-24 py-6">
      <section className="mb-12 flex items-center">
        <IconButton
          aria-label="back"
          size="medium"
          onClick={() => navigate('/produtores/' + (farmerIdParam || ''))}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <h2 className="text-2xl text-primary font-bold">
          {headerText} Produtor
        </h2>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <PersonalFields formHandles={formHandles} />
        <FarmFields formHandles={formHandles} />

        <LoadingButton
          loading={loading}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Finalizar
        </LoadingButton>
      </form>
    </main>
  );
}
