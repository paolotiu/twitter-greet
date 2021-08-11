import React from 'react';
import {
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';
import AppearThenLeft from './AppearThenLeft';
import Center from './Center';

const IntroTitle = styled.h1`
	font-size: 70px;
`;
interface NameStyleProps {
	firstColor: string;
	secondColor: string;
	rotation?: number;
}
const Name = styled(IntroTitle)<NameStyleProps>`
	background: linear-gradient(
		${({firstColor, secondColor, rotation}) =>
			`${rotation}deg, ${firstColor}, ${secondColor}`}
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

interface IntroProps {
	name: string;
}

const Intro = ({name}: IntroProps) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const colorInputRange = [30, 100];
	const color = interpolateColors(frame, colorInputRange, ['violet', 'orange']); // rgba(255, 128, 0, 1)

	const color2 = interpolateColors(frame, colorInputRange, ['blue', 'red']);

	const progress = spring({
		fps,
		frame: frame - 30,
		config: {
			damping: 400,
			mass: 0.5,
		},
	});

	return (
		<>
			<Center>
				<div style={{textAlign: 'center'}}>
					<IntroTitle>
						<AppearThenLeft withSpace order={1} text="Nice" />
						<AppearThenLeft withSpace order={2} text="to" />
						<AppearThenLeft withSpace order={3} text="meet" />
						<AppearThenLeft withSpace order={4} text="you," />
					</IntroTitle>
					<Name
						rotation={190}
						firstColor={color}
						secondColor={color2}
						style={{
							opacity: progress,
							maxHeight: progress * 80,
						}}
					>
						{name}
					</Name>
				</div>
			</Center>
		</>
	);
};

export default Intro;
