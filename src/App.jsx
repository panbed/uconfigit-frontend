import { useState } from 'react'
import './App.css'

import Header from './components/Header'
import InstitutionPage from './containers/pages/InstitutionPage'
import Pagination from './components/Pagination'
import Introduction from './containers/pages/Introduction'
import DatabaseURLPage from './containers/pages/DatabaseURLPage'
import JWKBaseURLPage from './containers/pages/JWKBaseURLPage'
import BaseURLPage from './containers/pages/BaseURLPage'
import MigrationsPage from './containers/pages/MigrationsPage'

function App() {

  const [currentPage, setCurrentPage] = useState(0);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  const pages = [
    <Introduction />,
    <DatabaseURLPage />,
    <MigrationsPage />,
    <JWKBaseURLPage />,
    <BaseURLPage />,
    <InstitutionPage key="institution" />,
  ]

  return (
    <div className="sans-serif">
      <Header headerText={"Installation"}/>

      <main>
        {pages[currentPage]}
      </main>

      <nav className='flex-row gap-2 align-items-center' aria-label='Pagination Navigation'>
        <Pagination currentPage={currentPage} totalPages={pages.length - 1} onPageChange={handlePageChange} />
      </nav>
    </div>
  )
}

export default App
