<script lang="ts" setup>
import {useRouter} from 'vue-router';
import {usePeer} from "../composables/use-peer";

const {push} = useRouter();
const {openRoom} = usePeer();

async function createRoom() {
  const roomId = await openRoom();

  console.log(roomId)

  await push({name: 'room', params: {roomId}});
}

</script>

<template>
  <div class="wrp">
    <div class="panel">
      <div class="panel__main">
        <button
            class="base-btn base-btn_outlined color-brand-1 base-btn_small"
            @click="createRoom">
          Начать звонок
        </button>
        <div> ИЛИ </div>
        <input
            class="base-input base-input_outlined"
            placeholder="Введите код собрания"
            type="text"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrp {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  &__main {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}

</style>
