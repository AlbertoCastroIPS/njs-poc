import { useState } from 'react'
import { Input, Pill } from '@/components'
import styles from './multi-input.module.css'

type MultiInputProps = {
	label : string
	value : string[]
	onChange : (value : string[])=>void
	isOrderedList? : boolean
	error? : string
}

function MultiInput({
	value,
	label,
	onChange,
	isOrderedList,
	error,
} : MultiInputProps) {
	const [inputValue, setInputValue] = useState('')
	const Tag = isOrderedList ? 'ol' : 'div'

	function handleNewValue() {
		const newValue = [...value, inputValue]
		setInputValue('')
		onChange(newValue)
	}

	function handleRemove(valueIndex : number) {
		let newValue = [...value]
		newValue.splice(valueIndex, 1)
		onChange(newValue)
	}

	return (
		<div className={styles.container}>
			<Input
				value={inputValue}
				onChange={setInputValue}
				onEnter={handleNewValue}
				label={label}
				error={error}
			/>
			{value && value.length > 0 &&
			<Tag className={styles.pills}>
				{value.map((value, index) => {
					const label = isOrderedList ?
						`${index + 1}. ${value}` :
						value;

					return (
						<Pill
							key={index}
							label={label}
							onRemove={() => handleRemove(index)}
							isLiElement={isOrderedList}
						/>
					)
				})}
			</Tag>
			}
		</div>
	)
}

export default MultiInput