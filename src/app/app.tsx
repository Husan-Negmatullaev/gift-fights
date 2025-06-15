import { initTelegram } from '@/entities/telegram';
import { AppRouterProvider } from './providers/router-provider/ui/app-router-provider';
import './styles/index.css';

initTelegram();

function App() {
  return <AppRouterProvider />;
}

export default App;
