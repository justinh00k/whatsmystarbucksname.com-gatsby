import React from "react"
import { StaticQuery, graphql } from "gatsby"
import {GatsbyImage} from 'gatsby-plugin-image';
import {translations, drinkType} from "./constants"
import {cupFileName} from "./helpers"

const Cup = (props:{cupNumber: number, randomType: number, cupName: string, lang: string})=>{
  const {cupNumber, randomType, cupName, lang} = props;
    return (
    <StaticQuery
      query={graphql`
        query cups { 
            allFile(filter: { dir: { regex: "/cups$/" } }) {
			edges {
				node {
					base
					childImageSharp {
						gatsbyImageData(formats: AUTO)
					}
				}
			}
		}
        }
      `}
      render={data => (
		<GatsbyImage
		image={data.allFile.edges.find(
				(img: any) => img && img.node.base === cupFileName(cupNumber)
			)?.node.childImageSharp.gatsbyImageData
		}
		className="coffeepic"
		alt={`${
			translations[lang][ drinkType[cupNumber - 1] || "I"][randomType]
		} ${translations[lang].for} ${cupName}`}
	/>
      )}
    />
  )
}
export default Cup
