<template>
	<div>
		<div
			class="dropdown-wrap"
			v-if="showDropdown"
			@click.self="handleDropdown"
		></div>
		<div>
			<div class="dropdown__button" @click="handleDropdown">
				<slot name="button"></slot>
			</div>
			<div v-if="showDropdown" class="dropdown">
				<ul>
					<li>
						<slot name="name"></slot>
						<span>
							<i class="material-icons close" @click="handleDropdown">close</i>
						</span>
					</li>
					<slot></slot>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showDropdown: false,
		};
	},
	methods: {
		handleDropdown() {
			this.showDropdown = !this.showDropdown;
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown-wrap {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.dropdown {
	position: absolute;
	z-index: 1;
	width: 18rem;
	height: auto;
	background-color: #fff;

	&__button {
		position: relative;
	}

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
				margin-right: 4rem;
				margin-left: 6.5rem;

				&:hover {
					background-color: #fff;
					cursor: default;
				}
				.close {
					margin-left: 4rem;
					font-size: 20px;
					color: grey;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>
