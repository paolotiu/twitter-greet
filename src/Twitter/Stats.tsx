import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import styled from 'styled-components';
import AppearThenLeft from './AppearThenLeft';
import Stat from './Stat';

const Container = styled(AbsoluteFill)`
	* {
		margin: 0;
	}
`;

interface Props {
	tweets: number;
	likes: number;
	retweets: number;
	replies: number;
}

const INITIAL_DELAY = 30;

const Stats = ({likes, replies, retweets, tweets}: Props) => {
	return (
		<Container style={{backgroundColor: '#1DA1F2'}}>
			<Sequence durationInFrames={100} from={0}>
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						padding: '3rem',
						fontSize: '70px',
						color: 'white',
					}}
				>
					<AppearThenLeft
						order={1}
						text="While you're here."
						style={{fontWeight: 'bold'}}
					/>
					<AppearThenLeft
						order={8}
						text="Let's look at some cool stats."
						style={{fontWeight: 'bold'}}
					/>
				</div>
			</Sequence>

			<Sequence durationInFrames={240} from={100}>
				<div
					style={{
						padding: '3rem',
						color: 'white',
						paddingTop: '2.6rem',
						margin: 'auto',
					}}
				>
					<AppearThenLeft
						order={1}
						style={{
							fontSize: '50px',
						}}
					>
						<p>
							Your past{' '}
							<span style={{fontWeight: 600, fontSize: '.8em'}}>{tweets}</span>{' '}
							tweets got
						</p>
					</AppearThenLeft>
					<Stat value={likes} label="likes" delay={INITIAL_DELAY} />
					<Stat value={retweets} label="retweets" delay={INITIAL_DELAY + 50} />
					<Stat value={replies} label="replies" delay={INITIAL_DELAY + 100} />
				</div>
			</Sequence>
			<Sequence durationInFrames={Infinity} from={340}>
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						padding: '3rem',
						fontSize: '70px',
						color: 'white',
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<AppearThenLeft
						order={1}
						text="That's pretty cool!"
						style={{fontWeight: 'bold'}}
					/>
				</div>
			</Sequence>
		</Container>
	);
};

export default Stats;
