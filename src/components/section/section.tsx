import styles from './section.module.css'

type SectionProps = {
	children? : JSX.Element | JSX.Element[]
	title : string
	addClassName? : string
}

function Section({
	children,
	title,
	addClassName,
} : SectionProps) {
	return (
		<section className={`${styles.section} ${addClassName}`}>
			<h1>{title}</h1>
			{children}
		</section>
	)
}

export default Section;