import Base from '../templates/Base';
import React, { useRef, useState } from 'react';
import { css } from '@emotion/core';
import { getQuiz, setQuiz } from '../hooks/api';
import queryString from 'query-string';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { slugify } from '../util/slugify';

const textStyles = css`
	height: 40px;
	min-width: 240px;
	padding: 12px 8px;
	border: 1px solid #606774;
	transition: border-color 200ms, color 200ms, background-color 200ms;
	background-color: white;
	border-radius: 4px;
	margin-right: 24px;
	margin-bottom: 24px;
	color: #061125;
	/* fix for firefox error state */
	box-shadow: none;

	&:focus {
		border-color: #6f58c4;
	}

	&:disabled {
		opacity: 0.5;
		border-color: #606774;
		background-color: white;

		&::placeholder {
			opacity: 0.6;
		}
	}

	&::placeholder {
		transition: opacity 0.2s;

		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #606774;
		opacity: 1; /* Firefox */
	}

	&::-ms-input-placeholder {
		/* Microsoft Edge */
		color: #606774;
	}
`;

const QuizTitle = styled.h1`
	display: flex;
	flex-wrap: wrap;
	color: #061125;
	font-weight: bold;
	align-items: center;
	line-height: 24px;
	margin-bottom: 56px;
`;

const TextInput = styled.input`
	${textStyles}
`;

const TextArea = styled.textarea`
	${textStyles};
	width: 480px;
	height: 72px;
	margin-bottom: 8px;
`;

const Select = styled.select`
	display: flex;
	min-width: 240px;
	align-items: center;
	height: 40px;
	border-radius: 4px;
	font-size: 14px;
	border: 1px solid #606774;
	background: white;
	margin-bottom: 16px;
`;

const QuestionWrapper = styled.div`
	margin-bottom: 48px;
	border-radius: 8px;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	padding: 24px;
	background: white;
`;

const QuestionTitle = styled.h3``;

const CloseButton = styled.button`
	background: none;
	border: none;
	font-family: 'Special Elite', cursive;
	font-size: 20px;
`;

const Bar = styled.div`
	display: flex;
	justify-content: space-between;
`;

const BottomBar = styled(Bar)`
	display: flex;
	justify-content: space-around;
`;

const AddQuestion = styled(CloseButton)`
	border-radius: 8px;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
	background: white;
	padding: 8px;
`;

const PlayQuiz = styled(AddQuestion)`
	margin-left: 24px;
	color: #061125;
	text-decoration: none;
`.withComponent(Link);

export default function EditQuiz({ location }) {
	const { name: slugName } = queryString.parse(location.search);
	const quiz = useRef(getQuiz(slugName));
	const [questions, setQuestions] = useState(quiz.current.questions);

	const addQuestion = () => {
		setQuestions([
			...questions,
			{
				Q: '',
				A: '',
				videoFile: '',
				picture: '',
				type: 'text'
			}
		]);
	};

	const removeQuestion = index => () => {
		const questionsClone = [...questions];
		questionsClone.splice(index, 1);
		setQuestions(questionsClone);
		setQuiz({
			...quiz.current,
			questions: questionsClone
		});
	};

	const onQuestionChange = (question, i) => {
		const questionsClone = [...questions];
		questionsClone[i] = question;
		setQuestions(questionsClone);
		setQuiz({
			...quiz.current,
			questions: questionsClone
		});
	};

	return (
		<Base
			innerCss={{
				parent: css`
					height: auto;
					padding: 48px;
				`
			}}>
			<QuizTitle>{quiz.current.name}</QuizTitle>
			{questions.map((question, i) => (
				<Question key={i} question={question} index={i} onRemove={removeQuestion(i)} onChange={onQuestionChange} />
			))}
			<BottomBar>
				<AddQuestion onClick={addQuestion}>Add Question</AddQuestion>
				<PlayQuiz to={`/play-quiz?name=${slugify(quiz.current.name)}`}>Play Quiz</PlayQuiz>
			</BottomBar>
			<div />
		</Base>
	);
}

function Question(props) {
	const onQuestionChange = update => {
		props.onChange(
			{
				Q: props.question.Q,
				A: props.question.A,
				picture: props.question.picture,
				videoFile: props.question.videoFile,
				type: props.question.type,
				...update
			},
			props.index
		);
	};

	const getAdditionalInput = () => {
		switch (props.question.type) {
			case 'youtube':
				return (
					<TextInput
						onChange={e => {
							onQuestionChange({
								videoFile: e.target.value
							});
						}}
						type={'text'}
						placeholder={'youtube link'}
						value={props.question.videoFile}
					/>
				);
			case 'picture':
				return (
					<TextInput
						onChange={e => {
							onQuestionChange({
								picture: e.target.value
							});
						}}
						type={'text'}
						placeholder={'https://your.image.com'}
						value={props.question.picture}
					/>
				);
			default:
				return '';
		}
	};

	return (
		<QuestionWrapper>
			<Bar>
				<QuestionTitle>Question {props.index + 1}</QuestionTitle>
				<CloseButton onClick={props.onRemove}>X</CloseButton>
			</Bar>
			<Select
				value={props.question.type}
				onChange={e => {
					onQuestionChange({
						type: e.target.value
					});
				}}>
				<option value={'text'}>Text</option>
				<option value={'youtube'}>Youtube</option>
				<option value={'picture'}>Picture</option>
			</Select>
			<div>
				<TextArea
					onChange={e => {
						onQuestionChange({
							Q: e.target.value
						});
					}}
					type={'text'}
					placeholder={'Type your question here'}
					value={props.question.Q}
				/>
				<TextArea
					onChange={e => {
						onQuestionChange({
							A: e.target.value
						});
					}}
					type={'text'}
					placeholder={'Type your answer here'}
					value={props.question.A}
				/>
			</div>
			{getAdditionalInput()}
		</QuestionWrapper>
	);
}
