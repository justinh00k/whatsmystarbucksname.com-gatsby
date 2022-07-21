import React from "react"
import { StaticQuery, graphql } from "gatsby"
import {GatsbyImage} from 'gatsby-plugin-image';

const BackgroundImage = (props:{bgImageNum: number})=>{
  const {bgImageNum} = props;
    return (
    <StaticQuery
      query={graphql`
        query backgrounds { 
            allFile(filter: { dir: { regex: "/backgrounds/" } }) {
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
				objectFit="cover"
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 1,
				}}
				loading="eager"
				image={data.allFile.edges.find(
						(img: any) => img.node.base === `bg${bgImageNum}.jpg`
					).node.childImageSharp.gatsbyImageData
				}
				alt="Background image of Starbucks shop"
			/>
      )}
    />
  )
}
export default BackgroundImage