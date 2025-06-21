import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { Input } from '@/shared/ui/input/input';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { GiftsForBetting } from '@/features/gifts-for-betting';
import { useForm, type SubmitHandler } from 'react-hook-form';

type CreateLobbyFormProps = {
  className?: string;
};

interface IFormInput {
  gifts: number[];
}

export const CreateLobbyForm = (props: CreateLobbyFormProps) => {
  const { className } = props;

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

  return (
    <form className={className}>
      <div className="grid gap-3 mb-8">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Введите число"
          label="Минимальная ставка TON"
          right={<Toggle variant="ordinary" />}
        />
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Введите число"
          label="Максимальная ставка TON"
          right={<Toggle variant="ordinary" />}
        />
      </div>

      <GiftsForBetting checkbox={register('gifts', { required: true })} />

      <div className="fixed w-full bottom-21 left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton
          withShadow
          className="w-full"
          disabled={!isDirty}
          content="Создать лобби"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};
