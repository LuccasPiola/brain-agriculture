import { PieChart as MuiPieChart } from '@mui/x-charts';

type PieChartProps = {
  data: PieChartData[];
  title: string;
  subTitle?: string;
};

const COLOR_PALLETE = [
  '#1E4C42',
  '#976A40',
  '#1A3631',
  '#637D7A',
  '#2C5E52',
  '#8B572C',
  '#A7C4B4',
  '#000D0E',
  '#7B8C86',
  '#3A705F',
  '#48736F',
  '#D2B48C',
  '#051B1A',
  '#556F65',
  '#8CA89D',
  '#5B8A76',
  '#4F7E6A',
  '#3A6154',
  '#2F5448',
  '#6B4225',
];

export default function PieChart({ data, title, subTitle }: PieChartProps) {
  return (
    <section className="">
      <div className="mr-20">
        <h3 className="text-2xl text-center font-bold text-primary">{title}</h3>

        <h4 className="text-md text-center text-primary">
          {subTitle && `(${subTitle})`} &#8205;
        </h4>
      </div>

      <MuiPieChart
        series={[
          {
            data,
            paddingAngle: 2,
            cornerRadius: 5,
            innerRadius: 40,
            outerRadius: 110,
            highlightScope: { faded: 'global', highlighted: 'item' },
          },
        ]}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        colors={COLOR_PALLETE}
        width={400}
        height={270}
      />
    </section>
  );
}
0;
