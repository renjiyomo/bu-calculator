// ========================================
// BU Calculator — App Root
// ========================================

import { Layout } from './components/layout/Layout';
import { SemesterCalculator } from './components/semester/SemesterCalculator';
import { CumulativeCalculator } from './components/cumulative/CumulativeCalculator';
import { RulesEngine } from './components/settings/RulesEngine';
import { useApp } from './context/AppContext';

function AppContent() {
  const { activeView } = useApp();

  return (
    <Layout>
      {activeView === 'semester' && <SemesterCalculator />}
      {activeView === 'cumulative' && <CumulativeCalculator />}
      {activeView === 'settings' && <RulesEngine />}
    </Layout>
  );
}

export default function App() {
  return <AppContent />;
}
