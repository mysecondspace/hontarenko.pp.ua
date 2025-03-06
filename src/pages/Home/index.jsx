import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'components'
import { SINCE_DATE } from 'constants'
import { ROUTES } from '../../routes'

import styles from './styles.module.scss'

export const Home = () => {
  const openFile = () => {
    window.open('/Software Engineer, Ihor Hontarenko.pdf')
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>
        <span className={styles.text}>
          <span>Engineering</span>
        </span>
        <span className={styles.text}>
          <span>with soul</span>
        </span>
      </h1>
      <h2 className={styles.slogan}>make the web since {SINCE_DATE}</h2>
      <div className={styles.buttons}>
        <Button onClick={openFile}>Get my CV</Button>
        <Link to={ROUTES.ABOUT} className={styles.link}>
          It's me
        </Link>
      </div>
    </div>
  )
}
