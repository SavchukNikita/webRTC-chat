<script setup lang="ts">

</script>

<template>
	<div class="page">
    <Suspense>
			<router-view/>
		</Suspense>
  </div>
</template>

<style scoped>
  .page {
    height: 100vh;
  }
</style>
