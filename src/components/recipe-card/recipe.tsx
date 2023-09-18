import { Recipe as RecipeType } from "@/types";
import Link from "next/link";
import styles from './recipe.module.css'
import { Card } from "@/components";
import { FiHeart, FiStar } from 'react-icons/fi'

type RecipeProps = RecipeType

function Recipe({
	id,
	name,
	image,
	likes,
	rate,
	description,
} : RecipeProps) {
	return (
		<Link
			href={`recipes/${id}`}
			aria-label={`Recipe ${id}`}
			className={styles.card}
		>
			<Card
				image={image}
				imageAlt={`Image of recipe ${name}`}
				title={name}
				description={description}
			>
				<span
					className={styles.stat}
					aria-label="likes"
				>
					<FiHeart />
					{likes}
				</span>
				<span
					className={styles.stat}
					aria-label="rate"
				>
					<FiStar />
					{rate}
				</span>
			</Card>
		</Link>
	)
}

export default Recipe;