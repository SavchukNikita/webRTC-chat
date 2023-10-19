<script setup lang="ts">

</script>

<template>
	<div class="page">
		<Suspense>
			<router-view/>
		</Suspense>
	</div>
</template>

<style lang="scss">
@import './style/variables.scss';
@import './style/index.scss';

.page {
	height: 100vh;
}
</style>
