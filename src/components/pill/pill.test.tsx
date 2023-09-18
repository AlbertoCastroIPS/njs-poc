import Pill from './pill'
import { render, screen, fireEvent } from '@testing-library/react'

function createPill(onRemove : ()=>void, isLiElement : boolean = false) {
	return <Pill
		onRemove={onRemove}
		label="C++"
		isLiElement={isLiElement}
	/>
}

describe('pill component', () => {
	describe('renders', () => {
		it('normal', () => {
			const onRemove = jest.fn(() => {})
			render(createPill(onRemove))

			expect(screen.getByRole('button', {name: /remove/i})).toBeInTheDocument()
			expect(screen.getByLabelText('C++')).toBeInTheDocument()
		})

		it('li element', () => {
			const onRemove = jest.fn(() => {})
			render(createPill(onRemove, true))

			expect(screen.getByRole('listitem', {name: /C\+\+/i}))
		})
	})

	it('on remove is called', async () => {
		const onRemove = jest.fn(() => {})
		render(createPill(onRemove))

		fireEvent.click(screen.getByRole('button'))
		expect(onRemove).toBeCalled()
	})
})