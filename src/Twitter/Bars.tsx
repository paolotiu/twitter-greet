import {useVideoConfig, Sequence} from 'remotion';
import React from 'react';
import Bar from './Bar';

const NUM_BARS = 10;
const WhileYoureHere = () => {
	const {height} = useVideoConfig();
	return (
		<div style={{width: '100%'}}>
			{new Array(NUM_BARS).fill(0).map((_, i) => (
				<Bar
					key={i + _}
					order={i + 1}
					height={height / NUM_BARS}
					direction={i % 2 ? 'left' : 'right'}
				/>
			))}
		</div>
	);
};

export default WhileYoureHere;
