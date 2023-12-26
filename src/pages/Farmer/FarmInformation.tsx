import WaterDamageOutlinedIcon from '@mui/icons-material/WaterDamageOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import LandscapeIcon from '@mui/icons-material/Landscape';

import Information from './Information';

type FarmInformationProps = {
  farmer: Farmer;
};

export default function FarmInformation({ farmer }: FarmInformationProps) {
  const { farmName, farmCultures, vegetableArea, usableArea, totalArea } =
    farmer;
  return (
    <>
      <h3 className="text-lg font-normal border-b-2 my-5">
        Sobre a sua fazenda
      </h3>
      <section className="flex items-center">
        <div className="flex-[1.5]">
          <Information
            icon={AgricultureOutlinedIcon}
            title="Nome"
            value={farmName}
          />
        </div>
        <div className="flex-1">
          <Information
            icon={YardOutlinedIcon}
            title="Culturas plantadas"
            value={farmCultures.join(', ')}
          />
        </div>
      </section>
      <section className="flex mt-7">
        <div className="flex-[1.5]">
          <Information
            icon={WaterDamageOutlinedIcon}
            title="Área Agriculturável"
            value={usableArea}
            addornment="ha"
          />
        </div>
        <div className="flex-1">
          <Information
            icon={ForestOutlinedIcon}
            title="Área de vegetação"
            value={vegetableArea}
            addornment="ha"
          />
        </div>
      </section>
      <section className="mt-7">
        <div className="flex-1">
          <Information
            icon={LandscapeIcon}
            title="Área total"
            value={totalArea}
            addornment="ha"
          />
        </div>
      </section>
    </>
  );
}
