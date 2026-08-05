import { DashboardProvider } from './context/DashboardContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { registerMaps } from './Utils/registerMaps';

export default function App() {
  registerMaps();
  return (
    <DashboardProvider>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </DashboardProvider>
  );
}
