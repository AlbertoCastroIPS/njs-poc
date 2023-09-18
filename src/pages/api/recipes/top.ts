import { recipes } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req : NextApiRequest,
	res : NextApiResponse,
) {
	res
		.status(200)
		.json(recipes.topRecipes())
}