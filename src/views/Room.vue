<template>
	<div class="room">
		<div class="room__layout">
			<user-card :userId="selfId"/>
			<user-card v-if="incomingId" :userId="incomingId"/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {MediaConnection} from 'peerjs';
import {computed, ref} from 'vue';
import UserCard from "../components/UserCard.vue";
import {useRoute} from 'vue-router';
import {usePeer} from '../composables/use-peer.ts';
import {setStream} from '../composables/use-stream.ts';
import {getSelfStream} from '../helpers/getSelfStream.ts';

const {params}                          = useRoute();
const {getId, listenIncomingCall, call} = usePeer()

const incomingConnection = ref<MediaConnection | null>(null);

const incomingId = computed<string>(() => {
	return incomingConnection.value?.peer ?? '';
})

const roomId     = String(params.roomId);
const selfId     = await getId();
const selfStream = await getSelfStream() ?? new MediaStream();

setStream(selfId, selfStream);

if (selfId === roomId) {
	listenIncomingCall().then((incoming) => {
		incomingConnection.value = incoming;

		incomingConnection.value.answer(selfStream);

		setConnectionListeners();
	})
}
else {
	incomingConnection.value = call(roomId, selfStream);

	setConnectionListeners();
}

function setConnectionListeners() {
	incomingConnection.value?.on('stream', (stream) => {
		setStream(incomingConnection.value!.peer, stream);
	})

	incomingConnection.value?.on('close', () => {
		incomingConnection.value = null;
	})
}


</script>

<style lang="scss">
.room {
	&__layout {
		display: flex;
	}
}
</style>