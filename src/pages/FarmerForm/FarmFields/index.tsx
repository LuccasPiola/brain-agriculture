import * as Inputs from './fields';

type FarmFieldsProps = {
  formHandles: UseFormType;
};

export default function FarmFields({ formHandles }: FarmFieldsProps) {
  return (
    <aside>
      <h3 className="text-lg font-normal border-b-2 mt-2 mb-5">
        Sobre a sua fazenda
      </h3>
      <section className="flex items-center">
        <Inputs.FarmName formHandles={formHandles} />
        <Inputs.FarmCultures formHandles={formHandles} />
      </section>

      <section className="flex mt-5 mb-12">
        <Inputs.UsableArea formHandles={formHandles} />
        <Inputs.VegetableArea formHandles={formHandles} />
        <Inputs.TotalArea formHandles={formHandles} />
      </section>
    </aside>
  );
}
