import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      limit={3}
      className="!text-white !font-medium"
      // bodyClassName="!text-white !font-medium"
      toastClassName="!bg-gradient-to-br !from-dark-blue-50 !to-dark-blue-100 !border !border-blue !rounded-2.5 !shadow-lg"
      progressClassName="!bg-gradient-to-r !from-blue !to-blue-100"
    />
  );
};
