import {parallelLimit} from 'async';
import chalk from 'chalk';
import 'dotenv/config';
import {reduce} from 'lodash';
import cron from 'node-cron';
import {User} from 'twitter-api-client/dist/interfaces/types/FollowersListTypes';
import {checkFollowers} from './src/lib/checkFollowers';
import {typedTwitterClient} from './src/lib/client';
import {renderScene} from './src/lib/renderScene';
import {uploadMediaToTwitter} from './src/lib/uploadMediaToTwitter';

const tweet = async (follower: User) => {
	console.time(follower.screen_name);
	const tweets = await typedTwitterClient.tweets.statusesUserTimeline({
		count: 200,
		include_rts: false,
		exclude_replies: false,
		screen_name: follower.screen_name,
	});

	type InitialValue = {
		likes: number;
		retweets: number;
		letters: number;
	};
	const initialValue: InitialValue = {
		likes: 0,
		retweets: 0,
		letters: 0,
	};

	const stats = reduce(
		tweets,
		(acc, curr) => {
			return {
				likes: acc.likes + curr.favorite_count,
				retweets: acc.retweets + curr.retweet_count,
				letters: acc.letters + curr.text.length,
			};
		},
		initialValue
	);

	const path = await renderScene({
		compositionId: 'Twitter',
		props: {
			name: follower.screen_name,
			stats: {
				...stats,
				tweets: tweets.length,
			},
		},
		onFrameUpdate: (f) => {
			if (f % 50 === 0) {
				console.log('frame ', f);
			}
		},
	});

	if (!path) {
		return;
	}
	const mediaId = await uploadMediaToTwitter(path);

	await typedTwitterClient.tweets.statusesUpdate({
		status: `Hey @${follower.screen_name}, thanks for following @PaoloTiu_. \n\nHere's a cool video, hope you like it!`,
		media_ids: mediaId,
	});

	console.timeEnd(follower.screen_name);
};
const test = async () => {
	const followers = await checkFollowers();

	if (!followers) return;

	// Render at most five videos at once
	parallelLimit(
		followers.map((follower) => {
			return () => tweet(follower);
		}),
		5,
		(err) => {
			if (err) console.error(err);

			console.log(chalk.blue.bgBlack(' -> Cycle Done! <-'));
		}
	);
};

// Runs every minute
cron.schedule('* * * * *', () => {
	test();
});
