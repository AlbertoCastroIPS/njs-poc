import { useState, useEffect } from 'react'
import { ImageInput, Input, Link, MultiInput } from '@/components'
import styles from './form.module.css'

export type FormInput = {
	name : string
	type : 'simple' | 'multiple' | 'image'
	isOrderedList? : boolean
	defaultValue ?: string | string[]
}

type FormError = {
	inputName : string
	error : string
}

type FormProps = {
	inputs : FormInput[]
	onSubmit : (data:any)=>void
	secondaryLink? : string
}

function Form({
	inputs,
	onSubmit,
	secondaryLink,
} : FormProps) {
	const [data, setData] = useState({} as any)
	const [errors, setErrors] = useState([] as FormError[])
	const [hasBeenVerified, setHasBeenVerified] = useState(false)

	function handleSimpleInputChange(value : string, valueName : string) {
		const newData = {...data}
		newData[valueName] = value
		setData(newData)
	}

	function handleImageInputChange(value : File, valueName : string) {
		const newData = {...data}
		newData[valueName] = value
		setData(newData)
	}

	function handleMultipleInputChange(value : string[], valueName : string) {
		const newData = {...data}
		newData[valueName] = [...value]
		setData(newData)
	}

	function handleSubmit(event : React.FormEvent) {
		event.preventDefault()

		setHasBeenVerified(true)
		const errors = collectErrors()
		setErrors(errors)

		if (errors.length > 0) {
			return
		}

		const formData = new FormData()
		inputs.forEach((input) => {
			formData.append(input.name, data[input.name])
		})

		onSubmit(formData)
	}

	function collectErrors() : FormError[] {
		const errors : FormError[] = []

		inputs.forEach((input) => {
			const value = data[input.name]
			switch (input.type) {
				case 'multiple':
					if (!value || value.length == 0) {
						errors.push({
							inputName: input.name,
							error: 'You must have introduced at least 1 value'
						})
					}
					break

				case 'image':
					if (!value) {
						errors.push({
							inputName: input.name,
							error: 'An image is required'
						})
					}
					break

				default:
					if (!value) {
						errors.push({
							inputName: input.name,
							error: 'Input is empty'
						})
					}
			}
		})

		return errors
	}

	useEffect(() => {
		const newData : any = {}
		inputs.forEach((input) => {
			if (input.defaultValue != undefined) {
				newData[input.name] = input.defaultValue
			}
		})
		setData(newData)
	}, [])

	useEffect(() => {
		if (!hasBeenVerified) {
			return
		}

		const errors = collectErrors()
		setErrors(errors)
	}, [data, hasBeenVerified])

	return (
		<form name='form' onSubmit={handleSubmit} className={styles.form}>
			{inputs.map((input, index) => {
				const inputError = errors.find((error) => error.inputName == input.name)

				switch (input.type) {
					case 'multiple':
						return <MultiInput
							value={data[input.name] ? data[input.name] : []}
							label={input.name}
							onChange={(value) => {
								handleMultipleInputChange(value, input.name)
							}}
							key={index}
							isOrderedList={input.isOrderedList}
							error={inputError?.error}
						/>

					case 'image':
						return <ImageInput
							key={index}
							label={input.name}
							onChange={(value) => {
								handleImageInputChange(value, input.name)
							}}
							defaultSrc={(input?.defaultValue || '') as string}
							error={inputError?.error}
						/>

					default:
						return <Input
							value={data[input.name] ? data[input.name] : ''}
							onChange={(value) => {
								handleSimpleInputChange(value, input.name)
							}}
							label={input.name}
							key={index}
							error={inputError?.error}
						/>
				}
			})}
			<div className={styles.buttons}>
				<button type="submit" className={styles.submit}>Save</button>
				{secondaryLink && (
					<Link
						href={secondaryLink}
						label='Cancel'
						type='secondary'
					/>
				)}
			</div>
		</form>
	)
}

export default Form