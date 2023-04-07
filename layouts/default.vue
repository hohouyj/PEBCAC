<template>
	
		<div>
			<header class="shadow-sm bg-white">
				<nav class="container mx-auto p-4 flex justify-between">
					<NuxtLink to="/" class="font-bold">PEBCAC</NuxtLink>
					<ul class="flex gap-4">
						<li>
							<NuxtLink to="/battlegroups">Battlegroups</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/dock">Dock</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/compendium">Compendium</NuxtLink>
						</li>
					</ul>
				</nav>
			</header>
		</div>
		<v-container>
		<div class="container mx-auto p-4">
			<slot />
		</div>
	</v-container>
</template>

<style>
.router-link-exact-active {
	color: #12b488;
}
</style>