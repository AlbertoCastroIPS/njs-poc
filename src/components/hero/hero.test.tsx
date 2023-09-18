import Hero from './hero'
import { render, screen } from '@testing-library/react'

describe('hero component', () => {
	it('renders', () => {
		render(
			<Hero
				image=''
				title='Title'
				description='description'
			/>
		)

		expect(screen.getByRole('heading', {name: /title/i})).toBeInTheDocument()
		expect(screen.getByRole('heading', {name: /description/i})).toBeInTheDocument()
	})
})