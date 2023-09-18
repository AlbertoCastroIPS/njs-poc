import { RecipeForm } from "@/components"
import { recipes } from "@/db"
import { Recipe } from "@/types"
import { GetServerSideProps } from 'next'

type EditRecipePageProps = {
} & Recipe

function EditRecipePage(recipe : EditRecipePageProps) {
	return (
		<RecipeForm
			recipe={recipe}
		/>
	)
}

export const getServerSideProps : GetServerSideProps<EditRecipePageProps> = async (context) => {
	const recipe = await recipes.byId(context.query["id"] as string)

	if (!recipe) {
		return {
			notFound: true,
		}
	}

	const props : EditRecipePageProps = {
		...recipe as Recipe,
	}

	return {
		props: props,
	}
}

export default EditRecipePage