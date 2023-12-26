import type { OverridableComponent } from '@mui/types';
import type { SvgIconTypeMap } from '@mui/material';

type InformationProps = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  title: string;
  value: string | number;
  addornment?: string;
};

export default function Information({
  icon: Icon,
  title,
  value,
  addornment,
}: InformationProps) {
  return (
    <>
      <h4 className="font-bold flex items-center text-primary text-lg">
        <Icon fontSize="small" className="mr-1" />
        {title}
      </h4>
      <p className="ml-6 text-lg">
        {value} {addornment && <span className="text-sm">{addornment}</span>}
      </p>
    </>
  );
}
