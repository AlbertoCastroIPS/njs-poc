import Image from 'next/image'
import styles from './card.module.css'

type CardProps = {
	image : string
	title : string
	imageAlt : string
	description : string
	children? : React.ReactNode
}

function Card({
	image,
	title,
	imageAlt,
	description,
	children,
} : CardProps) {

	return (
		<div className={styles.card}>
			<div className={`${styles.imageContainer} ${styles.empty}`}>
				{
					image ?
					<Image
						className={styles.image}
						src={image}
						alt={imageAlt}
						fill={true}
						objectFit='cover'
					/> :
					<span aria-label={imageAlt}>{imageAlt}</span>
				}
			</div>
			<div className={styles.content}>
				<h4 className={styles.title}>{title}</h4>
				<p className={styles.description}>{description}</p>
				<div className={styles.dynamicContent}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Card