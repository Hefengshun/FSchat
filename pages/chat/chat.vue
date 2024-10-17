<template>
	<view class="chat-container">
		<!-- :style="{height: scrollHeight}" -->
		<scroll-view class="message-list" scroll-y :scroll-into-view="lastMessageId">
			<view v-for="(message, index) in messages" :key="index" :id="'message-' + index" class="message-wrapper">
				<view :class="['message', message.sender === 'You' ? 'message-right' : 'message-left']">
					<text>{{ message.content }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="input-container">
			<input type="text" adjust-position="true" v-model="newMessage" placeholder="Type a message"
				@confirm="sendMessage" @focus="handleFocus" @blur="handleBlur" />
			<button @click="sendMessage">发送</button>
			<button @click="loadConversationMassage">刷新</button>
		</view>
	</view>
</template>

<script>
	import {
		sendMessage,
		GetMessagesForConversation
	} from "@/services/api.js"
	export default {
		data() {
			return {
				messages: [
					// {
					// 	sender: 'Alice',
					// 	content: 'Hello!'
					// },
					// {
					// 	sender: 'You',
					// 	content: 'Hi, how are you?'
					// },
					// {
					// 	sender: 'Alice',
					// 	content: 'Hello!'
					// },
				],
				newMessage: '',
				scrollHeight: 'calc(100vh - 50px)', // 50px 为输入框高度
				query: {}
			};
		},
		computed: {
			lastMessageId() {
				return 'message-' + (this.messages.length - 1);
			},
		},
		onLoad: function(option) {
			this.query = option;
			if (option.exist) {
				// 这里是会话存在这时间需要加载信息
				this.loadConversationMassage()
			}
			console.log(this.query)
		},
		methods: {
			async loadConversationMassage() {
				const res = await GetMessagesForConversation({
					conversationID: this.query.conversationID,
					userID: uni.getStorageSync("openid"),
				})
				this.messages = []
				if (res.state === 1) {
					res.data.forEach(item => {
						if (item.SenderID === uni.getStorageSync("openid")) {
							this.messages.push({
								sender: 'You',
								content: item.Content,
								createdAt: item.CreatedAt
							});
						} else {
							this.messages.push({
								sender: 'Alice',
								content: item.Content,
								createdAt: item.CreatedAt
							});
						}

					})

				} else {
					//获取信息失败
				}
			},
			async sendMessage() {
				if (this.newMessage.trim() !== '') {
					const res = await sendMessage({
						conversationID: this.query.conversationID,
						senderID: uni.getStorageSync("openid"),
						content: this.newMessage
					})
					if (res.state === 1) {
						this.messages.push({
							sender: 'You',
							content: this.newMessage
						});
						this.newMessage = '';
					} else {
						//发送失败
					}

				}
			},
			handleFocus() {
				// 处理键盘弹出
				this.scrollHeight = 'calc(100vh - 300px)'; // 假设键盘高度为250px
			},
			handleBlur() {
				// 恢复正常高度
				this.scrollHeight = 'calc(100vh - 50px)';
			},
		},
	};
</script>

<style scoped lang="scss">
	.chat-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
		box-sizing: border-box;
	}

	.message-list {
		flex: 1;
		overflow-y: auto;
		padding: 10px;
		padding-bottom: calc(env(safe-area-inset-bottom) + 30px);
		background-color: #f0f0f0;
		box-sizing: border-box;
		overflow-wrap: break-word;
	}

	.message-wrapper {
		display: flex;
		margin-bottom: 10px;
	}

	.message-left {
		background-color: #e0e0e0;
		padding: 10px;
		border-radius: 10px;
		max-width: 70%;
	}

	.message-right {
		background-color: #007aff;
		color: #fff;
		padding: 10px;
		border-radius: 10px;
		max-width: 70%;
		margin-left: auto;
	}

	.input-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		background-color: #fff;
		align-items: center;
		padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

		input {
			flex: 1;
			padding: 5px;
			border: 1px solid #ccc;
			border-radius: 4px;
			margin-right: 10px;
			margin: 10px 10px 20px 10px;

		}

		button {
			background-color: #007aff;
			color: #fff;
			font-size: small;
			border: none;
			margin-bottom: 10px;
			margin-right: 10px;
			border-radius: 4px;
		}
	}
</style>