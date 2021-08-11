import React from 'react';
import {Audio, Sequence} from 'remotion';
import styled from 'styled-components';
import audio from './audio.mp3';
import Bars from './Bars';
import ding from './ding.mp3';
import './inter.css';
import Intro from './Intro';
import Stats from './Stats';
import ThankYou from './ThankYou';

const Wrapper = styled.div`
	font-family: 'Inter';
	height: 100%;
	width: 100%;
	background-color: white;
`;

interface Props {
	name: string;
	stats: {
		tweets: number;
		likes: number;
		retweets: number;
		replies: number;
	};
}
const TwitterScene = ({name, stats}: Props) => {
	return (
		<Wrapper>
			<Sequence durationInFrames={75} from={0}>
				<Intro name={name} />
			</Sequence>

			<Sequence durationInFrames={75} from={75}>
				<ThankYou />
			</Sequence>

			<Sequence durationInFrames={35} from={150}>
				<Bars />
			</Sequence>

			<Sequence durationInFrames={Infinity} from={175}>
				<Stats {...stats} />
			</Sequence>
			<Sequence from={0} durationInFrames={128}>
				<Audio
					src={audio}
					startFrom={8}
					volume={0.3}
					// muted={frame > 126 && frame < 140}
				/>
			</Sequence>
			<Sequence from={140} durationInFrames={Infinity}>
				<Audio
					src={audio}
					startFrom={134}
					volume={0.3}
					// muted={frame > 126 && frame < 140}
				/>
			</Sequence>

			<Sequence from={129} durationInFrames={15}>
				<Audio src={ding} volume={0.7} />
			</Sequence>
		</Wrapper>
	);
};

export default TwitterScene;
