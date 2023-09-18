import Error from './error'
import styles from './input.module.css'

type InputProps = {
	placeholder? : string
	value : string
	onChange? : (value:string)=>void
	onEnter? : ()=>void
	addClassName? : string
	label? : string
	error? : string
}

function Input({
	placeholder,
	onChange,
	onEnter,
	value,
	addClassName,
	label,
	error,
} : InputProps) {
	function handleChange(event : React.FormEvent<HTMLInputElement>) {
		if (onChange) {
			onChange(event.currentTarget.value);
		}
	}

	function handleKeyDow(event : React.KeyboardEvent<HTMLInputElement>) {
		if (!onEnter) {
			return
		}

		if (event.key == 'Enter') {
			event.stopPropagation()
			event.preventDefault()
			onEnter()
		}
	}

	const labelId = `${label}-label-for-simple-input`;

	return (
		<div className={`${styles.container} ${addClassName}`}>
			{
				label ?
				<label id={labelId}>{label}</label> :
				null
			}
			<input
				aria-labelledby={labelId}
				type="text"
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				onKeyDown={handleKeyDow}
			/>
			{
				error && (
					<Error error={error} />
				)
			}
		</div>
	)
}

export default Input