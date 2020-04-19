import styled from '@emotion/styled';
import React from 'react';
import { css, Global } from '@emotion/core';

const Parent = styled.main`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Special Elite', cursive;
	flex-direction: column;
`;

Base.defaultProps = {
	innerCss: {}
};

export default function Base({ children, innerCss }) {
	return (
		<>
			<Global
				styles={css`
					body,
					html,
					#___gatsby,
					#gatsby-focus-wrapper {
						margin: 0;
						height: 100%;
						width: 100%;
						color: #061125;
						background: #f0eef9;
					}

					* {
						box-sizing: border-box;
					}
				`}
			/>
			<Parent css={innerCss.parent}>{children}</Parent>
		</>
	);
}
