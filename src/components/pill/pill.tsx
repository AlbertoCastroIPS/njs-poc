import { FiX } from 'react-icons/fi'
import styles from './pill.module.css'

type PillProps = {
	label : string
	onRemove : ()=>void
	isLiElement? : boolean
}

function Pill({
	label,
	onRemove,
	isLiElement,
} : PillProps) {
	const Tag = isLiElement ? 'li' : 'div';

	return (
		<Tag className={styles.container} aria-label={label}>
			{label}
			<button onClick={onRemove} type="button" aria-label="remove">
				<FiX />
			</button>
		</Tag>
	)
}

export default Pill