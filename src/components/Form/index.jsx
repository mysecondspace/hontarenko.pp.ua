import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { ROUTES } from 'routes'

import { ReactComponent as CloseIcon } from 'assets/close.svg'

import styles from './styles.module.scss'

const useDefaultValueHandlers = (defaultValue) => {
  const handleBlur = (e) => {
    if (e.target.value === '') e.target.value = defaultValue
  }

  const handleFocus = (e) => {
    if (e.target.value === defaultValue) e.target.value = ''
  }

  return { handleBlur, handleFocus }
}

const InputField = ({ name, defaultValue, type = 'text' }) => {
  const { handleBlur, handleFocus } = useDefaultValueHandlers(defaultValue)

  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      required
    />
  )
}

const TextareaField = ({ name, defaultValue }) => {
  const { handleBlur, handleFocus } = useDefaultValueHandlers(defaultValue)

  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      required
      rows='1'
    />
  )
}

export const Form = ({ open, onCloseForm }) => {
  const [isVisible, setVisible] = useState(false)

  const closeForm = useCallback(() => {
    setVisible(false)

    setTimeout(() => {
      onCloseForm()
    }, 500)
  }, [onCloseForm])

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (open && e.keyCode === 27) {
        closeForm()
      }
    }

    document.addEventListener('keyup', handleKeyUp)

    if (open) {
      setTimeout(() => setVisible(true), 500)
    } else {
      setVisible(false)
    }

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [open, closeForm])

  return (
    <div className={clsx(styles.form, isVisible && styles.visible)}>
      <CloseIcon onClick={closeForm} />
      <form
        name='contact'
        data-netlify='true'
        netlify-honeypot='bot-field'
        action={ROUTES.HOME}
        method='POST'
      >
        <input type='hidden' name='form-name' value='contact' />
        <div className={styles.hidden}>
          <input name='bot-field' />
        </div>
        <InputField name='name' defaultValue='who are you?' />
        <InputField name='email' defaultValue='your e-mail' type='email' />
        <TextareaField name='message' defaultValue='thoughts?' />
        <button type='submit'>Say hello</button>
      </form>
      <p>
        <strong>ESC</strong> &mdash; close the form or click &nbsp;
        <span onClick={closeForm}>here</span>
      </p>
    </div>
  )
}
