<template>
  <user-card :userId="selfId"/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import UserCard from "../components/UserCard.vue";
import {usePeer} from '../composables/use-peer';

const {getId} = usePeer();

const selfId = await getId();

</script>
