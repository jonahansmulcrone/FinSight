import './App.css';
import Header from './layout/Header';
import LeftSidebar from './layout/LeftSidebar';
import RightSidebar from './layout/RightSidebar';
import Content from './layout/Content';
import Dashboard from './components/dashboard/Dashboard';
import { CompanyContextProvider } from './contexts/CompanyContext';

const App: React.FC = () => {

  return (
    <CompanyContextProvider>
      <div className='h-screen overflow-x-hidden'>
        <Header />
        <div className='flex flex-row justify-between overflow-hidden'>
          <LeftSidebar />
          <Content>
            <Dashboard />
          </Content>
          <RightSidebar />
        </div>
      </div>
    </CompanyContextProvider>
  )
}

export default App
