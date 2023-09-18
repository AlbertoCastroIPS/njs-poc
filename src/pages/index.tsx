import {Banner, Hero, Recipes, Section} from '@/components'
import { recipes } from '@/db'
import { Recipe } from '@/types'
import { GetServerSideProps } from 'next'

type HomeProps = {
	topRecipes : Recipe[]
}

export default function Home({
	topRecipes,
} : HomeProps) {
	return (
		<>
			<Hero
				image='images/index-hero.jpg'
				title='Rotten potatoes'
				description='Free recets from all around the world. You will never eat more rotten potatoes!!'
			/>
			<Section
				title="Top recipes!"
			>
				<Recipes
					recipes={topRecipes}
				/>
			</Section>
			<Banner
				title='Want more?'
				description="If you're loving our top recipes you can"
				primaryLink={{
					href: '/recipes',
					label: 'View all',
					type: 'primary',
				}}
				secondaryLink={{
					href: '/recipes/create',
					label: 'Contribute',
					type: 'secondary',
				}}
			/>
		</>
	)
}

export const getServerSideProps : GetServerSideProps<HomeProps> = async () => {
	const homeProps : HomeProps = {
		topRecipes: await recipes.topRecipes(),
	}

	return {
		props: homeProps,
	}
}