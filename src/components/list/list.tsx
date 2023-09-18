import { Section } from ".."

type ListProps = {
	items : string[]
	ordered? : boolean
	title : string
}

function List({
	items,
	ordered,
	title,
} : ListProps) {
	const Tag = ordered ? 'ul' : 'ol'

	return (
		<Section title={title}>
			<Tag>
				{items.map((item, index) => {
					return <li key={index}>{item}</li>
				})}
			</Tag>
		</Section>
	)
}

export default List