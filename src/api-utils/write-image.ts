import { writeFile } from "fs"

type WriteImageProps = {
	name : string
	data : any
}

export default function writeImage({
	name,
	data,
} : WriteImageProps) : Promise<void> {
	return new Promise((resolve, reject) => {
		writeFile(`./public/images/${name}`, data, (err) => {
			if (err) {
				reject()
			} else {
				resolve()
			}
		})
	})
}