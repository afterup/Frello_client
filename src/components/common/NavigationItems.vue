<template>
	<div class="navigation" v-if="!isAuthenticated">
		<router-link :to="'login'" tag="div" @click="openModal">
			<BaseBtn class="navigation__login">Login</BaseBtn>
		</router-link>
		<router-link :to="'signup'" tag="div" @click="openModal">
			<BaseBtn class="navigation__signup">Sign Up</BaseBtn>
		</router-link>
	</div>
	<div class="navigation" v-else>
		<Dropdown>
			<BaseIcon
				class="user__icon"
				slot="button"
				:username="currentUser.username"
				:size="30"
			/>
			<div slot="name">{{ currentUser.username }}</div>
			<template>
				<hr />
				<li>Setting</li>
				<li>Logout</li>
			</template>
		</Dropdown>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			isShowUserContent: false,
		};
	},
	props: {
		isAuthenticated: {
			type: Boolean,
			required: true,
		},
		currentUser: {
			type: Object,
			required: false,
		},
	},
	components: {
		Dropdown: () => import('@/components/ui/Dropdown'),
	},
	computed: {
		...mapGetters(['showModal']),
	},
	methods: {
		openModal() {
			this.$store.commit('OPEN_MODAL');
		},
		handleUserContent() {
			this.isShowUserContent = !this.isShowUserContent;
		},
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__login {
		text-decoration-line: none;
		list-style: none;
		background-color: transparent;

		&:hover {
			text-decoration-line: underline;
		}

		&:visted {
			color: white;
		}
	}

	&__signup {
		text-decoration-line: none;
		background-color: white;
		color: $color-primary;
	}
}

.user__icon:hover {
	cursor: pointer;
}
</style>
