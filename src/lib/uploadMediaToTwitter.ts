import {twitterClient} from './client';

export const uploadMediaToTwitter = async (path: string) => {
	const mediaType = 'video/mp4'; // `'video/mp4'` is also supported
	const mediaData = require('fs').readFileSync(path);
	const mediaSize = require('fs').statSync(path).size;

	const initRes = await initUpload({mediaSize, mediaType});
	await appendUpload({mediaData, mediaId: initRes});
	const mediaId = await finalizeUpload(initRes);

	return mediaId;
};

/**
 * Step 1 of 3: Initialize a media upload
 * @return Promise resolving to String mediaId
 */
function initUpload({
	mediaSize,
	mediaType,
}: {
	mediaSize: number;
	mediaType: string;
}) {
	return makePost('media/upload', {
		command: 'INIT',
		total_bytes: mediaSize,
		media_type: mediaType,
	}).then((data) => data.media_id_string);
}

/**
 * Step 2 of 3: Append file chunk
 * @param String mediaId    Reference to media object being uploaded
 * @return Promise resolving to String mediaId (for chaining)
 */
function appendUpload({mediaData, mediaId}: {mediaId: string; mediaData: any}) {
	return makePost('media/upload', {
		command: 'APPEND',
		media_id: mediaId,
		media: mediaData,
		segment_index: 0,
	}).then((data) => mediaId);
}

/**
 * Step 3 of 3: Finalize upload
 * @param String mediaId   Reference to media
 * @return Promise resolving to mediaId (for chaining)
 */
function finalizeUpload(mediaId: string) {
	return makePost('media/upload', {
		command: 'FINALIZE',
		media_id: mediaId,
	}).then((data) => mediaId);
}

/**
 * (Utility function) Send a POST request to the Twitter API
 * @param String endpoint  e.g. 'statuses/upload'
 * @param Object params    Params object to send
 * @return Promise         Rejects if response is error
 */
function makePost(endpoint: string, params: Record<string, any>) {
	return new Promise<any>((resolve, reject) => {
		twitterClient.post(endpoint, params, (error, data, response) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
}
