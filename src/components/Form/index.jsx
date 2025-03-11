import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

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

const InputField = ({ defaultValue, name, type = 'text' }) => {
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

const TextareaField = ({ defaultValue, name }) => {
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
      <form name='contact' method='post'>
        <input type='hidden' name='form-name' value='contact' />
        <InputField defaultValue='who are you?' name='name' />
        <InputField defaultValue='your e-mail' name='email' type='email' />
        <TextareaField defaultValue='thoughts?' name='message' />
        <button type='submit'>Say hello</button>
      </form>
      <p>
        <strong>ESC</strong> &mdash; close the form or click &nbsp;
        <span onClick={closeForm}>here</span>
      </p>
    </div>
  )
}
