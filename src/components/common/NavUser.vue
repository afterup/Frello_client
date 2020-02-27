<template>
	<div class="user-wrap" @click.self="$emit('close')">
		<div class="user">
			<ul>
				<li>
					<span>{{ currentUser.username }}</span>
					<span @click="$emit('close')">
						<i class="material-icons close">close</i>
					</span>
				</li>
				<hr />
				<li @click="logout">Log Out</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { LOGOUT } from '@/store/actions.type.js';

export default {
	name: 'navigation-user',
	props: {
		currentUser: {
			type: Object,
			required: false,
		},
	},
	methods: {
		logout() {
			this.$emit('close');
			this.$store.dispatch(LOGOUT).then(() => {
				this.$router.push({ name: 'home' });
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.user-wrap {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.user {
	position: absolute;
	top: 4.5rem;
	right: 1rem;
	width: 18rem;
	height: auto;
	z-index: 100;
	background-color: #fff;

	ul {
		list-style: none;
		padding: 0.4rem;
		li {
			display: flex;
			align-items: center;
			font-size: 1.3rem;
			padding: 0.2rem;

			&:hover {
				background-color: rgb(235, 235, 235);
				cursor: pointer;
			}

			&:first-child {
				span:first-child {
					margin-right: 4rem;
					margin-left: 6.5rem;
				}

				&:hover {
					background-color: #fff;
					cursor: default;
				}
			}
		}
	}
	.close {
		font-size: 20px;
		color: grey;

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
