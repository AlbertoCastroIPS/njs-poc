import ImageInput from './image-input'
import { render, screen, fireEvent } from '@testing-library/react'

function createImageInput(onChange : ()=>void = ()=>{}, defaultSrc : string = "") {
	return <ImageInput
		onChange={onChange}
		label="image"
		defaultSrc={defaultSrc}
	/>
}

describe('image-input component', () => {
	describe('renders', () => {
		it('normal', () => {
			const { container } = render(createImageInput())

			expect(screen.getByLabelText('image')).toBeInTheDocument()
			expect(screen.getByText(/click here/i)).toBeInTheDocument()
			expect(container.querySelector('input[type="file"]')).toBeInTheDocument()
		})

		it('default src', () => {
			const onChange = jest.fn(() => {})
			render(createImageInput(onChange, "/images/index-hero.jpg"))

			expect(screen.getByAltText(/user chosen photo/i)).toBeInTheDocument()
		})
	})

	it('on change is called', () => {
		const onChange = jest.fn(() => {})
		const { container } = render(createImageInput(onChange, "/images/index-hero.jpg"))

		fireEvent.change(container.querySelector('input[type="file"]') as Element, {
			target: {
			  files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
			},
		})
		expect(onChange).toBeCalled()
	})

	// it('on change is called', async () => {
	// 	const onChange = jest.fn(() => {})
	// 	render(createImageInput(onChange))

	// 	await user.type(screen.getByRole('textbox'), 'h')
	// 	expect(onChange).toBeCalledWith('h')
	// })

	// it('on enter is called', async() => {
	// 	const onChange = jest.fn(() => {})
	// 	const onEnter = jest.fn(() => {})
	// 	render(createImageInput(onChange, onEnter))

	// 	fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter', charCode: 13})
	// 	expect(onEnter).toBeCalled()
	// })
})