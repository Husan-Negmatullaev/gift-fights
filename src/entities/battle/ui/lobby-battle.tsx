import { Icons } from '@/shared/ui/icons/icons';
import clsx from 'clsx';

type LobbyBattleProps = {
  min: number | null;
  max: number | null;
  disabled?: boolean;
};

export const LobbyBattle = (props: LobbyBattleProps) => {
  const { min, max, disabled } = props;

  const minTextContent = min ? min + ' TON' : 'Нет';
  const maxTextContent = max ? max + ' TON' : 'Нет';

  return (
    <article className="bg-dark-blue-50 p-2.5 rounded-md">
      <div className="flex items-center gap-2 justify-between mb-3">
        <h5 className="font-thin text-sm">Лобби #0000001</h5>
        <div className="flex items-center gap-2 text-xs">
          5 / 9
          <Icons name="user-group" width={20} height={20} />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-1 mb-3.5">
        {Array.from({ length: 6 }).map((_item, index) => {
          const isImage = index === 0 || index === 1;

          return (
            <div
              className={clsx(
                !isImage && 'bg-dark-blue-400',
                'rounded-four overflow-hidden grid place-content-center',
              )}>
              {isImage ? (
                <img alt="gift" src="/assets/images/gifts/gift.webp" />
              ) : (
                <Icons name="question" className="text-white/36" />
              )}
            </div>
          );
        })}
      </div>
      <hr className="mb-3 border-dark-blue-450" />

      <div className="flex items-end mb-2">
        <div className="mr-1 flex-1">
          <span className="block mb-px text-white/50 font-thin text-eight">
            Мин. ставка TON
          </span>
          <div className="min-h-7 text-xs font-medium bg-dark-blue grid place-content-center rounded-four">
            {minTextContent}
          </div>
        </div>
        <div className="mr-3.5 flex-1">
          <span className="block mb-px text-white/50 font-thin text-eight">
            Макс. ставка TON
          </span>
          <div className="min-h-7 text-xs font-medium bg-dark-blue grid place-content-center rounded-four">
            {maxTextContent}
          </div>
        </div>

        <button
          type="button"
          disabled={disabled}
          className="block cursor-pointer rounded-four bg-blue text-xs font-medium min-h-7 px-3 disabled:bg-dark-blue-400 disabled:text-white/30 disabled:cursor-not-allowed">
          Подключится
        </button>
      </div>

      <span className="font-thin text-tiny">
        Лобби играет на:{' '}
        <span className="text-blue">
          {`<type_gift>`}, {`<type_gift>`}, {`<type_gift>`}
        </span>
      </span>
    </article>
  );
};
