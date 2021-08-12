import {Composition} from 'remotion';
import TwitterScene from './Twitter/TwitterScene';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Twitter"
				component={TwitterScene}
				durationInFrames={600}
				fps={30}
				width={720}
				height={720}
				defaultProps={{
					name: 'Paolo Tiu',
					stats: {
						likes: 100,
						retweets: 100,
						tweets: 100,
						letters: 12039,
					},
				}}
			/>
		</>
	);
};
