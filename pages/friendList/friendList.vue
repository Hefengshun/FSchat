<template>
	<view class="content">
		<view class="header">
			<uni-search-bar placeholder="查找同事" bgColor="#EEEEEE" @confirm="search" cancelButton="none" />
			<uni-icons type="plus" size="30" @touchend="navigateTo">
			</uni-icons>
		</view>
		<view v-for="(item) in friendsDataList" :key="item.user_openid">
			<uni-swipe-action-item :right-options="options2" :show="isOpened" :auto-close="false"
				@touchend="change(item)" @click="bindClick">
				<view class="content-box">
					<text class="content-text">{{item.friend_name}}</text>
				</view>
			</uni-swipe-action-item>
		</view>
	</view>
</template>

<script>
	import {
		friendsList,
		createConversation
	} from "@/services/api.js"
	export default {
		data() {
			return {
				isOpened: 'none',
				options2: [{
						text: '隐藏',
						style: {
							backgroundColor: '#ffc520'
						}
					},
					{
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
					},

				],
				friendsDataList: []
			}
		},
		onShow() {
			this.getFriendsList()
		},
		methods: {
			async getFriendsList() {
				const res = await friendsList({
					openid: uni.getStorageSync("openid"),
					friendStatus: 'accepted'
				})
				this.friendsDataList = res.data
				console.log(res)
			},
			bindClick(e) {
				console.log(e);
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
			},
			async change(item) {
				console.log(item)
				const res = await createConversation({
					userOpenid: uni.getStorageSync("openid"),
					friendOpenid: item.friend_openid
				})
				if (res.state === 1) {
					uni.navigateTo({
						url: `/pages/chat/chat?conversationID=${res.data.conversationID}&exist=${res.data.exist}`,
					})
				} else {
					// 报错了
				}
				// this.isOpened = e;
			},
			navigateTo() {
				uni.navigateTo({
					url: "/pages/addFriend/addFriend"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.header {
			display: flex;
			align-items: center;
			justify-content: center;

			uni-search-bar {
				width: -webkit-fill-available;
			}
		}
	}




	.content-box {
		flex: 1;
		/* #ifdef APP-NVUE */
		justify-content: center;
		/* #endif */
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content-text {
		font-size: 15px;
	}
</style>