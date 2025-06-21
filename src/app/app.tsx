import { initTelegram } from '@/entities/telegram';
import { AppRouterProvider } from './providers/router-provider/ui/app-router-provider';
import './styles/index.css';
import ReactModal from 'react-modal';

initTelegram();

function App() {
  // useEffect(() => initTelegram(), []);

  return <AppRouterProvider />;
}

export default App;

ReactModal.setAppElement('#root');
