import Recipes from './recipes'

export const recipes = new Recipes([
	{
		id: '1',
		name: 'Caldo de res',
		image: '',
		likes: 180,
		rate: 3.5,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
		ingredients: [
			{
				name: 'Pork meat',
				quantity: '1 kg ',
			}
		],
		steps: [
			'Lorem ipsum',
		],
	},
	{
		id: '2',
		name: 'pozole',
		image: '/images/pozole.jpg',
		likes: 180,
		rate: 4.5,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
		ingredients: [
			{
				name: 'Pork meat',
				quantity: '1 kg ',
			}
		],
		steps: [
			'Lorem ipsum',
		],
	},
	{
		id: '3',
		name: 'tacos',
		image: '/images/tacos.jpg',
		likes: 180,
		rate: 5.0,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
		ingredients: [],
		steps: [],
	},
	{
		id: '4',
		name: 'tostadas',
		image: '/images/tostadas.jpg',
		likes: 180,
		rate: 4.52,
		description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
		ingredients: [],
		steps: [],
	},
])