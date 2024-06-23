import React from 'react';
import styles from './Footer.module.css';
import Menu from './Menu';
import Footer_Right from './Footer_Right';

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.menu_container}>
        <Menu />
      </div>

      <div className={styles.footer_right_container}>
        <Footer_Right />
      </div>
    </div>
  )
}

export default Footer
