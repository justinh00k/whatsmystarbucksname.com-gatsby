import path from 'path';
import { names } from './src/components/constants';

exports.createPages = async function ({ graphql, actions }:any) {
	const cups = await graphql(
		`
			{
				allFile(filter: { dir: { regex: "/cups$/" } }) {
					edges {
						node {
							base
						}
					}
				}
			}
		`
	);

	cups.data.allFile.edges.forEach((cup:any)=> {
		const cupName = names[parseInt(cup.node.base.split('.')[0])];
		actions.createPage({
			path: `cups/${encodeURI(cupName)}`,
			component: path.resolve('src/pages/index.tsx'),
			context: { initialCupNumber: parseInt(cup.node.base) },
		});
	});
};
