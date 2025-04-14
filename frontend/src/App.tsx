import './App.css';
import Header from './layout/Header';
import LeftSidebar from './layout/LeftSidebar';
import RightSidebar from './layout/RightSidebar';
import Content from './layout/Content';
import Dashboard from './components/dashboard/Dashboard';

const App: React.FC = () => {

  return (
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
  )
}

export default App
