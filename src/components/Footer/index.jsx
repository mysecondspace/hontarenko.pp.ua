import { ReactComponent as Telegram } from 'assets/icons/telegram.svg'
import { ReactComponent as GitHub } from 'assets/icons/github.svg'
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg'
import { ReactComponent as LinkedIn } from 'assets/icons/linkedin.svg'
import { ReactComponent as Instagram } from 'assets/icons/instagram.svg'
import { ReactComponent as X } from 'assets/icons/x.svg'

import { CURRENT_YEAR } from 'constants'

import styles from './styles.module.scss'

const socials = [
  { href: 't.me/mysecondspace', ariaLabel: 'Telegram', Icon: Telegram },
  {
    href: 'github.com/mysecondspace',
    ariaLabel: 'GitHub',
    Icon: GitHub,
  },
  {
    href: 'facebook.com/mysecondspace',
    ariaLabel: 'Facebook',
    Icon: Facebook,
  },
  {
    href: 'linkedin.com/in/hontarenko',
    ariaLabel: 'LinkedIn',
    Icon: LinkedIn,
  },
  {
    href: 'instagram.com/mysecondspace',
    ariaLabel: 'Instagram',
    Icon: Instagram,
  },
  { href: 'x.com/mysecondspace', ariaLabel: 'X', Icon: X },
]

const Icons = () => (
  <div className={styles.icons}>
    {socials.map(({ href, ariaLabel, Icon }) => (
      <a
        key={ariaLabel}
        aria-label={ariaLabel}
        href={`https://${href}`}
        rel='noopener noreferrer'
        target='_blank'
      >
        <Icon />
      </a>
    ))}
  </div>
)

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <span>
          Hontarenko <span>{CURRENT_YEAR}</span>
        </span>
      </div>
      <div className={styles.social}>
        <Icons />
        <p>Follow me</p>
      </div>
    </footer>
  )
}
