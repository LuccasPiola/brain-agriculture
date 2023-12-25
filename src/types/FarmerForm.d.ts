import { UseFormReturn } from 'react-hook-form';

declare global {
  type FarmerFormFields = {
    name: string;
    document: string;
    state: string;
    city: string;
    farmName: string;
    farmCultures: string[];
    usableArea: string;
    vegetableArea: string;
    totalArea: string;
  };

  interface Farmer extends FarmerFormFields {
    id: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type UseFormType = UseFormReturn<FarmerFormFields, any, undefined>;
}

export {};
