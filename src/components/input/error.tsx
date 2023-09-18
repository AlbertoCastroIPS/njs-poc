import styles from './input.module.css'

type ErrorProps = {
	error : string
}

export default function Error({
	error,
} : ErrorProps) {
	return <p role="alert" className={styles.error}>{error}</p>
}