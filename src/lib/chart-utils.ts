export const allFarmsTotalAreaSum = (farmers: Farmer[]) =>
  farmers.reduce((sum, farmer) => sum + Number(farmer.totalArea), 0);

export const producersByState = (farmers: Farmer[]): PieChartData[] => {
  const counts: Record<string, number> = {};

  farmers.forEach(({ state }) => {
    counts[state] = (counts[state] || 0) + 1;
  });

  const producers = Object.keys(counts).map((state, index) => ({
    id: index,
    value: counts[state],
    label: state,
  }));

  return producers;
};

export const plantedCultures = (farmers: Farmer[]): PieChartData[] => {
  const counts: Record<string, number> = {};

  farmers.forEach(({ farmCultures }) => {
    farmCultures.forEach((farmCulture) => {
      counts[farmCulture] = (counts[farmCulture] || 0) + 1;
    });
  });

  const plantedCultures = Object.keys(counts).map((culture, index) => ({
    id: index,
    label: culture,
    value: counts[culture],
  }));

  return plantedCultures;
};

export const soilUse = (farmers: Farmer[]): PieChartData[] => {
  const initialAreas: PieChartData[] = [
    { id: 0, label: 'Área agriculturável', value: 0 },
    { id: 1, label: 'Área de vegetação', value: 0 },
  ];

  const soiUsage = farmers.reduce((array, farmer) => {
    const { usableArea, vegetableArea } = farmer;

    const arrayUsableArea = array[0];
    const arrayVegetableArea = array[1];

    array[0] = {
      ...arrayUsableArea,
      value: arrayUsableArea.value + Number(usableArea),
    };
    array[1] = {
      ...arrayVegetableArea,
      value: arrayVegetableArea.value + Number(vegetableArea),
    };

    return array;
  }, initialAreas);

  return soiUsage;
};
