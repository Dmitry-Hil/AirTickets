import Header from './components/Header/Header'

import Sidebar from './components/SideBar/Sidebar'
import MainBlock from './components/MainBlock/MainBlock'

function App() {

  return (
    <>
      <Header />
      <main >
        <div className="container">
          <div className="page">
            <Sidebar />
            <MainBlock />
          </div>
        </div>
      </main>
    </>
  )
}

export default App


