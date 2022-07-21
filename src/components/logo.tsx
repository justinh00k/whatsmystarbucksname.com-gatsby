import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import {GatsbyImage} from 'gatsby-plugin-image';
import {translations} from "./constants"

const Logo = (props:{lang: string})=>{
  const {lang} = props;
    return (
    <StaticQuery
      query={graphql`
        query logos { 
            allFile(filter: { dir: { regex: "/logos/" } }) {
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
        <Link to="/">
					<GatsbyImage
						image={data.allFile.edges.find(
								(img: any) => img.node.base === translations[lang].logo
							).node.childImageSharp.gatsbyImageData
						}
						alt="What's My Starbucks Name?"
						imgClassName="logo"
						className="logo"
						loading="eager"
					/>
				</Link>
      )}
    />
  )
}
export default Logo