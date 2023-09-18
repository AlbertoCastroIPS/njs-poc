import { useState } from 'react'
import styles from './image.module.css'
import Error from '../input/error'

type ImageInputProps = {
	label : string
	onChange : (file:File)=>void
	defaultSrc? : string
	error? : string
}

function ImageInput({
	label,
	onChange,
	defaultSrc,
	error,
} : ImageInputProps) {
	const [imageSrc, setImageSrc] = useState(defaultSrc)
	const inputId = `${label}-image-input`

	function handleChange(event : React.FormEvent<HTMLInputElement>) {
		if (event.currentTarget.files) {
			const file = event.currentTarget.files[0]

			if (file) {
				onChange(file)
				loadImage(file)
			}
		}
	}

	function loadImage(file : File) {
		const reader = new FileReader()
		reader.onload = function(event) {
			const result = event.target?.result
			setImageSrc(result as string)
		}
		reader.readAsDataURL(file)
	}

	const labelId = `${label}-label-for-image-input`;

	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={inputId} id={labelId} aria-label={label}>
				{label}
				<input
					aria-labelledby={labelId}
					type="file"
					id={inputId}
					onChange={handleChange}
					accept="image/png, image/jpeg"
					className={styles.input}
				/>
				{
					error && <Error error={error} />
				}
				{
					imageSrc ?
						<img src={imageSrc} className={styles.image} alt="user chosen photo" /> :
						<p className={styles.clickHere}>Click here to choose a photo</p>
				}
			</label>
		</div>
	)
}

export default ImageInput