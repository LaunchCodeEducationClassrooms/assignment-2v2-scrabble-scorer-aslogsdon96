// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let testWord = "";

function initialPrompt() {
  console.log("Let's play some Scrabble!\n")
   const input = require('readline-sync');
   testWord = input.question("Enter a word to score:");
   return testWord;
};

function simpleScore(testWord) {
  let simplePoints = testWord.length;
  return simplePoints;
}

function getVowelCount(testWord) {
let vowelList = 'AEIOUaeiou'
let vowelsCount = 0;

 for(var i = 0; i < testWord.length ; i++) {
    if (vowelList.indexOf(testWord[i]) !== -1) {
      vowelsCount += 1;
    }
  }
  return vowelsCount;
}

function vowelBonusScore(testWord) {
  let vowelBonusScore = simpleScore(testWord)+(2*(getVowelCount(testWord)));
  return vowelBonusScore;
}

function transform(obj) {
  let transformationObj = {};
  for (item in obj) {
    for (i = 0; i < oldPointStructure['1'].length; i++) {
      transformationObj[oldPointStructure['1'][i].toLowerCase()]= 1;
    }
    for (i = 0; i < oldPointStructure['2'].length; i++) {
      transformationObj[oldPointStructure['2'][i].toLowerCase()] = 2;
    }
    for (i = 0; i < oldPointStructure['3'].length; i++) {
      transformationObj[oldPointStructure['3'][i].toLowerCase()] = 3;
    }
    for (i = 0; i < oldPointStructure['4'].length; i++) {
      transformationObj[oldPointStructure['4'][i].toLowerCase()] = 4;
    }
    for (i = 0; i < oldPointStructure['5'].length; i++) {
      transformationObj[oldPointStructure['5'][i].toLowerCase()] = 1;
    }
    for (i = 0; i < oldPointStructure['8'].length; i++) {
      transformationObj[oldPointStructure['8'][i].toLowerCase()] = 8;
    }
    for (i = 0; i < oldPointStructure['10'].length; i++) {
      transformationObj[oldPointStructure['10'][i].toLowerCase()] = 10;
    }
  }
 return transformationObj;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(testWord) {
  testWord = testWord.toLowerCase();
  let scrabblePoints = 0;

  for (i = 0; i < testWord.length; i++) {
    let letter = testWord[i];
    scrabblePoints += newPointStructure[letter];
  }
  return scrabblePoints;
};

const scoringAlgorithms = [
  {
    name: "0 - Simple",
    description: "One point per character",
    scorerFunction: simpleScore
  },
  {
    name: "1 - Vowel Bonus",
    description: "Vowels are worth 3 points",
    scorerFunction: vowelBonusScore
  },
  {
    name: "2 - Scrabble",
    description: "Uses scrabble point system",
    scorerFunction: scrabbleScore
  }
];

let scoringSystemSelection = NaN;

function scorerPrompt() {
  const input = require('readline-sync');
   scoringSystemSelection = input.question(`Which scoring algorithm would you like to use?\n\n${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\nEnter 0, 1, or 2: `);
  return scoringSystemSelection;
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
   if (scoringSystemSelection == 0) {
     console.log(`Score for '${testWord}': ` + scoringAlgorithms[0].scorerFunction(testWord));
   } else if (scoringSystemSelection == 1) {
     console.log(`Score for '${testWord}': ` + scoringAlgorithms[1].scorerFunction(testWord));
   } else if (scoringSystemSelection == 2) {
     console.log(`Score for '${testWord}': ` + scoringAlgorithms[2].scorerFunction(testWord));
   }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

