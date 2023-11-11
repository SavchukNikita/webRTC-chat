import {computed, MaybeRefOrGetter, ref, toValue, watch} from 'vue';


const streams = ref(new Map<string, MediaStream>());

export function setStream(key: string, stream: MediaStream) {
	streams.value.set(key, stream);
}

export function useStream(streamId: string) {
	const stream = computed<MediaStream>(() => {
		return streams.value.get(streamId) ?? new MediaStream()
	});

	const streamStartedCallback: Function[] = [];

	function streamVideo(video: MaybeRefOrGetter<HTMLVideoElement>) {
		if (!stream.value.active) {
			streamStartedCallback.push(() => streamVideo(video));

			return;
		}

		const videoValue = toValue(video);

		videoValue.srcObject = stream.value;
		videoValue.play();
	}


	watch(stream, () => {
		if (stream) {
			streamStartedCallback.forEach((f) => f());
		}
	})

	return {
		streamVideo,
	}
}