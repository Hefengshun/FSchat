<template>
	<!-- <view class="info-content"> -->
	<scroll-view class="message-list" :scroll-y="true" @refresherrefresh="getConversationsWithUnreadCountData"
		:refresher-enabled="true" :refresher-threshold="70" :refresher-triggered="refresher"
		:refresher-default-style="'black'">
		<uni-list :border="true">
			<uni-list-chat :title="item.FriendName" v-for="item in chatList" :key="item.FriendOpenid"
				@touchend.stop="toChatPage(item)" avatar="/static/logo.png" :note="item.LastMessage"
				:time="item.UpdatedAt" :badge-text="item.UnreadCount">
			</uni-list-chat>
			<uni-swipe-action-item :right-options="options2" :auto-close="false" @click="bindClick">
				<uni-list-chat title="演示一条数据" avatar="/static/logo.png" note="此条数据可忽略" time="2020-02-02 20:20"
					badge-text="12">
				</uni-list-chat>
			</uni-swipe-action-item>
		</uni-list>
	</scroll-view>
	<!-- </view> -->
</template>

<script>
	import {
		formatDateTime
	} from "@/utils/index.js"
	import {
		getConversationsWithUnreadCount
	} from "@/services/api.js"
	export default {
		data() {
			return {
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
				chatList: [],
				refresher: false,
			}
		},
		onShow() {
			this.getConversationsWithUnreadCountData()
		},
		methods: {
			async getConversationsWithUnreadCountData() {
				this.refresher = true;
				const res = await getConversationsWithUnreadCount({
					userID: uni.getStorageSync("openid")
				})
				if (res.state === 1) {
					this.chatList = res.data.filter(item => {
						item.UpdatedAt = formatDateTime(item.UpdatedAt)
						return item
					})
				}
				setTimeout(() => {
					this.refresher = false;
				}, 1000)
			},
			bindClick(e) {
				console.log(e);
				uni.showToast({
					title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
					icon: 'none'
				});
			},
			toChatPage(item) {
				uni.navigateTo({
					url: `/pages/chat/chat?conversationID=${item.ConversationID}&exist=${true}`,
				})
			},
		}
	}
</script>

<style scoped lang="scss">
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




	.message-list {
		height: 100vh;
	}
</style>