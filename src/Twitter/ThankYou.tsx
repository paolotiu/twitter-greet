import React from 'react';
import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';
import AppearThenLeft from './AppearThenLeft';
import Center from './Center';
import heart from './heart.png';

const ThankYouTitle = styled.h1`
	font-size: 70px;
`;

const heartSize = 60;
const ThankYou = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		frame: frame - 54,
		fps,
		config: {
			mass: 0.3,
		},
	});

	return (
		<Center style={{textAlign: 'center'}}>
			<ThankYouTitle>
				<AppearThenLeft withSpace order={1} text="Thank" />
				<AppearThenLeft withSpace order={2} text="you" />
				<AppearThenLeft withSpace order={3} text="for" />
				<AppearThenLeft withSpace order={4} text="following" />
				<AppearThenLeft order={5} text="me" />
				<br />
				<Img
					src={heart}
					width={heartSize}
					height={heartSize}
					style={{
						marginTop: 10,
						transform: `scale(${scale})`,
					}}
				/>
			</ThankYouTitle>
		</Center>
	);
};

export default ThankYou;
