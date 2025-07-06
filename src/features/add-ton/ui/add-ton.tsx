import { useProfileContext } from "@/entities/profile";
import {
  useConnectTon,
  useTonConnect,
  useIntegrateTonWalletToUser,
} from "@/entities/ton";
import { Icons } from "@/shared/ui/icons/icons";

export const AddTon = () => {
  const { integrateWallet } = useIntegrateTonWalletToUser();
  const { profile } = useProfileContext();

  const { connected } = useTonConnect();
  const { onConnect } = useConnectTon({
    async onSuccess(account) {
      integrateWallet(account.address);
    },
  });

  const handleConnect = () => {
    onConnect();
  };

  const handleAddTon = () => {
    onConnect();
  };

  return (
    <div className="grid items-center grid-cols-[20px_1fr_28px] gap-3 bg-dark-blue-100 py-1 pl-2 pr-1 rounded-full">
      <Icons name="ton" className="text-white" width={20} height={20} />

      <span>{profile.balance}</span>

      <button
        type="button"
        onClick={connected ? handleAddTon : handleConnect}
        className="grid place-content-center bg-blue h-7 rounded-full cursor-pointer"
      >
        <Icons name="plus" width={8} height={8} />
      </button>
    </div>
  );
};
