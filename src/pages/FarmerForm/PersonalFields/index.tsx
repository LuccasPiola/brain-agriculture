import * as Inputs from './fields';

type PersonalFieldsProps = {
  formHandles: UseFormType;
};

export default function PersonalFields({ formHandles }: PersonalFieldsProps) {
  return (
    <aside>
      <h3 className="text-lg font-normal border-b-2 mb-5">Sobre você</h3>
      <section className="flex">
        <Inputs.PersonName formHandles={formHandles} />
        <div className="flex justify-end flex-[2]">
          <Inputs.Document formHandles={formHandles} />
        </div>
      </section>
      <section className="mt-2 flex">
        <Inputs.State formHandles={formHandles} />
        <Inputs.City formHandles={formHandles} />
      </section>
    </aside>
  );
}
