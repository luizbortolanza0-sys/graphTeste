import { DashboardProvider } from './context/DashboardContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </DashboardProvider>
  );
}
