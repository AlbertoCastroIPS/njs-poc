import { Recipe } from "@/types";
import Collection from "./collection";

export default class Recipes extends Collection<Recipe> {
	constructor() {
		super('recipes')
	}

	async topRecipes() : Promise<Recipe[]> {
		const items = await this.items
		return items.sort((a, b) => {
			const hasBHigherRate = a.rate < b.rate

			if (hasBHigherRate) {
				return 1
			}

			const hasAHigherRate = a.rate > b.rate

			if (hasAHigherRate) {
				return -1
			}

			return 0
		}).slice(0, 3)
	}
}