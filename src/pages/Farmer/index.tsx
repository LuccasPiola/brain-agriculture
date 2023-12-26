import { useNavigate } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import PersonalInformation from './PersonalInformation';
import FarmInformation from './FarmInformation';
import useFarmerHandles from './hooks';

export default function Farmer() {
  const farmer = useFarmerHandles();
  const navigate = useNavigate();

  if (!farmer) return null;

  return (
    <main className="w-8/12 3xl:w-6/12 px-24 py-6">
      <section className="mb-12 flex justify-between">
        <div className="flex items-center">
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => navigate('/produtores')}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <h2 className="text-2xl text-primary font-bold">
            Informações do produtor
          </h2>
        </div>
        <Button
          size="medium"
          variant="text"
          color="primary"
          onClick={() => navigate(`/produtores/${farmer.id}/editar`)}
        >
          Editar
        </Button>
      </section>

      <aside>
        <PersonalInformation farmer={farmer} />
        <FarmInformation farmer={farmer} />
      </aside>
    </main>
  );
}
