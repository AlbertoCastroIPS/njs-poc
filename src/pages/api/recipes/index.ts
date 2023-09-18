import { recipes } from "@/db";
import { Recipe } from "@/types";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuid} from 'uuid'
import mimes from 'mime-types'

export default async function handler(
	req : NextApiRequest,
	res : NextApiResponse,
) {
	try {
		switch (req.method) {
			case 'POST':
				await handlePost(req, res)
				break

			case 'PATCH':
				await handlePatch(req, res)
				break

			default:
				await handleGet(req, res)
		}
	} catch {
		res.status(500)
	}
}

async function handleGet(
	req : NextApiRequest,
	res : NextApiResponse,
) {
	res
		.status(200)
		.json(await recipes.items)
}

async function handlePost(
	req : NextApiRequest,
	res : NextApiResponse,
) {
	const recipe = await readRecipeFromBody(req, res)
	const recipeId = uuid()
	recipe.id = recipeId
	await recipes.register(recipe)
	res.status(201).json(recipe)
}

async function handlePatch(
	req : NextApiRequest,
	res : NextApiResponse,
) {
	const recipe = await readRecipeFromBody(req, res)
	const recipeId = uuid()
	await recipes.patch(recipe)
	res.status(200).json(recipe)
}

async function readRecipeFromBody(
	req : NextApiRequest,
	res : NextApiResponse,
) : Promise<Recipe> {
	const form = formidable({multiples: true})

	form.on('fileBegin', (_, file) => {
		const imageId = uuid()
		const imageName = `/images/recipes/${imageId}.${mimes.extension(file.mimetype as string)}`
		file.filepath = path.join(process.cwd(), 'public', imageName)
		file.newFilename = imageName
	})

	const [fields, files] = await form.parse(req)

	const id = fields.id?.[0] || ''
	const name = fields.name?.[0] || ''
	const description = fields.description?.[0] || ''
	const likes = parseInt(fields.likes?.[0] || '0')
	const rate = parseInt(fields.rate?.[0] || '0')
	const ingredients = (fields.ingredients?.[0] || '').split(',')
	const steps = (fields.steps?.[0] || '').split(',')
	const image = (files.image?.[0].newFilename || fields.image?.[0] || '')

	const recipe : Recipe = {
		id,
		name,
		description,
		likes,
		rate,
		ingredients,
		steps,
		image,
	}

	console.log(recipe)

	return recipe
}

export const config = {
	api: {
		bodyParser: false,
	},
}