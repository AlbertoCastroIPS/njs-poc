import Input from './input'
import { render, screen, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'

function createInput(onChange : ()=>void, onEnter : ()=>void = ()=>{}) {
	return <Input
		onChange={onChange}
		onEnter={onEnter}
		label="name"
		value=""
	/>
}

describe('input component', () => {
	it('renders', () => {
		const onChange = jest.fn(() => {})
		render(createInput(onChange))

		expect(screen.getByLabelText('name')).toBeInTheDocument()
		expect(screen.getByRole('textbox')).toBeInTheDocument()
	})

	it('on change is called', async () => {
		const onChange = jest.fn(() => {})
		render(createInput(onChange))

		await user.type(screen.getByRole('textbox'), 'h')
		expect(onChange).toBeCalledWith('h')
	})

	it('on enter is called', async() => {
		const onChange = jest.fn(() => {})
		const onEnter = jest.fn(() => {})
		render(createInput(onChange, onEnter))

		fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter', charCode: 13})
		expect(onEnter).toBeCalled()
	})
})