import { FiHome } from 'react-icons/fi'
import styles from './nav.module.css'
import Link from 'next/link'

type NavProps = {
}

function Nav({
} : NavProps) {
	const links = [{
		href: '/',
		label: 'Home',
		icon: <FiHome />,
	}]

	return (
		<nav className={styles.nav}>
			<ul className={styles.links}>
				{links.map((link, index) => {
					return <li key={index} className={styles.link}>
						<Link href={link.href}>
							{link.label}
							{link.icon}
						</Link>
					</li>
				})}
			</ul>
		</nav>
	)
}

export default Nav