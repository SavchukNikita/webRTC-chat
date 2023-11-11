<template>
	<div class="user-card">
		<video
				class="user-card__video-output"
				ref="videoOutput"
		></video>
		<div class="user-card__name"></div>
	</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useStream} from '../composables/use-stream';

interface Props {
	userId: string,
}

const props = defineProps<Props>();

const {streamVideo} = useStream(props.userId);

const videoOutput = ref<HTMLVideoElement>();


onMounted(() => {
	streamVideo(videoOutput.value!);
})

</script>

<style lang="scss">
.user-card {
	position:         relative;
	display:          flex;
	align-items:      center;
	justify-content:  center;
	background-color: $color-brand-3;

	&__name {
		font-size: $font-size-xs;
	}

	&__video-output, &__img {
	}

	&__video-output {
		height: 100%;
		width: 100%;
	}
}
</style>