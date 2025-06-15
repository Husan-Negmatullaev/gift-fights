import { RouterProvider } from 'react-router';
import { BROWSER_ROUTERS } from '../config/router-config';

export const AppRouterProvider = () => {
  return <RouterProvider router={BROWSER_ROUTERS} />;
};
