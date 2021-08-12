import {bundle} from '@remotion/bundler';
import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';
import fs from 'fs';
import os from 'os';
import path from 'path';

interface RenderSceneOptions {
	compositionId: string;
	onError?: () => void;
	onFrameUpdate?: (f: number) => void;
	props: Record<string, any>;
}
export const renderScene = async ({
	compositionId,
	onError,
	onFrameUpdate,
	props,
}: RenderSceneOptions) => {
	const bundled = await bundle(path.join(__dirname, '../', 'src/index.tsx'));

	const comps = await getCompositions(bundled);

	const videoMeta = comps.find((c) => c.id === compositionId);

	if (!videoMeta) {
		if (onError) {
			onError();
		}
		return;
	}

	const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'remotion-'));

	const {assetsInfo} = await renderFrames({
		// The video config consisting out of width, height, durationInFrames and fps
		config: videoMeta,

		// location of webpack bundle
		webpackBundle: bundled,

		// A callback that fires after the setup process (validation, browser launch) has finished.
		onStart: () => console.log('Rendering frames...'),

		// Callback funtion that gets called after each frame finished
		onFrameUpdate: (f) => {
			if (onFrameUpdate) {
				onFrameUpdate(f);
			}
		},

		// Number of frames should be rendered in parallel
		// Null to let Remtion decide
		parallelism: null,

		outputDir: tmpDir,

		// Props given to the component
		inputProps: props,

		// Id of the chosen composition
		compositionId,

		// jpeg or png
		imageFormat: 'jpeg',
	});

	const finalOutputPath = path.join(tmpDir, 'out.mp4');

	await stitchFramesToVideo({
		dir: tmpDir,
		force: true,
		fps: videoMeta.fps,
		height: videoMeta.height,
		width: videoMeta.width,
		outputLocation: finalOutputPath,
		imageFormat: 'jpeg',
		assetsInfo,
	});

	return finalOutputPath;
};
