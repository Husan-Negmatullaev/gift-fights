import { GiftCheckboxCard, useGetGifts } from "@/entities/gift";
import { ProfileInformation } from "@/entities/user";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Modal } from "@/shared/ui/modal/modal";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Gift from "@/shared/assets/lottie/berrybox.json";
import { useProfileContext } from "@/entities/profile";

interface IFormInput {
  gifts: string[];
}

// const mockGifts = [
//   { id: '1', name: 'Plush Pepe', value: 10 },
//   { id: '2', name: 'Plush Pepe', value: 10 },
//   { id: '3', name: 'Plush Pepe', value: 10 },
//   { id: '4', name: 'Plush Pepe', value: 10 },
// ];

export const Inventory = () => {
  const { profile } = useProfileContext();
  const { gifts } = useGetGifts({
    take: 25,
    skip: 0,
  });
  const [open, setOpen] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>({
    values: {
      gifts: [],
    },
  });

  const handleToggleModal = () => setOpen((prev) => !prev);

  const onSubmit: SubmitHandler<IFormInput> = () => {
    handleToggleModal();
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <ProfileInformation profile={profile} />
      </div>

      <div className="grid grid-cols-2 px-6 pb-6 gap-x-2.5 gap-y-2">
        <h5 className="col-span-2 font-thin text-tiny/2.5">Ваши Gift's:</h5>

        {gifts.map((gift) => (
          <GiftCheckboxCard
            size="lg"
            key={gift.id}
            slug={gift.slug}
            title={gift.title}
            price={gift.price}
            blocked={gift.blocked}
            checkbox={register("gifts", {
              required: true,
              disabled: gift.blocked,
              // onChange: (e) => {
              //   setValue('gifts', [...getValues('gifts'), gift.id]);
              //   // console.log(e);
              // },
            })}
          />
        ))}
      </div>

      <div className="fixed w-full bottom-safe-app-bottom left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton
          withShadow
          content="Вывести"
          className="w-full"
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
        />
      </div>

      <Modal open={open} onClose={handleToggleModal}>
        <div className="mb-4 text-center">
          <h2 className="mb-2 font-medium text-lg/4.5">Вывод Gift’s</h2>
          <p className="mb-4 text-xs">Вы хотите вывести gift’s на сумму:</p>
          <span className="font-medium text-base text-blue-100">
            34,154 TON
          </span>
        </div>

        <div className="grid gap-2 justify-center grid-flow-dense auto-rows-[92px] grid-cols-[repeat(3,_92px)] mb-17">
          {getValues("gifts").map((gift) => (
            <div key={gift} className="relative pb-[69%]">
              <TouchableLottie
                animation={Gift}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-white/50 mb-4">
            Комиссия будет составлять:
          </p>
          <BottomButton
            withShadow
            content="Вывести"
            className="w-full"
            onClick={handleToggleModal}
          />
        </div>
      </Modal>
    </div>
  );
};
