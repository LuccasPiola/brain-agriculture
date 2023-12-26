import AgricultureIcon from '@mui/icons-material/Agriculture';
import Box from '@mui/material/Box';

const VARIANTS = {
  primary: {
    boxClasses: 'bg-primary',
    textClasses: 'text-white',
  },
  secondary: {
    boxClasses: 'bg-secondary',
    textClasses: 'text-primary',
  },
};

type InformationCardProps = {
  variant: keyof typeof VARIANTS;
  information: {
    title: string;
    text: string;
    image: string;
  };
};

export default function InformationCard({
  variant,
  information,
}: InformationCardProps) {
  const { title, text, image } = information;
  const { boxClasses, textClasses } = VARIANTS[variant];

  return (
    <Box className={`pb-2 rounded-xl w-[335px] ${boxClasses}`}>
      <div
        className="bg-cover bg-center w-full h-40 rounded-md"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <h3 className={`text-xl font-medium text-center mt-3 ${textClasses}`}>
        {title}
      </h3>
      <h4
        className={`flex items-center justify-center text-xl font-bold 
        text-center mt-2 relative ${textClasses}`}
      >
        {text}
        {variant === 'secondary' ? (
          <span className="text-sm mt-1 ml-[2px]">ha</span>
        ) : (
          <AgricultureIcon
            fontSize="small"
            htmlColor="white"
            className="ml-1"
          />
        )}
      </h4>
    </Box>
  );
}
