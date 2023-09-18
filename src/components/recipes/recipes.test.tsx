import { Recipe } from '@/types'
import RecipesList from './recipes'
import { render, screen } from '@testing-library/react'

const recipes : Array<Recipe> = [
	{
		id: '1',
		name: 'pozole',
		image: '',
		likes: 180,
		rate: 4.85,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
	},
	{
		id: '2',
		name: 'pozole',
		image: '',
		likes: 180,
		rate: 4.85,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
	},
	{
		id: '3',
		name: 'pozole',
		image: '',
		likes: 180,
		rate: 4.85,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
	},
	{
		id: '4',
		name: 'pozole',
		image: '',
		likes: 180,
		rate: 4.85,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
	},
]

describe('section component', () => {
	describe('render', () => {
		it('should display no-recipes message where there are not', () => {
			render(
				<RecipesList
					recipes={[]}
				/>
			)

			expect(screen.getByRole('status', {name: /list status/i})).toBeInTheDocument()
		})

		it('should display 4 recipes when there are 4', () => {
			render(
				<RecipesList
					recipes={recipes}
				/>
			)

			expect(screen.queryByRole('status', {name: /list status/i})).toBeNull()
			expect(screen.queryAllByRole('listitem', {name: /recipe/i}).length).toBe(4)
		})
	})

})