import { useProfileContext } from "@/entities/profile";
import {
  useConnectTon,
  useTonConnect,
  useIntegrateTonWalletToUser,
  useCreateTransaction,
} from "@/entities/ton";
import { TransactionType } from "@/shared/api/graphql/graphql";
import { Icons } from "@/shared/ui/icons/icons";
import { useTonConnectUI } from "@tonconnect/ui-react";

export const AddTon = () => {
  const { integrateWallet } = useIntegrateTonWalletToUser();
  const { profile } = useProfileContext();
  const [tonConnectUI] = useTonConnectUI();
  const { makeTransaction: createTransaction } = useCreateTransaction();

  const { connected, connect } = useTonConnect();
  const { onConnect } = useConnectTon({
    async onSuccess(account) {
      integrateWallet(account.address);
    },
  });

  const handleConnect = () => {
    onConnect();
  };

  const handleAddTon = () => {
    // onConnect();
    makeTransaction();
  };

  const makeTransaction = async () => {
    const amount = 1;
    const data = await createTransaction({
      type: TransactionType.WalletTopUp,
      amount,
    });

    if (!connected) {
      await connect();
      return;
    }

    console.log("hash", data.data?.createTransaction.hash);

    tonConnectUI
      .sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 360,

        messages: [
          {
            payload: data.data?.createTransaction.hash,
            address: import.meta.env.VITE_WALLET_ADDRESS,
            amount: String(amount * 10 ** 9),
          },
        ],
      })
      .then((res) => {
        console.log("Success", res);
        // if (res.boc) {
        //   resolve(true);
        // }
      })
      .catch((err) => {
        console.log("Err", err);
        // reject(false);
      });

    // return new Promise((resolve, reject) => {

    // });
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
