<template>
	<div class="home">
		<section class="home__banner">
			<div>
				<h1>Frello</h1>
				<h3>Trello Clone Web</h3>
			</div>
			<svg width="500px" height="500px" class="home__banner__image">
				<image href="@/assets/image/hero-a.svg" width="100%" height="100%" />
			</svg>
		</section>
		<section class="home__about">
			<article class="home__about__content-1">
				<img src="@/assets/image/content1.png" />
				<span>
					<h3>한 눈에 볼 수 있는 정보</h3>
					<p>
						Todo, In Progress 등 카드와 리스트에 내용을 추가하여 <br />
						정보를 등록하고 확인할 수 있습니다.
					</p>
				</span>
			</article>
			<article class="home__about__content-2">
				<span>
					<h3>PC와 모바일 인터페이스</h3>
					<p>
						반응형 인터페이스로 구현되어 모바일 화면으로도 볼 수 있습니다.
					</p>
				</span>
				<img src="@/assets/image/content2.png" />
			</article>
			<article class="home__about__recommend">
				<h2>아래 버튼 클릭시 테스트 아이디로 자동로그인 됩니다.</h2>
				<BaseBtn @click="vipLogin" class="login">VIP Login</BaseBtn>
			</article>
		</section>
		<footer class="footer">
			<div class="footer__text">
				©Reference to trello | <a href="https://github.com/afterup">github</a>
			</div>
		</footer>
		<transition name="fade">
			<Modal v-if="showModal" @close="closeModal">
				<router-view></router-view>
			</Modal>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CLOSE_MODAL } from '@/store/mutations.type.js';
import { LOGIN } from '@/store/actions.type.js';

export default {
	name: 'home-page',
	computed: {
		...mapGetters(['showModal', 'isAuthenticated']),
	},
	components: {
		Modal: () => import('@/components/modal/Modal'),
	},
	methods: {
		closeModal() {
			this.$store.commit(CLOSE_MODAL);
			this.$router.push({ name: 'home' });
		},
		vipLogin() {
			this.$store
				.dispatch(LOGIN, {
					email: 'vip@gmail.com',
					password: '123vip',
				})
				.then(user => {
					this.$router.push({
						name: 'boards',
						params: { username: user.username },
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	&__banner {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 50rem;
		background: rgb(6, 119, 191);
		background: linear-gradient(
			90deg,
			rgba(6, 119, 191, 1) 0%,
			rgba(6, 119, 191, 1) 35%,
			rgba(71, 105, 196, 1) 100%
		);

		@media screen and (max-width: $bp-medium) {
			flex-direction: column;
			height: 70rem;
		}

		h1 {
			text-align: center;
			font-size: 4rem;
			color: white;

			@media screen and (max-width: $bp-medium) {
				margin-top: 8rem;
			}
		}

		h3 {
			font-size: 2rem;
			color: white;
		}

		svg {
			@media screen and (max-width: $bp-medium) {
				width: 90%;
				height: 90%;
			}
		}
	}

	&__about {
		// height: 120rem;
		background: rgb(255, 255, 255);
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(231, 241, 255, 1) 30%,
			rgba(178, 215, 255, 1) 100%
		);

		&__content {
			&-1 {
				display: flex;
				justify-content: center;
				margin-top: 15rem;

				@media screen and (max-width: $bp-medium) {
					flex-direction: column;
					align-items: center;
				}
				img {
					border-radius: 20px;
					width: 65rem;
					height: 40rem;
					@media screen and (max-width: $bp-medium) {
						width: 90%;
						height: auto;
					}
				}
				span {
					margin: auto 7rem;
					@media screen and (max-width: $bp-medium) {
						margin-top: 4rem;
					}
					h3 {
						font-size: 1.9rem;
					}
					p {
						margin-top: 2rem;
						font-size: 1.5rem;
					}
				}
			}
			&-2 {
				display: flex;
				justify-content: center;
				margin-top: 15rem;

				@media screen and (max-width: $bp-medium) {
					flex-direction: column;
					align-items: center;
				}
				img {
					border-radius: 20px;
					order: 0;
				}
				span {
					margin: auto 7rem;
					@media screen and (max-width: $bp-medium) {
						margin-top: 4rem;
						order: 1;
					}
					h3 {
						font-size: 1.9rem;
					}
					p {
						margin-top: 2rem;
						font-size: 1.5rem;
					}
				}
			}
		}
		&__recommend {
			margin-top: 12rem;
			text-align: center;
			font-size: 1.1rem;
			color: $color-primary;
			h2 {
				margin-bottom: 2rem;
			}
			button {
				width: 40%;
				margin: 0 auto;
			}
		}
	}
}
.footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;
	background-color: rgba(178, 215, 255, 1);

	&__text {
		font-size: 1.3rem;
	}
}

.fade-enter-active {
	transition: all 0.3s ease;
}
.fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
