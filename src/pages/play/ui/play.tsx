import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Link } from "react-router";
import Cap from "@/shared/assets/lottie/cap.json";

export const Play = () => {
  return (
    <section className="px-3 py-8 grid gap-9">
      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="octopus"
            src="/assets/images/play/octopus.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Подключайтесь к лобби и обыгрывайте их !
          </h2>
          <div className="flex items-center justify-between gap-4 relative mb-1.5">
            <p className="max-w-51 font-thin text-tiny/3 text-white/50">
              Вы подключаетесь уже к готовому лобби в котором уже кто то есть
            </p>

            <Link
              to="/active-lobby"
              className="grid place-content-center basis-29 cursor-pointer min-h-7.5 px-3 bg-dark-blue-350 text-blue-100 text-xs/3.5 font-medium rounded-lg"
            >
              Мои битвы
            </Link>
          </div>
          <Link
            to="/join-lobby"
            className="grid place-content-center w-full cursor-pointer min-h-10 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg"
          >
            Подключиться
          </Link>
        </div>
        <img
          alt="telegram cap"
          className="pointer-events-none h-52 absolute -top-21 -right-2"
          src="/assets/images/play/froggy.webp"
        />
      </article>

      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="to the moon rocket"
            src="/assets/images/play/to-the-moon-rocket.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Создайте свое лобби и побеждайте !
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-tiny/3 text-white/50">
              Вы создаете новое лобби к которому будут подключаться остальные
              игроки
            </p>

            <Link
              to="/create-lobby"
              className="grid place-items-center basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg"
            >
              Создать
            </Link>
          </div>
        </div>
        <TouchableLottie
          style={{
            top: -54,
            right: -178,
          }}
          animation={Cap}
          className="pointer-events-none h-52 absolute -top-13.5 -right-9.5"
        />
        {/* <img
          alt="telegram cap"
          src="/assets/images/play/cap.webp"
          className="pointer-events-none w-37.5 absolute -top-10 -right-3"
        /> */}
      </article>

      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="telegram"
            src="/assets/images/play/telegrams.webp"
            className="pointer-events-none absolute top-0 left-0"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Вызывай друга сразиться 1 на 1
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-tiny/3 text-white/50">
              Вы подключаетесь уже к готовому лобби в котором уже кто то есть
            </p>

            <Link
              to="/fight"
              className="grid place-items-center basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg"
            >
              Позвать друга
            </Link>
          </div>
        </div>
        <img
          alt="telegram cap"
          src="/assets/images/play/1vs1.webp"
          className="pointer-events-none w-40 absolute -top-9 -right-6"
        />
      </article>

      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="telegram"
            src="/assets/images/play/telegrams.webp"
            className="pointer-events-none absolute top-0 left-0"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Пополните баланс и ворвитесь в битвы !
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-tiny/3 text-white/50">
              Вы подключаетесь уже к готовому лобби в котором уже кто то есть
            </p>

            <button
              type="button"
              className="basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg"
            >
              Пополнить
            </button>
          </div>
        </div>
        <img
          alt="telegram cap"
          src="/assets/images/play/ton-plus.webp"
          className="pointer-events-none w-38 absolute -top-9 -right-4"
        />
      </article>
    </section>
  );
};
