import * as React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { Helmet } from 'react-helmet';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import '../styles/stylesheet.css';
import {
	names,
	popularNames,
	drinkType,
	translations,
	nonAtoZchoices,
	bgNames,
	bgURLs,
	supportedLangs
} from '../components/constants';
import {
	syllableCount,
	shuffleNumbers,
	cupFileName,
	capitalizeEveryWord,
	fbShare,
	twitterShare
} from '../components/helpers';

const IndexPage = (props: any) => {
	const lang: string =
		typeof navigator !== 'undefined' && supportedLangs.indexOf(window.navigator.language.substring(0, 2)) > -1
			? window.navigator.language.substring(0, 2)
			: 'en';
	const { backgrounds, cups, logos, site } = props.data;
	const { description, title } = site.siteMetadata;
	const { initialCupNumber } = props.pageContext;

	const [bgImageNum, setBgImageNum] = React.useState(
		1 + Math.floor(Math.random() * 13)
	);
	const [nameToTest, setNameToTest] = React.useState('');
	const [cupNumber, setCupNumber] = React.useState(
		initialCupNumber ? initialCupNumber : -1
	);
	const [cupName, setCupName] = React.useState<string>(
		initialCupNumber ? capitalizeEveryWord(names[initialCupNumber]) : ''
	);
	const [turn, setTurn] = React.useState(0);
	const [storedChoices, setStoredChoices] = React.useState<number[]>([]);

	function getName() {
		const gotName = nameToTest.replace(/\W/g, '').toLowerCase();
		if (!gotName.length) {
			return;
		}
		const sCount = syllableCount(gotName);
		const firstLetter = [gotName.substring(0, 1)];
		const lastLetter = [gotName.slice(-1)];
		const exactMatch = [];
		const choices: number[] = [];

		// Non a-z, but still a letter, so i guess accented letters and other languages? should improve
		if (!/[a-z]/.test(firstLetter[0])) {
			choices.concat(shuffleNumbers(nonAtoZchoices));
		}

		const choice0 = []; // First letter & syllables & not popular & last letter
		const choice1 = []; // First letter & syllables & not popular
		const choice2 = []; // First letter and syllables
		const choice3 = []; // First letter & not popular
		const choice4 = []; // First letter

		if (gotName.substring(0, 2) === 'ch') {
			firstLetter.push('ch');

			if (gotName.substring(0, 3) === 'chr') firstLetter.push('kr');
		} else if (firstLetter[0] === 'c') firstLetter.push('k');

		if (firstLetter[0] === 'k') firstLetter.push('c');

		if (gotName.substring(0, 3) === 'phi') firstLetter.push('f');

		if (firstLetter[0] === 'x') firstLetter.push('z');

		if (firstLetter[0] === 'z') firstLetter.push('x');

		if (firstLetter[0] === 'j') firstLetter.push('g');

		if (firstLetter[0] === 'g') firstLetter.push('j');

		if (lastLetter[0] === 'y') {
			lastLetter.push('ee');
			lastLetter.push('ie');
		}

		if (gotName.slice(-2) === 'ee') {
			lastLetter.push('y');
			lastLetter.push('ie');
		}

		if (gotName.slice(-2) === 'ie') {
			lastLetter.push('ee');
			lastLetter.push('y');
		}

		for (let i = 0; i < names.length; i++) {
			if (names[i] === gotName) {
				exactMatch.push(i);
				continue;
			}

			const syllables = syllableCount(names[i]);
			const isPopularName = popularNames.indexOf(names[i]) > -1;
			let firstLetterMatch = false;
			let lastLetterMatch = false;

			for (let j = 0; j < firstLetter.length; j++) {
				if (names[i].substring(0, firstLetter[j].length) === firstLetter[j])
					firstLetterMatch = true;
			}

			for (let k = 0; k < lastLetter.length; k++) {
				if (names[i].slice(lastLetter[k].length * -1) === lastLetter[k])
					lastLetterMatch = true;
			}

			if (
				firstLetterMatch &&
				syllables === sCount &&
				!isPopularName &&
				lastLetterMatch
			) {
				choice0.push(i);
			} else if (firstLetterMatch && syllables === sCount && !isPopularName) {
				choice1.push(i);
			} else if (firstLetterMatch && syllables === sCount) {
				choice2.push(i);
			} else if (firstLetterMatch && !isPopularName) {
				choice3.push(i);
			} else if (firstLetterMatch) {
				choice4.push(i);
			}
		}

		if (exactMatch.length > 0) {
			choice4.push(exactMatch[Math.floor(Math.random() * exactMatch.length)]);
		}

		// console.log(choice0,choice1,choice2,choice3,choice4);

		let rn = Math.floor(Math.random() * choice0.length);

		for (let i = 0; i < choice0.length; i++) {
			while (choice0[rn] === -1) {
				rn = Math.floor(Math.random() * choice0.length);
			}
			choices.push(choice0[rn]);
			choice0[rn] = -1;
		}

		for (let i = 0; i < choice1.length; i++) {
			rn = Math.floor(Math.random() * choice1.length);
			while (choice1[rn] === -1) {
				rn = Math.floor(Math.random() * choice1.length);
			}
			choices.push(choice1[rn]);
			choice1[rn] = -1;
		}
		for (let i = 0; i < choice2.length; i++) {
			rn = Math.floor(Math.random() * choice2.length);
			while (choice2[rn] === -1) {
				rn = Math.floor(Math.random() * choice2.length);
			}
			choices.push(choice2[rn]);
			choice2[rn] = -1;
		}
		for (let i = 0; i < choice3.length; i++) {
			rn = Math.floor(Math.random() * choice3.length);
			while (choice3[rn] === -1) {
				rn = Math.floor(Math.random() * choice3.length);
			}
			choices.push(choice3[rn]);
			choice3[rn] = -1;
		}
		for (let i = 0; i < choice4.length; i++) {
			rn = Math.floor(Math.random() * choice4.length);
			while (choice4[rn] === -1) {
				rn = Math.floor(Math.random() * choice4.length);
			}
			choices.push(choice4[rn]);
			choice4[rn] = -1;
		}

		
		setCupNumber(choices[turn] + 1);
		setStoredChoices(choices);
	}

	function newGame() {
		setBgImageNum((bgNum) => (bgNum + 1 > 12 ? 0 : bgNum + 1));
		setNameToTest('');
		setTurn(0);
		setCupNumber(-1);
		navigate("/");
	}

	React.useEffect(() => {
		if (turn >= storedChoices.length) {
			setTurn(0);
		} else if (cupNumber > -1) {
			const newCupName = names[storedChoices[turn]].substring(0, 1) === '?'
			? 'you'
			: capitalizeEveryWord(names[storedChoices[turn]]);
			setCupName(
				newCupName
			);
			setCupNumber(storedChoices[turn] + 1);
			const url = `/cups/${encodeURI(names[storedChoices[turn]])}`
			window.history.pushState(null, `${title} - ${newCupName}`, url);
		}
		// only turn and cupNumber probably trigger this
	}, [turn, names, storedChoices, setCupName, cupNumber, setTurn]);
	const randomType =
		cupNumber === -1
			? 0
			: Math.floor(
					Math.random() * translations[lang][drinkType[cupNumber - 1]].length
			  );
	return (
		<main>
			<Helmet>
				<title>{title}</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="stylesheet" href="stylesheet.css" type="text/css" />
				<link rel="image_src" href={'../../static/logo-w.png'} />

				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="what's my starbucks name, starbucks name generator, starbucks cups, baristas, barista fail, misspellings, game, lol, starbucks spelling, what's your starbucks name, justin hook, google feud, quiz, buzzfeed"
				/>
				<meta name="author" content="Justin Hook" />
				<meta name="robots" content="index, nofollow" />

				<meta property="og:type" content="website" />

				<meta property="og:description" content={description} />

				<meta name="twitter:card" content="photo" />
				<meta name="twitter:site" content="@justinhook" />
			</Helmet>
			<div style={{ position: 'absolute', left: '-10000px' }}>
				{description}
			</div>
			<div id="dimmer"></div>
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
				image={
					backgrounds.edges.find(
						(img: any) => img.node.base === `bg${bgImageNum}.jpg`
					).node.childImageSharp.gatsbyImageData
				}
				alt="Background image of Starbucks shop"
			/>
			<div id="wrapper">
				<Link to="/">
					<GatsbyImage
						image={
							logos.edges.find(
								(img: any) => img.node.base === translations[lang].logo
							).node.childImageSharp.gatsbyImageData
						}
						alt="What's My Starbucks Name?"
						imgClassName="logo"
						className="logo"
						loading="eager"
					/>
				</Link>
				<div id="resultswrapper">
					{cupNumber === -1 ? (
						<div id="preresults">
							<p id="preorder">{translations[lang].name}</p>
							<input
								value={nameToTest}
								onChange={(event) => setNameToTest(event.target.value)}
								id="nameInput"
								tabIndex={1}
								onKeyDown={(event) => event.key === 'Enter' && getName()}
							/>
							<button
								type="submit"
								style={{ background: 'none', border: '0', cursor: 'pointer' }}
								onKeyDown={(event) => event.key === 'Enter' && getName()}
								onClick={getName}>
								<StaticImage
									src={'../images/cups.png'}
									id="go"
									tabIndex={2}
									alt="Submit"
									style={{ width: '64px', height: '64px' }}
									imgClassName={nameToTest ? 'enteredText' : 'noEnteredText'}
								/>
							</button>
						</div>
					) : (
						<div id="results">
							<GatsbyImage
								image={
									cups.edges.find(
										(img: any) => img.node.base === cupFileName(cupNumber)
									).node.childImageSharp.gatsbyImageData
								}
								className="coffeepic"
								alt={`${
									translations[lang][drinkType[cupNumber - 1]][randomType]
								} ${translations[lang].for} ${cupName}`}
							/>
							<div id="yourorder">
								{`“${
									translations[lang][drinkType[cupNumber - 1]][randomType]
								} ${translations[lang].for} `}
								<b>{cupName}</b>.”
							</div>
							<div id="resultsmore">
								{!initialCupNumber && (
									<button
										type="submit"
										className="mainButtons"
										onKeyDown={(event) =>
											event.key === 'Enter' && setTurn(turn + 1)
										}
										onClick={() => setTurn(turn + 1)}>
										<StaticImage
											src={'../images/newdrink.png'}
											alt="That's not what I ordered."
											style={{ marginRight: '15px' }}
										/>
										{translations[lang].notWhat}
									</button>
								)}
								<button
									type="submit"
									className="mainButtons"
									onKeyDown={(event) => event.key === 'Enter' && newGame()}
									onClick={newGame}>
									<StaticImage
										src={'../images/exit.png'}
										alt="Try A Different Starbucks."
										style={{ marginRight: '15px' }}
									/>
									{translations[lang].different}
								</button>
							</div>
							<div id="postshare">
								<button
									type="submit"
									onClick={()=>fbShare(cupNumber, cupName)}
									onKeyDown={(event)=>event.key==="Enter" && fbShare(cupNumber, names[storedChoices[turn]])}
									style={{
										background: 'none',
										border: '0',
										cursor: 'pointer',
									}}>
									<StaticImage
										src={'../images/facebook.gif'}
										id="fbbtn"
										alt="Share your results on Facebook."
									/>
								</button>
								<button
									type="submit"
									onClick={()=>twitterShare(cupName)}
									onKeyDown={(event)=>event.key==="Enter" && twitterShare(cupName)}
									style={{
										background: 'none',
										border: '0',
										cursor: 'pointer',
									}}>
									<StaticImage
										src={'../images/twitter.gif'}
										id="twitterbtn"
										alt="Share your results on Twitter."
									/>
								</button>
							</div>
							<div className="clearing"></div>
						</div>
					)}
				</div>
				<div id="footer">
					<div id="sharebuttons"></div>
					<div id="drinksserved">
						Over <span id="totaldrinks">25,000,000</span> drinks served!
					</div>

					<div id="siteby">
						site by{' '}
						<OutboundLink href="https://justinhook.com" target="_blank">
							justin hook
						</OutboundLink>
						. <br />
						<span id="photosby">
							background photo{' '}
							<a
								href="https://creativecommons.org/licenses/by/2.0/legalcode"
								target="_blank">
								<StaticImage
									src={'../images/cc1.svg'}
									alt="Creative Commons"
									imgStyle={{
										position: 'absolute',
										top: '0',
										overflow: 'visible',
									}}
								/>
							</a>{' '}
							<a
								href="https://creativecommons.org/licenses/by/2.0/legalcode"
								target="_blank">
								<StaticImage
									src={'../images/cc2.svg'}
									alt="BY 2.0"
									imgStyle={{
										position: 'absolute',
										top: '0',
										overflow: 'visible',
									}}
								/>
							</a>{' '}
							by{' '}
							<OutboundLink
								href={bgURLs[bgImageNum] ? bgURLs[bgImageNum] : '#'}
								target={bgURLs[bgImageNum] ? '_blank' : '_self'}>
								{bgNames[bgImageNum]}
							</OutboundLink>
							. cup photos provided by{' '}
							<OutboundLink
								href="https://starbucksspelling.tumblr.com/"
								target="_blank">
								jenna livingston
							</OutboundLink>
							{' and '}
							<OutboundLink
								href="https://starbucksnamefail.tumblr.com/"
								target="_blank">
								laurie denness
							</OutboundLink>
							.
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};
export default IndexPage;

export const pageQuery = graphql`
	query {
		site: site {
			siteMetadata {
				description
				title
			}
		}
		logos: allFile(filter: { dir: { regex: "/logos/" } }) {
			edges {
				node {
					base
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
						gatsbyImageData(formats: AUTO)
					}
				}
			}
		}
		backgrounds: allFile(filter: { dir: { regex: "/backgrounds/" } }) {
			edges {
				node {
					base
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
						gatsbyImageData(formats: AUTO)
					}
				}
			}
		}
		cups: allFile(filter: { dir: { regex: "/cups$/" } }) {
			edges {
				node {
					base
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
						gatsbyImageData(formats: AUTO)
					}
				}
			}
		}
	}
`;
