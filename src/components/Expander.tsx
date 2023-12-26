import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VARIANTS = {
  title: 'text-2xl text-primary font-bold',
  body: 'text-lg text-gray-900 font-normal',
};

type ExpanderProps = {
  title: string;
  variant: keyof typeof VARIANTS;
  biggerSize?: boolean;
  children: JSX.Element[] | JSX.Element;
};

export default function Expander({
  title,
  variant,
  biggerSize,
  children,
}: ExpanderProps) {
  return (
    <Accordion
      sx={{ boxShadow: 'none', ':before': { display: 'none' } }}
      className={`bg-background ${biggerSize ? 'w-full' : 'w-8/12 3xl:w-1/2'}`}
      disableGutters
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="expander-content"
        id="expander-header"
      >
        <h2 className={VARIANTS[variant]}>{title}</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
