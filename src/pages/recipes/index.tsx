import { useState, useEffect, useMemo } from 'react'
import { Input, Recipes, Section } from "@/components";
import { recipes } from '@/db'
import { Recipe } from "@/types";
import { GetServerSideProps } from 'next'
import styles from '@/styles/recipes.module.css'

type RecipesPageProps = {
	recipes : Recipe[]
}

function RecipesPage({
	recipes,
} : RecipesPageProps) {
	const [search, setSearch] = useState('')
	const recipesToRender = useMemo(() => {
		return filterRecipes()
	}, [search, recipes])

	function filterRecipes() {
		if (!search) {
			return recipes
		}

		return recipes.filter((recipe) => {
			return recipe.name.toLowerCase().includes(search.toLowerCase())
		})
	}

	return (
		<Section
			title="All the recipes!"
		>
			<Input
				placeholder="Search"
				value={search}
				onChange={setSearch}
				addClassName={styles.search}
			/>
			<Recipes recipes={recipesToRender} />
		</Section>
	)
}

export const getServerSideProps : GetServerSideProps<RecipesPageProps> = async () => {
	const props : RecipesPageProps = {
		recipes: await recipes.items,
	}

	return {
		props: props,
	}
}

export default RecipesPage;