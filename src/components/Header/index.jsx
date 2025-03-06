import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from 'components'
import { ROUTES } from 'routes'

import styles from './styles.module.scss'

const Logo = () => (
  <>
    <span className={styles.surname}>Hontarenko</span>
    <sup className={styles.emoji}>
      <span role='img' aria-label='Ukrainian flag'>
        🇺🇦
      </span>
    </sup>
  </>
)

export const Header = ({ onOpenForm }) => {
  const { pathname } = useLocation()
  const isAboutPage = pathname === ROUTES.ABOUT

  return (
    <header className={styles.header}>
      <Link to={ROUTES.HOME} className={styles.logo}>
        <Logo />
      </Link>
      <Button onClick={onOpenForm} className={isAboutPage && styles.button}>
        Email me
      </Button>
    </header>
  )
}
