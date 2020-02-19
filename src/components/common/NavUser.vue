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
				<li @click="gotoUser">My Page</li>
				<li>Setting</li>
				<li @click="logout">Log Out</li>
			</ul>
		</div>
	</div>
</template>

<script>
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
			this.$store.dispatch('LOGOUT').then(() => {
				this.$router.push({ name: 'home' });
			});
		},
		gotoUser() {
			this.$emit('close');
			this.$router.push({
				name: 'userPage',
				params: { username: currentUser.username },
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
	top: 45px;
	right: 10px;
	width: 180px;
	height: 120px;
	z-index: 2;
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
