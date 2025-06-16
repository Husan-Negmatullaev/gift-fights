import { GiftsForBetting } from '@/features/gifts-for-betting';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { Input } from '@/shared/ui/input/input';
import { Toggle } from '@/shared/ui/toggle/toggle';

export const CreateLobby = () => {
  return (
    <section className="px-6 pb-22 pt-4.5 relative">
      <h1 className="font-bold text-xl text-white mb-7">Создание лобби</h1>

      <form className="grid gap-3 mb-8">
        <Input
          type="number"
          right={<Toggle />}
          inputMode="numeric"
          placeholder="Введите число"
          label="Минимальная ставка TON"
        />
        <Input
          type="number"
          right={<Toggle />}
          inputMode="numeric"
          placeholder="Введите число"
          label="Максимальная ставка TON"
        />
      </form>

      <GiftsForBetting />

      <div className="fixed w-full bottom-21 left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton content="Создать лобби" className="w-full " />
      </div>
    </section>
  );
};
