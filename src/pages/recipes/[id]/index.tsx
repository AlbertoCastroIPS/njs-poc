import { useState } from 'react'
import { Hero, Link, List } from "@/components"
import { Recipe } from "@/types"
import { recipes } from "@/db"
import { GetServerSideProps } from 'next'
import styles from '@/styles/recipe.module.css'
import { FiEdit2, FiHeart, FiStar } from "react-icons/fi"

type RecipePageProps = Recipe

function RecipePage({
	id,
	name,
	description,
	image,
	ingredients,
	likes,
	rate,
	steps,
} : RecipePageProps) {
	const [isReteDialogVisible, setIsReteDialogVisible] = useState(false)

	return (
		<>
			<Hero
				image={image}
				title={name}
				description={description}
			>
				<div className={styles.heroExtra}>
					<span className={styles.detailItem}>
						{likes}
						<FiHeart />
					</span>
					<span className={styles.detailItem}>
						{rate}
						<FiStar />
					</span>
				</div>
			</Hero>
			<List
				title="Ingredients"
				items={ingredients}
			/>
			<List
				title="Steps"
				items={steps}
			/>
			<div className={styles.buttons}>
				<Link
					type="primary"
					href={`/recipes/${id}/edit`}
					label="Edit"
					icon={<FiEdit2 />}
				/>
				<Link
					type="secondary"
					label="Rate"
					icon={<FiStar />}
					action={() => setIsReteDialogVisible(true)}
				/>
			</div>
		</>
	)
}

export const getServerSideProps : GetServerSideProps<RecipePageProps> = async (context) => {
	const recipe = await recipes.byId(context.query["id"] as string)

	if (!recipe) {
		return {
			notFound: true,
		}
	}

	const props : RecipePageProps = {
		...recipe as Recipe,
	}

	return {
		props: props,
	}
}

export default RecipePage