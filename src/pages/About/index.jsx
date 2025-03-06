import React from 'react'

import { CURRENT_YEAR, SINCE_DATE } from 'constants'

import styles from './styles.module.scss'

export const About = () => {
  const experienceYears = CURRENT_YEAR - SINCE_DATE

  return (
    <div>
      <div className={styles.gradient}></div>
      <div className={styles.image}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.content}>
        <p>
          I am a web developer with about {experienceYears} years of experience
          delivering high-quality digital solutions for international clients,
          well-known brands, and government projects. I specialize in complex,
          large-scale applications that demand precision, creativity, and
          technical excellence.
          <br />
          <br />I have contributed to platforms serving thousands of users
          worldwide, collaborating with design and development teams to create
          seamless, high-performance experiences that balance functionality with
          visual appeal, with a particular focus on interface quality. While I
          can’t disclose specific projects due to confidentiality agreements, my
          work has spanned a diverse range of industries, solving challenging
          technical problems at scale.
        </p>
      </div>
    </div>
  )
}
