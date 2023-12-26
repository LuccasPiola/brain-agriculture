import Information from './Information';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

type PersonalInformationProps = {
  farmer: Farmer;
};

export default function PersonalInformation({
  farmer,
}: PersonalInformationProps) {
  const { name, document, state, city } = farmer;
  const documentIsCNPJ = document.includes('/');

  return (
    <>
      <h3 className="text-lg font-normal border-b-2 mb-5">Sobre você</h3>
      <section className="flex">
        <div className="flex-[1.5]">
          <Information
            icon={PersonOutlineOutlinedIcon}
            title="Nome"
            value={name}
          />
        </div>
        <div className="flex flex-col justify-end flex-1">
          <Information
            icon={ArticleOutlinedIcon}
            title={documentIsCNPJ ? 'CNPJ' : 'CPF'}
            value={document}
          />
        </div>
      </section>
      <section className="flex mt-7">
        <div className="flex-[1.5]">
          <Information
            icon={LocationOnOutlinedIcon}
            title="Estado"
            value={state}
          />
        </div>
        <div className="flex-1">
          <Information
            icon={ApartmentOutlinedIcon}
            title="Cidade"
            value={city}
          />
        </div>
      </section>
    </>
  );
}
