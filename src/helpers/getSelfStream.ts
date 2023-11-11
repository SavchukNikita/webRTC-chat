export function getSelfStream(): Promise<MediaStream> {
	return navigator.mediaDevices.getUserMedia({
		video: true,
		audio: false
	});
}