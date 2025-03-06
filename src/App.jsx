import clsx from 'clsx'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Form, Backyard, Footer, Header, Constellation } from 'components'
import { About, Home } from 'pages'
import { ROUTES } from 'routes'

import styles from './App.module.scss'

function App() {
  const [formOpen, setFormOpen] = useState(false)

  const { pathname } = useLocation()
  const isHomePage = pathname === ROUTES.HOME

  const handleOpenForm = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  }

  return (
    <div className={styles.body}>
      <div className={clsx(styles.wrapper, formOpen && styles.blur)}>
        <div className={styles.background}></div>
        {isHomePage && <Constellation />}
        <Header onOpenForm={handleOpenForm} />
        <article className={styles.article}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
          </Routes>
        </article>
        <Footer />
      </div>
      <Backyard />
      <Form open={formOpen} onCloseForm={handleCloseForm} />
    </div>
  )
}

export default App
