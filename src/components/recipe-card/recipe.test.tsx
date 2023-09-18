import { Recipe as RecipeType } from '@/types'
import Recipe from './recipe'
import { render, screen } from '@testing-library/react'

const recipe : RecipeType = {
	id: '1',
	name: 'pozole',
	image: '',
	likes: 180,
	rate: 4.85,
	description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
	ingredients: [],
	steps: [],
}

describe('recipe component', () => {
	it('should render', () => {
		render(
			<Recipe
				{...recipe}
			/>
		)

		expect(screen.getByRole('heading', {name: /pozole/i})).toBeInTheDocument()
		expect(screen.getByLabelText('Image of recipe pozole')).toBeInTheDocument()
		expect(screen.getByRole('link', {name: /recipe 1/i})).toBeInTheDocument()
		expect(screen.getByLabelText('likes')).toBeInTheDocument()
		expect(screen.getByLabelText('rate')).toBeInTheDocument()
	})
})