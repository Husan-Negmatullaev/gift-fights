// import { GiftBorderCard } from "@/entities/gift";

export const YourGifts = () => {
  return (
    <div>
      <h1 className="text-base mb-3">Ваши Gift’s</h1>
      <ul className="peer grid gap-3 grid-cols-2">
        {Array.from({ length: 4 }).map((_item, index) => (
          <li key={index}>
            {/* <GiftBorderCard size="lg" slug={""} title={""} price={0} /> */}
          </li>
        ))}
      </ul>
      {/* <article className="grid-cols-[1fr_auto] min-h-29.5 peer-empty:grid hidden bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% rounded-2.5xl">
        <div className="grid grid-rows-1 max-w-70 p-4">
          <h1 className="text-lg font-semibold">У вас нет ни одного Gift’s</h1>
          <button
            type="button"
            className="grid place-content-center w-full cursor-pointer min-h-8 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg">
            Пополнить инвентарь
          </button>
        </div>
        <img
          alt="froggy"
          className="h-30 place-self-end mr-8 scale-125"
          src="/assets/images/play/froggy.webp"
        />
      </article> */}
    </div>
  );
};
