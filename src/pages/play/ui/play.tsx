/*

background: linear-gradient(117.99deg, #0098EA -37.02%, #252E37 78.41%),
linear-gradient(90deg, #2D83EC 0%, #1AC9FF 100%);

*/

import { Link } from 'react-router';

export const Play = () => {
  return (
    <section className="px-3 py-8 grid gap-9">
      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="to the moon rocket"
            src="/assets/images/play/to-the-moon-rocket.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <img
            alt="telegram cap"
            src="/assets/images/play/cap.webp"
            className="pointer-events-none w-37.5 absolute -top-10 -right-3"
          />

          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Создайте свое лобби и побеждайте !
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-[0.625rem]/3 text-white/50">
              Вы создаете новое лобби к которому будут подключаться остальные
              игроки
            </p>

            <Link
              // type="button"
              to="/create-lobby"
              className="grid place-items-center basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg">
              Создать
            </Link>
          </div>
        </div>
      </article>

      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="octopus"
            src="/assets/images/play/octopus.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <img
            alt="telegram cap"
            className="pointer-events-none h-52 absolute -top-21 -right-2"
            src="/assets/images/play/froggy.webp"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Подключайтесь к лобби и обыгрывайте их !
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-[0.625rem]/3 text-white/50">
              Вы подключаетесь уже к готовому лобби в котором уже кто то есть
            </p>

            <button
              type="button"
              className="basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg">
              Подключиться
            </button>
          </div>
        </div>
      </article>

      <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
        <div className="bg-linear-90 from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="telegram"
            src="/assets/images/play/telegram.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <img
            alt="telegram cap"
            className="pointer-events-none w-40 absolute -top-9 -right-2"
            src="/assets/images/play/ton-plus.webp"
          />
          <h2 className="font-medium text-[1.125rem]/5 max-w-50 mb-12.5 relative">
            Пополните баланс и ворвитесь в битвы !
          </h2>
          <div className="flex items-center justify-between gap-4 relative">
            <p className="max-w-51 font-thin text-[0.625rem]/3 text-white/50">
              Вы подключаетесь уже к готовому лобби в котором уже кто то есть
            </p>

            <button
              type="button"
              className="basis-29 cursor-pointer min-h-7.5 px-3 bg-white text-blue text-xs/3.5 font-medium rounded-lg">
              Пополнить
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
