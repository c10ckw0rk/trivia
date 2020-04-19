/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Base from '../templates/Base';
import { getQuiz } from '../hooks/api';
import queryString from 'query-string';

const timeout = 30;

const Text = styled.h1`
	text-align: center;
	padding: 5vw;
	box-sizing: border-box;
`;

const Extra = styled.div``;

const Counter = styled.h3`
	position: absolute;
	right: 50vw;
	top: 5vh;
	color: orangered;
`;

const Image = styled.img`
	max-height: 60vh;
	max-width: 90vw;
`;

const AnswersWrapper = styled.div`
	width: 80%;
`;

export default () => {
	const { name: slugName } = queryString.parse(location.search);
	const { current: quiz } = useRef(getQuiz(slugName));
	const [currentQuestion, setCurrentQuestion] = useState({});
	const [currentTime, setCurrentTime] = useState(timeout);
	const ref = React.useRef(0);

	const onKeyDown = e => {
		if (e.keyCode === 32) setCurrentQuestion(getNextQuestion(quiz.questions));
		countDown(timeout);
	};

	const countDown = currentTime => {
		clearTimeout(ref.current);
		if (currentTime > 0) {
			ref.current = setTimeout(() => {
				const nextCurrentTime = currentTime - 1;
				setCurrentTime(nextCurrentTime);
				countDown(nextCurrentTime);
			}, 1000);
		}
	};

	return (
		<div onKeyDown={onKeyDown} style={{ height: '100%', width: '100%' }} tabIndex="0">
			<Base>
				{currentQuestion && (
					<>
						{currentQuestion.Q && (
							<>
								<Text dangerouslySetInnerHTML={{ __html: currentQuestion.Q }} />
								<Extra>
									{currentQuestion.type === 'picture' && <Image src={currentQuestion.picture} alt={''} />}
									{currentQuestion.type === 'youtube' && (
										<iframe
											width="560"
											height="315"
											src={`https://www.youtube.com/embed/${getVidId(currentQuestion.videoFile)}`}
											frameBorder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen={false}
										/>
									)}
								</Extra>
								<p style={{ opacity: currentTime === 0 ? 1 : 0 }}>Press space for next question</p>
								<Counter>{currentTime}</Counter>
							</>
						)}
						{!currentQuestion.Q && (
							<>
								<Text dangerouslySetInnerHTML={{ __html: quiz.name }} />
								<p>Press space to begin</p>
							</>
						)}
					</>
				)}

				{!currentQuestion && (
					<div style={{ width: 800, height: 640, overflow: 'auto' }}>
						{quiz.questions.map((q, i) => {
							return (
								<AnswersWrapper>
									<h2 style={{ marginBottom: 0 }}>Question {i + 1}</h2>
									<p style={{ marginTop: 8 }}>{q.Q}</p>
									<h3 style={{ marginBottom: 0 }}>Answer:</h3>
									<p style={{ marginTop: 8 }}>{q.A}</p>
								</AnswersWrapper>
							);
						})}
					</div>
				)}
			</Base>
		</div>
	);
};

function getVidId(string) {
	const [_, vidQueryString] = string.split('?');
	const { v } = queryString.parse(vidQueryString);
	return v;
}

let count = 0;
function getNextQuestion(questions) {
	const nextQuestion = questions[count];
	count++;
	return nextQuestion;
}
