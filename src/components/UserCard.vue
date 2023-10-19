<template>
	<div class="user-card">
		<canvas
				ref="videoOutput"
				class="user-card__video-output"
				width="400"
				height="300"
		></canvas>
		<div class="user-card__name"></div>
	</div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {useStream} from '../composables/use-stream';

interface Props {
	userId: string,
}

const props = defineProps<Props>();

const {streamVideoOnCanvas} = useStream();

const videoOutput = ref<HTMLCanvasElement>();


onMounted(async () => {
	streamVideoOnCanvas(videoOutput.value!);
})
</script>

<style lang="scss">
.user-card {
	position:         relative;
	display:          flex;
	align-items:      center;
	justify-content:  center;
	background-color: $color-brand-3;
	width: 400px;
	height: 300px;

	&__name {
		font-size: $font-size-xs;
	}

	&__video-output, &__img {
	}

	&__video-output {

	}
}
</style>