import { GiftCheckboxCard } from '@/entities/gift';
import { ProfileInformation } from '@/entities/user';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { Modal } from '@/shared/ui/modal/modal';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  gifts: number[];
}

const mockGifts = [
  { id: '1', name: 'Plush Pepe', value: 10 },
  { id: '2', name: 'Plush Pepe', value: 10 },
  { id: '3', name: 'Plush Pepe', value: 10 },
  { id: '4', name: 'Plush Pepe', value: 10 },
];

export const Inventory = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>({
    values: {
      gifts: [],
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const handleToggleModal = () => setOpen((prev) => !prev);

  const [open, setOpen] = useState(false);

  return (
    <div className="pb-16">
      <div className="mb-6">
        <ProfileInformation />
      </div>

      <div className="grid grid-cols-2 px-6 pb-6 gap-x-2.5 gap-y-2">
        <h5 className="col-span-2 font-thin text-tiny/2.5">Ваши Gift's:</h5>

        {mockGifts.map((gift) => (
          <GiftCheckboxCard
            size="lg"
            key={gift.id}
            checkbox={register('gifts', { required: true })}
          />
        ))}
      </div>

      <div className="fixed w-full bottom-21 left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton
          withShadow
          content="Вывести"
          className="w-full"
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
        />
      </div>

      <Modal open={open} onClose={handleToggleModal}>
        <div className="mb-4">
          <h2 className="mb-2">Вывод Gift’s</h2>
          <p className="mb-4">Вы хотите вывести gift’s на сумму:</p>
          <span className="font-medium text-base text-blue-100">
            34,154 TON
          </span>
        </div>
      </Modal>
    </div>
  );
};
