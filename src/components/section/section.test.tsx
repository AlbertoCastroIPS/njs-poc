import Section from './section'
import { render, screen } from '@testing-library/react'

describe('section component', () => {
	it('renders', () => {
		render(
			<Section
				title='Title'
			/>
		)

		expect(screen.getByRole('heading', {name: /title/i})).toBeInTheDocument()
	})
})