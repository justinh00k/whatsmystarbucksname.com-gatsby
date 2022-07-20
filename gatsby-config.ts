import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		title: `What's My Starbucks Name?`,
		siteUrl: `https://www.whatsmystarbucksname.com`,
    description: "The world's most popular Starbucks name generator. How will a barista get your name wrong? Found out at WhatsMyStarbucksName.com."
	},
	graphqlTypegen: true,
	plugins: [
		{
			resolve: `gatsby-plugin-facebook-analytics`,
			options: {
			  appId: `852036038201352`,
			  version: `v3.3`,
			  xfbml: true,
			  cookie: false,
			  includeInDevelopment: true,
			  debug: false,
			  language: `en_US`,
			},
		  },
    'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-61876860-1',
			},
		},
		'gatsby-plugin-image',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/overlay.png',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
    {
			resolve: `gatsby-plugin-webfonts`,
			options: {
				fonts: {
					google2: [
						{
							family: "Indie Flower",
							fontDisplay: "block",
						},
					],
				},
			},
		},
	],
};

export default config;
