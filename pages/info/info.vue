<template>
	<view class="content">
		<uni-list :border="true">
			<uni-swipe-action-item :right-options="options2" :show="isOpened" :auto-close="false" @touchend="change"
				@click="bindClick">
				<uni-list-chat title="uni-app"
					avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息"
					time="2020-02-02 20:20" badge-text="12">
				</uni-list-chat>
				<!-- 头像显示圆点 -->
			</uni-swipe-action-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarList: [{
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}],
				isOpened: 'none',
				options2: [{
						text: '添加组',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			bindClick(e) {
				console.log(e);
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
			},
			change(e) {
				this.isOpened = e;
				uni.navigateTo({
					url: "/pages/chat/chat"
				})
			},
		}
	}
</script>

<style scoped>
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>