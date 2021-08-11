import {interpolate} from 'remotion';
import {spring} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useCurrentFrame} from 'remotion';
import React from 'react';

interface Props {
	order: number;
	height: number;
	direction: 'left' | 'right';
}

const Bar = ({order, height, direction}: Props) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: frame - order,
		fps,
		config: {
			mass: 0.1,
			damping: 200,
		},
	});
	const interp = interpolate(progress, [0, 1], [100, 0]);
	const interp2 = interpolate(progress, [0, 1], [0, 100]);
	return (
		<div
			style={{
				backgroundColor: '#1DA1F2',
				marginLeft: direction === 'right' ? `${interp}%` : undefined,
				width: direction === 'left' ? `${interp2}%` : '100%',
				height: height + 2,
				marginTop: -1,
				marginBottom: -1,
			}}
		/>
	);
};

export default Bar;
