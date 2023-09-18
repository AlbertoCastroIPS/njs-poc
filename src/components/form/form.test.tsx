import Form from './form'
import { render, screen, fireEvent } from '@testing-library/react'

function createForm(onSubmit : (data:any)=>void, defaultValue : string = "") {
	return <Form
		onSubmit={onSubmit}
		inputs={[{name: 'name', type: 'simple', defaultValue}]}
	/>
}

describe('form component', () => {
	it('renders', () => {
		const onSubmit = jest.fn(() => {})
		render(createForm(onSubmit))

		expect(screen.getByRole('form')).toBeInTheDocument()
		expect(screen.getByRole('textbox')).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	it('on submit is called when input is not emtpy', () => {
		const onSubmit = jest.fn(() => {})
		render(createForm(onSubmit, 'Alberto'))

		fireEvent.click(screen.getByRole('button'));
		expect(onSubmit).toBeCalled()
	})

	it('reports errors to empty inputs and on submit is not called', () => {
		const onSubmit = jest.fn(() => {})
		render(createForm(onSubmit))

		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('alert')).toBeInTheDocument()
		expect(onSubmit).not.toBeCalled()
	})
})