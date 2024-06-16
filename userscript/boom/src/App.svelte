<script lang="ts">
	let isActive: boolean = false;
</script>

<div class="app">
	<label for="toggle">
		<input type="checkbox" name="toggle" bind:value={isActive} />
	</label>
</div>

<style lang="scss">
	.app {
		width: 40px;
		height: 20px;
	}
</style>
