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
		<BaseIcon
			class="user__icon"
			@click="handleUserContent"
			:username="currentUser.username"
			:size="30"
		/>
		<NavUser
			v-if="isShowUserContent"
			:currentUser="currentUser"
			@close="handleUserContent"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { OPEN_MODAL } from '@/store/mutations.type';

export default {
	name: 'navigation-items',
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
		NavUser: () => import('@/components/common/NavUser'),
	},
	computed: {
		...mapGetters(['showModal']),
	},
	methods: {
		openModal() {
			this.$store.commit(OPEN_MODAL);
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
