export const ListHistoryBattles = () => {
  return (
    <ol className="grid gap-3">
      <li>
        <div className="px-3 py-3.5 bg-dark-blue-50 rounded-md">
          <header className="flex items-center justify-between gap-2 mb-2">
            <div>
              <h5 className="text-sm/4">Лобби #0000001</h5>
              <p className="font-thin text-xs">
                Вы выиграли:{' '}
                <span className="font-medium text-blue-100">23 TON</span>
              </p>
            </div>

            <div className="grid place-content-center basis-25.5 min-h-7 font-semibold text-sm rounded-sm bg-blue">
              Победа
            </div>
          </header>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-x-2 gap-y-1.5">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-dark-blue-400 rounded-four overflow-hidden">
                <img alt="gift" src="/assets/images/gifts/gift.webp" />
              </div>
            ))}
          </div>
        </div>
      </li>
      <li>
        <div className="px-3 py-3.5 bg-dark-blue-50 rounded-md">
          <header className="flex items-center justify-between gap-2 mb-2">
            <div>
              <h5 className="text-sm/4">Лобби #0000001</h5>
              <p className="font-thin text-xs">
                Вы выиграли:{' '}
                <span className="font-medium text-red-50">23 TON</span>
              </p>
            </div>

            <div className="grid place-content-center basis-25.5 min-h-7 font-semibold text-sm rounded-sm bg-red-100">
              Поражение
            </div>
          </header>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-x-2 gap-y-1.5">
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                className="bg-dark-blue-400 rounded-four overflow-hidden">
                <img alt="gift" src="/assets/images/gifts/gift.webp" />
              </div>
            ))}
          </div>
        </div>
      </li>
    </ol>
  );
};
