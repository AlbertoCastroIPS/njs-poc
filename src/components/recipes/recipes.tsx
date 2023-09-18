import { RecipeCard } from '@/components'
import { Recipe } from '@/types'
import styles from './recipes.module.css'

type TopRecipeProps = {
	recipes : Recipe[]
}

function RecipesList({
	recipes
} : TopRecipeProps) {
	const hasRecipes = recipes != undefined && recipes.length > 0;

	return (
		<div>
			{
				!hasRecipes ?
				<p role="status" aria-label='list status'>There are no recipes yet!</p> :
				<ul className={styles.recipesList}>
					{
						recipes.map((recipe) => (
							<li
								key={recipe.id}
								aria-label="recipe"
							>
								<RecipeCard {...recipe} />
							</li>
						))
					}
				</ul>
			}
		</div>
	)
}

export default RecipesList