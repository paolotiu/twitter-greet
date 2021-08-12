import {differenceWith} from 'lodash';
import {typedTwitterClient} from './client';
import {prisma} from './prisma';

export const checkFollowers = async () => {
	const user = await prisma.user.findUnique({
		where: {id: 1},
		include: {followers: true},
	});

	if (!user) return;

	const {followers: existingFollowers} = user;

	const followers = await typedTwitterClient.accountsAndUsers.followersList({
		count: 200,
		screen_name: 'PaoloTiu_',
	});

	const newFollowers = differenceWith(
		followers.users,
		existingFollowers,
		(a, b) => a.id_str === b.twitterId
	);

	if (newFollowers.length) {
		// Update twitter followers
		await prisma.user.update({
			data: {
				followers: {
					connectOrCreate: newFollowers.map((user) => ({
						create: {twitterId: user.id_str, twitterUsername: user.screen_name},
						where: {
							twitterId: user.id_str,
						},
					})),
				},
			},
			where: {
				id: user.id,
			},
		});
	}

	return newFollowers;
};
