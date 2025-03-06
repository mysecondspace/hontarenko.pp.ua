import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './styles.module.scss'

const FadeableComponent = ({ isVisible, className }) => (
  <div className={clsx(className, !isVisible && styles.fade)}></div>
)

export const Backyard = () => {
  const [isVisibleBackground, setVisibleBackground] = useState(true)
  const [isVisibleTransition, setVisibleTransition] = useState(true)
  const location = useLocation()

  const preloader = () => {
    setVisibleBackground(true)
    setVisibleTransition(true)

    setTimeout(() => setVisibleBackground(false), 100)
    setTimeout(() => setVisibleTransition(false), 750)
  }

  useEffect(() => {
    const handleLoad = () => {
      preloader()
    }

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    preloader()
  }, [location])

  return (
    <>
      <div className={styles.noise} />
      <div className={styles.preloader}>
        <FadeableComponent
          isVisible={isVisibleBackground}
          className={styles.background}
        />
        <FadeableComponent
          isVisible={isVisibleTransition}
          className={styles.transition}
        />
      </div>
    </>
  )
}
