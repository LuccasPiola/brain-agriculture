import { useNavigate } from 'react-router-dom';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { selectFarmers } from '@/store/farmers/slice';
import FarmerItem from '@/components/FarmerItem';
import { useAppSelector } from '@/store/hooks';

export default function Produtores() {
  const navigate = useNavigate();
  const { data: farmers } = useAppSelector(selectFarmers);

  return (
    <main className="w-10/12 px-24 py-6 bg-background">
      <section className="w-8/12 3xl:w-1/2">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl text-primary font-bold">Produtores</h2>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            startIcon={<PersonAddAltIcon />}
            onClick={() => navigate('/produtores/cadastrar')}
          >
            Cadastrar
          </Button>
        </div>
        <Stack spacing={2} className="h-screen overflow-auto">
          {farmers.map((farmer) => (
            <FarmerItem key={farmer.id} name={farmer.name} id={farmer.id} />
          ))}
        </Stack>
      </section>
    </main>
  );
}
