

import Link from 'next/link'
import bg from 'assets/images/bg.jpg'
import styles from '../styles/Home.module.css'
export default function Home() {

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.content}  >

        <div className={styles.cover} >
          <h2>知识改变命运</h2>
          <p>个人博客</p>
        </div>
      </div>
    </div>

  )
}
