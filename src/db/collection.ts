import fs from 'fs'

type CollectionItem = {
	id : string
}

export default class Collection<Type extends CollectionItem> {
	name : string

	constructor(name : string) {
		this.name = name
		this.createFileIfNeeded()
	}

	get filePath() : string {
		return `./etc/data/${this.name}.json`
	}

	get items() : Promise<Type[]> {
		return new Promise((resolve, reject) => {
			fs.readFile(
				this.filePath,
				{encoding: 'utf-8', flag: 'r'},
				function(err, data) {
					if (err) {
						reject(err)
					} else {
						const items = JSON.parse(data) as Type[]
						resolve(items)
				}
			})
		})
	}

	async byId(id : string) {
		const items = await this.items
		return items.find((item) => item.id == id)
	}

	async register(item : Type) : Promise<void> {
		const items = await this.items
		items.push(item)
		await this.writeItems(items)
	}

	async patch(item : Type) : Promise<void> {
		const items = await this.items
		const index = items.findIndex((existingItem) => existingItem.id == item.id)
		items[index] = {...item}
		await this.writeItems(items)
	}

	writeItems(items : Type[]) : Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(this.filePath, JSON.stringify(items), (err) => {
				console.log(`${this.filePath} was ${err ? 'not ' : ''}saved`)
				if (err) {
					reject()
				} else {
					resolve()
				}
			})
		})
	}

	async createFileIfNeeded() {
		try {
			await this.items
		} catch (err) {
			this.writeItems([])
		}
	}
}