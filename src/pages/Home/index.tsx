import { useMemo } from 'react';

import InformationCard from '@/components/InformationCard';
import { selectFarmers } from '@/store/farmers/slice';
import * as ChartUtils from '@/lib/chart-utils';
import { useAppSelector } from '@/store/hooks';
import Expander from '@/components/Expander';
import PieChart from '@/components/PieChart';

export default function HomePage() {
  const { data: farmers } = useAppSelector(selectFarmers);
  const computedInformation = useMemo(
    () => ({
      totalAreaSum: ChartUtils.allFarmsTotalAreaSum(farmers),
      producersByState: ChartUtils.producersByState(farmers),
      plantedCultures: ChartUtils.plantedCultures(farmers),
      soilUsage: ChartUtils.soilUse(farmers),
    }),
    [farmers]
  );

  return (
    <main className="w-10/12 overflow-hidden bg-background px-12">
      <Expander title="Seu resumo geral" variant="title">
        <div className="flex justify-between">
          <InformationCard
            variant="primary"
            information={{
              title: 'Quantidade total de fazendas',
              text: farmers.length.toString(),
              image: 'assets/farm.jpg',
            }}
          />
          <InformationCard
            variant="secondary"
            information={{
              title: 'Quantidade total de hectares',
              text: computedInformation.totalAreaSum.toString(),
              image: 'assets/hectare.jpg',
            }}
          />
        </div>
      </Expander>

      {farmers.length > 0 && (
        <Expander title="Gráficos" variant="title" biggerSize>
          <div className="flex justify-start mt-5 bg-background p-5 h-[380px]">
            <PieChart
              data={computedInformation.producersByState}
              title="Produtores por estado"
            />
            <PieChart
              data={computedInformation.plantedCultures}
              title="Culturas plantadas"
              subTitle="Por produtores"
            />
            <PieChart
              data={computedInformation.soilUsage}
              title="Uso de solo"
              subTitle="Por hectares"
            />
          </div>
        </Expander>
      )}
    </main>
  );
}
