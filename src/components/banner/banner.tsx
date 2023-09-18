import { Link, Section } from '@/components'
import styles from './banner.module.css'
import { Link as LinkType } from '@/types'
import { LinkProps } from '../link/link'
import { FiArrowRight, FiHeart } from 'react-icons/fi'

type BannerProps = {
	title : string
	description : string
	primaryLink : LinkProps
	secondaryLink : LinkProps
}

function Banner({
	title,
	description,
	primaryLink,
	secondaryLink,
} : BannerProps) {
	return (
		<Section
			title={title}
			addClassName={styles.banner}
		>
			<p>{description}</p>
			<div className={styles.links}>
				<Link
					{...primaryLink}
					icon={<FiArrowRight/>}
				/>
				<Link
					{...secondaryLink}
					icon={<FiHeart/>}
				/>
			</div>
		</Section>
	)
}

export default Banner