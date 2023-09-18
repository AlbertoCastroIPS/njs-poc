import { Section, Form } from "@/components"
import { UIContext } from "@/contexts"
import { Recipe } from "@/types"
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type RecipeFormProps = {
	recipe? : Recipe
}

function RecipeForm({
	recipe,
} : RecipeFormProps) {
	const router = useRouter()
	const {dispatch} = useContext(UIContext)

	async function registerRecipe(formData : FormData) {
		try {
			if (recipe) {
				formData.append('id', recipe.id)
				formData.append('rate', recipe.rate.toString())
				formData.append('likes', recipe.likes.toString())
			} else {
				formData.append('likes', '0')
				formData.append('rate', '0')
			}

			dispatch('show loader')
			const registeredRecipe = (await (await fetch('/api/recipes', {
				method: recipe ? 'PATCH' : 'POST',
				body: formData,
			})).json()) as Recipe
			dispatch('hide loader')

			router.push(`/recipes/${registeredRecipe.id}`)
		} catch {
			alert('Error while registering')
		}
	}

	return (
		<Section title={recipe ? 'Edit recipe' : 'New recipe'}>
			<Form
				inputs={[
					{
						name: 'name',
						type: 'simple',
						defaultValue: recipe?.name,
					},
					{
						name: 'description',
						type: 'simple',
						defaultValue: recipe?.description,
					},
					{
						name: 'ingredients',
						type: 'multiple',
						defaultValue: recipe?.ingredients,
					},
					{
						name: 'steps',
						type: 'multiple',
						isOrderedList: true,
						defaultValue: recipe?.steps,
					},
					{
						name: 'image',
						type: 'image',
						defaultValue: recipe?.image,
					}
				]}
				onSubmit={registerRecipe}
				secondaryLink={recipe && `/recipes/${recipe.id}`}
			/>
		</Section>
	)
}

export default RecipeForm