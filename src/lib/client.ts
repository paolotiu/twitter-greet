import Twitter from 'twitter';
import {TwitterClient} from 'twitter-api-client';

export const twitterClient = new Twitter({
	consumer_key: process.env.TWITTER_API_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET as string,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

export const typedTwitterClient = new TwitterClient({
	apiKey: process.env.TWITTER_API_KEY as string,
	apiSecret: process.env.TWITTER_API_SECRET as string,
	accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
	accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});
