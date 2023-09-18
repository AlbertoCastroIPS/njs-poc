import { default as NextLink } from 'next/link'
import { Link as LinkType } from '@/types'
import styles from './link.module.css'

export type LinkProps = {
	type : 'primary' | 'secondary'
	icon ?: React.ReactNode
	action ?: ()=>void
	href? : string
	label? : string
}

function Link({
	href,
	label,
	type,
	icon,
	action,
} : LinkProps) {
	const className = `${styles.link} ${type == 'secondary' ? styles.secondary : ''}`
	const content = <>
		{label && label}
		{icon && icon}
	</>

	return (
		href ?
			<NextLink
				href={href}
				className={className}
			>
				{content}
			</NextLink>
		: <button
			onClick={action}
			type="button"
			className={className}
		>
			{content}
		</button>
	)
}

export default Link