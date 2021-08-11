import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {interpolate} from 'remotion';
import React from 'react';

interface Props {
	value: number;
	label: string;
	delay?: number;
}

const Stat = ({label, value, delay = 0}: Props) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const num = interpolate(frame - delay, [0, 30], [0, value], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const opacity = spring({
		fps,
		frame: frame - delay - 2,
		config: {
			damping: 200,
		},
	});
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '50px 0',
				margin: 'auto',
				gap: '50px',
				opacity,
			}}
		>
			<p style={{fontSize: 80}}>{Math.round(num)}</p>
			<p
				style={{
					fontSize: 50,
					textTransform: 'uppercase',
				}}
			>
				{label}
			</p>
		</div>
	);
};

export default Stat;
