// const quizzes = [
// 	{
// 		name: `Dan's Quiz`,
// 		questions: [
// 			{
// 				Q: 'Who sung this song?',
// 				A: 'Julie Andrews',
// 				videoFile: 'https://www.youtube.com/embed/5fH2FOn1V5g?start=0s&end=3s&autoplay=true&showinfo=0'
// 			},
// 			{
// 				Q: `How many 3 letter words starting with the letter Z can you list in 30 seconds`,
// 				A: 'Zag Zap Zas Zax Zed Zee Zek Zep Zig Zin Zip Zit Zoa Zoo Zuz Zzz'
// 			},
// 			{
// 				Q: 'What country is this flag from',
// 				A: 'switzerland',
// 				picture: 'https://kids.kiddle.co/images/f/f3/Flag_of_Switzerland.svg'
// 			},
// 			{
// 				Q: 'In which country did the easter bunny originate?',
// 				A: 'Germany'
// 			},
// 			{
// 				Q: `DAD JOKE: What do you call it when worms take over the world?`,
// 				A: `Global worming`
// 			},
// 			{
// 				Q: 'How many albums did the late slim Dusty record?',
// 				A: 103
// 			},
// 			{
// 				Q: 'Where was Ned Kelly’s last stand?',
// 				A: 'Glenrowan'
// 			},
// 			{
// 				Q: `In rhyming slang, if someone said I'm going to have a “bo-peep”, what are they doing?`,
// 				A: 'Having a sleep'
// 			},
// 			{
// 				Q: 'What is the name of this character from an iconic disney movie',
// 				A: 'Kristof',
// 				picture: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Kristoff_Bjorgman.png'
// 			},
// 			{
// 				Q: 'In what war movie from 2019 would you hear this song?',
// 				A: '1917',
// 				videoFile: 'https://www.youtube.com/embed/PIuWTkRvn00?start=0s&end=3s&autoplay=true&showinfo=0'
// 			},
// 			{
// 				Q: 'Which former Australian Prime Minister set a beer drinking world record?',
// 				A: 'Bob Hawke—drinking 2.5 pints in 11 seconds.'
// 			},
// 			{
// 				Q: 'When an Aussie tried selling New Zealand on eBay, what was the starting price?',
// 				A: '1 cent'
// 			},
// 			{
// 				Q: 'DAD JOKE: What do you call a line of rabbits marching backwards?',
// 				A: 'A receding hareline'
// 			},
// 			{
// 				Q: 'Whats the next words in this song, "I don\'t want nobody else I love you, She\'s lying"',
// 				A: "There won't be somebody else and that's true\", She's lying"
// 			},
// 			{
// 				Q: 'What are the names of the actors in the photo below',
// 				A: 'Jane Turner, Gina Riley, magda szubanski, Glen Robbins, Peter Rowsthorn',
// 				picture:
// 					'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-9/17904091_440097249659042_5317202538138596291_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=vcbmIEye3hYAX94VgcJ&_nc_ht=scontent-syd2-1.xx&oh=c9f176e505040d8d9489da27e5a17d86&oe=5EB72B5E'
// 			},
// 			{
// 				Q: 'Where did the coronavirus outbreak of 2019-2020 originate?',
// 				A: 'Wuhan, China',
// 				picture: 'https://cdn.mos.cms.futurecdn.net/JtVH5Khvihib7dBDFY9ZDR.jpg'
// 			},
// 			{
// 				Q: 'How many cases of carona virus were found at 50 Jedda rd',
// 				A: '12'
// 			},
// 			{
// 				Q: `DAD JOKE: Why shouldn't you fart in an Apple Computers store?`,
// 				A: `They dont have windows`
// 			},
// 			{
// 				Q:
// 					'What is the national flower of Australia? <br> A. Banksia <br> B. Waratah <br> C. Golden Wattle <br> D. Blue Gum',
// 				A: 'Golden Wattle'
// 			},
// 			{
// 				Q: 'The general term for native Australian flora and fauna used as a source of food is b___ t_____',
// 				A: 'Bush Tucker'
// 			},
// 			{
// 				Q:
// 					'Australia has participated in every summer Olympics of the modern era, and every Commonwealth games? <br> True or False?',
// 				A: 'True'
// 			},
// 			{
// 				Q: 'Who is credited with giving this continent the name "Australia"?',
// 				A: 'Mathew Flinders'
// 			},
// 			{
// 				Q: 'What year did television Broadcast in Australia?',
// 				A: '1956'
// 			}
// 		]
// 	},
// 	{
// 		name: `Pa's Quiz`,
// 		questions: []
// 	}
// ];

import { slugify } from '../util/slugify';

export function getQuizzes() {
	return JSON.parse(localStorage.getItem('quizzes') || '[]');
}

export function getQuiz(slugName) {
	const quizzes = getQuizzes();
	return (quizzes || []).find(({ name: quizName }) => slugName === slugify(quizName));
}

export function addQuiz(name, questions = []) {
	const quizzes = getQuizzes();
	const newQuiz = {
		name,
		questions
	};
	quizzes.push(newQuiz);
	localStorage.setItem('quizzes', JSON.stringify(quizzes));
	return quizzes;
}

export function removeQuiz(name, questions = []) {
	const quizzes = getQuizzes();
	const newQuiz = {
		name,
		questions
	};
	quizzes.push(newQuiz);
	localStorage.setItem('quizzes', JSON.stringify(quizzes));
	return quizzes;
}

export function setQuiz(quiz) {
	const quizzes = getQuizzes();
	const i = quizzes.findIndex(({ name }) => name === quiz.name);
	if (i !== -1) quizzes[i] = quiz;
	else throw Error('Quiz does not exist');
	localStorage.setItem('quizzes', JSON.stringify(quizzes));
}
