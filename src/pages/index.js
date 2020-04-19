import React, { useState } from 'react';
import { addQuiz, getQuizzes } from '../hooks/api';
import styled from '@emotion/styled';
import Base from '../templates/Base';
import { Link } from 'gatsby';
import { slugify } from '../util/slugify';
import { css } from '@emotion/core';

const cardStyle = css`
	background-color: white;
	border-radius: 4px;
	padding: 0 24px;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	height: 64px;
	min-width: 240px;
	align-self: auto;
	margin-right: 24px;
	margin-bottom: 24px;
	appearance: none;
	display: flex;
	flex-direction: column;
	text-decoration: none;
	justify-content: center;
`;

const QuizCard = styled(props => <Link {...props} />)`
	${cardStyle}
`;

const QuizCardButton = styled.button`
	${cardStyle}
`;

const QuizCardTitle = styled.h2`
	display: flex;
	flex-wrap: wrap;
	color: #061125;
	font-size: 16px;
	align-items: center;
	line-height: 24px;
	margin-bottom: 0;
	margin-top: 0;
	font-weight: normal;
	font-family: 'Special Elite', cursive;
`;

const Parent = styled.div`
	flex-direction: row;
	height: 80%;
	width: 80%;
	display: flex;
`;

export default function Index() {
	const [quizzes, setQuizzes] = useState(getQuizzes());

	const onClick = () => {
		setQuizzes(addQuiz('Quiz ' + (quizzes.length + 1)));
	};

	return (
		<Base>
			<Parent>
				{(quizzes || []).map(quiz => (
					<QuizCard to={'edit-quiz?name=' + slugify(quiz.name)} key={quiz.name}>
						<QuizCardTitle>{quiz.name}</QuizCardTitle>
					</QuizCard>
				))}
				<QuizCardButton onClick={onClick}>
					<QuizCardTitle>New Quiz +</QuizCardTitle>
				</QuizCardButton>
			</Parent>
		</Base>
	);
}
