export const shuffleNumbers = (tempArray: number[]): number[] => {
const array = [...tempArray]
	let currentIndex = array.length;
	let randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

export const syllableCount = (word: string): number => {
	// both of these are suspect
	const cleanWord = word.replace(/\W/g, '').toLowerCase();
	if (cleanWord.length <= 3) {
		return 1;
	}
	const syllables = word
		.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
		.replace(/^y/, '')
		.match(/[aeiouy]{1,2}/g);

	return syllables === null ? 0 : syllables.length;
};

export const cupFileName = (jpgNum: number) => {
	if (jpgNum < 10) return `000${jpgNum}.jpg`;
	if (jpgNum > 9 && jpgNum < 100) return `00${jpgNum}.jpg`;
	if (jpgNum > 99 && jpgNum < 1000) return `0${jpgNum}.jpg`;
	return `${jpgNum}.jpg`;
};

export const capitalizeEveryWord = (name: string) =>{
	const words = name.split(" ");
return words.map((word) => { 
    return word[0].toUpperCase() + word.substring(1); 
}).join(" ");
}

export const twitterShare = (cupName: string)=>window.open(`https://twitter.com/intent/tweet?text=${cupName ? `My Starbucks name is "${cupName}." What's yours?` : "What's your Starbucks name?"}&url=https://whatsmystarbucksname.com/${cupName && `cups/${encodeURI(cupName.toLowerCase())}`}&related=${encodeURI("justinhook,Developer")}`, "Share Your Cup on Twitter", 'width=600,height=400,scrollbars=no'); 

export const fbShare = (cupNumber : number, cupName : string)=>{
const encodedCupName = encodeURI(cupName.toLowerCase());
if ("FB" in window === false){
return console.error("fb sdk failed to load");
}
	 window.FB.ui({
        method: 'feed',
        link: `https://whatsmystarbucksname.com/cup/${encodedCupName}`,
        name: cupName ? `My Starbucks name is "${cupName}." What's yours?` : "How will the barista misspell your name?" ,
        caption: 'What\'s My Starbucks Name?',
        picture: `https://whatsmystarbucksname.com/c/${cupFileName(cupNumber)}.jpg`,

    });
};