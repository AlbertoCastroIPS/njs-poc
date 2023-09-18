import styles from './hero.module.css'

type HeroProps = {
	image : string
	title : string
	description : string
	children? : React.ReactNode
}

function Hero({
	title,
	image,
	description,
	children,
} : HeroProps) {
	return (
		<div
			className={styles.hero}
			style={{backgroundImage: `url(${image})`}}
		>
			<div className={styles.heroContent}>
				<h1 className={styles.title}>{title}</h1>
				<h2 className={styles.description}>{description}</h2>
				{children}
			</div>
		</div>
	)
}

export default Hero;