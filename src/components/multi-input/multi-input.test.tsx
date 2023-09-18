import MultiInput from './multi-input'
import { render, screen, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'

function createMultiInput(onChange : ()=>void, isOrderedList : boolean = false) {
	return <MultiInput
		onChange={onChange}
		label="fruits"
		value={['apples']}
		isOrderedList={isOrderedList}
	/>
}

describe('multi-input component', () => {
	describe('renders', () => {
		it('normal', () => {
			const onChange = jest.fn(() => {})
			render(createMultiInput(onChange))

			expect(screen.getByLabelText('fruits')).toBeInTheDocument()
			expect(screen.getByRole('textbox')).toBeInTheDocument()
			expect(screen.getByLabelText('apples')).toBeInTheDocument()
		})

		it('ordered list', () => {
			const onChange = jest.fn(() => {})
			render(createMultiInput(onChange, true))

			expect(screen.getByLabelText('fruits')).toBeInTheDocument()
			expect(screen.getByRole('textbox')).toBeInTheDocument()
			expect(screen.getByLabelText('1. apples')).toBeInTheDocument()
		})
	})

	it('on change is called', async () => {
		const onChange = jest.fn(() => {})
		render(createMultiInput(onChange))

		const input = screen.getByRole('textbox')
		await user.type(input, 'bananas')
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13})
		expect(onChange).toBeCalledWith(['apples', 'bananas'])
	})
})