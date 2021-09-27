const readlineSync = require('readline-sync');
const chalk = require('chalk');
const gradient = require('gradient-string');
var score = 0;

console.log(chalk.bgHex('#351431').underline(gradient.cristal('              HOW WELL DO YOU KNOW CRICKET?              ')));

const highScores = [
  {
    name: 'Ronak',
    score: '8'
  },
  {
    name: 'Rohit',
    score: '6'
  }
];

const questionsLevelOne = [
  {
    question: `How many players can play from one team in a game ${chalk.magenta('Hint: number')} `,
    answer: '11'
  },
  {
    question: `What is the largest cricket stadium in the world? `,
    answer: 'Narendra Modi Stadium'
  },
  {
    question: `How long is the wicket on a cricket pitch?  ${chalk.magenta('Hint: number yards')} `,
    answer: '22 yards'
  }
];

const questionsLevelTwo = [
  {
    question: 'Who won the first ever Cricket World Cup in 1975? ',
    answer: 'West Indies'
  },
  {
    question: `What is the nickname of Sachin Tendulkar? `,
    answer: 'The Little Master'
  },
  {
    question: 'Which Australian player has scored the most test runs? ',
    answer: 'Ricky Ponting'
  },
  {
    question: `Who is the first batsman to cross 10,000 runs in tests? `,
    answer: 'Sunil Gavaskar'
  },
  {
    question: 'Who bowled the fastest delivery ever of 100.2mph?  ',
    answer: 'Shoaib Akhtar'
  }
];

const game = [
  {
    level: 1,
    question: questionsLevelOne
  },
  {
    level: 2,
    question: questionsLevelTwo
  }
]

function getRandomColor() {
        return chalk.hex(getRandomHexValue());
    }
    
function getRandomHexValue() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return `${color}`;
}

let randomGradient = gradient(getRandomHexValue(), getRandomHexValue(), getRandomHexValue(), getRandomHexValue(), getRandomHexValue(), getRandomHexValue(), getRandomHexValue(), getRandomHexValue());

function welcome(userName){
  console.log(`

  Welcome ${chalk.bgHex('#DEADED').underline(userName)} to ${chalk.italic (gradient.teen('"How well do you know Cricket?"'))}
  
  `)

};


function printQuizStartMessage() {
  console.log(getRandomColor()`
  Are you a true cricket fan and want to check how well do you know about cricket? Well then let's test your cricket knowledge.
  `);
}

function printInstructions() {
  console.log(getRandomColor()`
{magentaBright.bold Instructions}:
    This quiz contains 2 levels: 
    {red.underline Level One}: 
          {bold Level One} will be easy one which will check your basic cricketing knowledge. 
          Level One contains {cyan 3 questions}. Answer them all correctly to unlock {bold Level Two}.
    {red.underline Level Two}:
          {bold Level Two} will be the last level of this quiz. {bold Level Two} contians {cyan 5 questions}. Answer them all correctly and become the quiz champion and get your name printed on our leaderboard.

    {red.underline Note}: Hints will be provided wherever numerical value is expected. For rest you will be typing answers in alphabets. Title / Lower / Upper / IdONtkNOWwhatcaSEIaMTyping casing is not important, ${chalk.italic("if you are having fun.")}. If not, then just stick to answering in lowercase.`);
}

function askQuestions(questions) {
  questions.forEach(
    ques => {
      var userAnswer = readlineSync.question(getRandomColor().bold(ques.question));  
      checkAnswer(userAnswer, ques.answer)
    }
  )
};

function checkAnswer(userAnswer, answer) {
  if(userAnswer.toLowerCase() === answer.toLowerCase()) {
    console.log(chalk.green`
    Right answer.`)
    score++;
  } else {
    console.log(chalk.red`
    Wrong answer.`)
  }
  console.log(chalk`
  Current score: {magenta ${score}}.
  `)
  console.log(chalk.bgRedBright(`
  --------------------------------------`))
  console.log(`
  `);
}

function levelStartMessage(level) {
  
  console.log(getRandomColor().italic`
  Starting level: ${chalk.yellow(level)}...
  `);
}

function printLevelClearedMessage(level) { 
  console.log(chalk.bgBlueBright(`
  ######################################`));
     
  console.log(getRandomColor().italic`

  ${randomGradient('Congrats!!!')} You have cleared level: ${getRandomColor().underline(level)}
  `)
  console.log(chalk.bgBlueBright(`
  ######################################`));
}

function isLevelCleared(game) {
  if(score === game.length) {
    return true;
  }
  return false;
}


function printUserScore() {
    if(score < 4) {
      console.log(chalk.bold.red(`Your final score is: ${score}.`));
    } else {
    console.log(chalk.bold.green(`YAY, Guess you're right. You really know cricket well. You SCORED:  ${score}`));
  }

}

function isHighScore(score) {
  return highScores.some(highscore => score > highscore.score);
}

function updateHighScore(userName, score) {
  if(isHighScore(score)) {
    highScores.push(
      {
        name:userName,
        score: score
      })
  } else {
      console.log(chalk.red("Sorry you didn't make it to high scorers list."))
  }
}

function showHighScore() {
  highScores.map(score => console.log(getRandomColor().italic`${score.name} : ${score.score}`))
}


function toTitleCase(string) {
  return string.split(' ')
   .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
   .join(' ')
  
}


function play(game) {
  printQuizStartMessage();

  var userName = readlineSync.question(chalk.italic.cyan('What\'s your name? '));
  var userNameTitleCase = toTitleCase(userName);
  
  welcome(userNameTitleCase);
  printInstructions();
  for(let i=0; i < game.length; i++ ) {
    levelStartMessage(game[i].level);
    askQuestions(game[i].question);
    
    if(isLevelCleared(game[i].question)) {
      printLevelClearedMessage(game[i].level);

    } else {
      break;
    }

    
  }
  printUserScore();
  updateHighScore(userNameTitleCase, score);
  showHighScore();

}

play(game);