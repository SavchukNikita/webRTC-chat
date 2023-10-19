import {ref} from 'vue';

export function useStream() {

	const stream = ref<MediaStream>(new MediaStream());

	const getStreamCallbacks: Function[] = [];

	getSelfStream().then((s) => {
		stream.value = s;

		getStreamCallbacks.forEach((fn) => {
			fn();
		})
	});

	function getSelfStream(): Promise<MediaStream> {
		return navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false
		});
	}

	function streamVideoOnCanvas(canvas: HTMLCanvasElement) {
		if (!stream.value.active) {
			getStreamCallbacks.push(() => streamVideoOnCanvas(canvas));

			return;
		}

		const video = document.createElement('video');

		video.srcObject = stream.value;
		video.play();
		video.onloadeddata = () => {
			const ctx = canvas.getContext('2d');

			function draw() {
				if (!ctx) {
					return;
				}

				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

				requestAnimationFrame(draw);
			}

			draw();
		}
	}

	return {
		getSelfStream,
		streamVideoOnCanvas,
	}
}