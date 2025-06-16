import { useId } from 'react';
import { Icons } from '../icons/icons';

export const Checkbox = () => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="grid place-content-center size-7 rounded-md has-checked:bg-blue transition-colors border-2 border-dark-blue-250">
      <input id={id} type="checkbox" className="peer sr-only" />
      <Icons
        name="check"
        className="text-transparent peer-checked:text-white transition-colors"
      />
    </label>
  );
};
