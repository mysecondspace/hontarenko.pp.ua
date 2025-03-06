import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'

export const Button = ({ id, className, onClick, children }) => {
  return (
    <button
      id={id}
      className={clsx(styles.button, className)}
      onClick={onClick}
    >
      <span className={styles.text}>{children}</span>
    </button>
  )
}
