import os from 'os';
import {Config} from 'remotion';

Config.Rendering.setImageFormat('jpeg');
Config.Output.setOverwriteOutput(true);

// Use all threads
Config.Rendering.setConcurrency(os.cpus.length);
