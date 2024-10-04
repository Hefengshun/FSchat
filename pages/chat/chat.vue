<template>
	<view class="chat-container">
		<!-- :style="{height: scrollHeight}" -->
		<scroll-view class="message-list" scroll-y :scroll-into-view="lastMessageId">
			<view v-for="(message, index) in messages" :key="index" :id="'message-' + index" class="message-wrapper">
				<view :class="['message', message.sender === 'You' ? 'message-right' : 'message-left']">
					<text>{{ message.text }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="input-container">
			<input type="text" adjust-position="true" v-model="newMessage" placeholder="Type a message"
				@confirm="sendMessage" @focus="handleFocus" @blur="handleBlur" />
			<button @click="sendMessage">Send</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages: [{
						sender: 'Alice',
						text: 'Hello!'
					},
					{
						sender: 'You',
						text: 'Hi, how are you?'
					},
					{
						sender: 'Alice',
						text: 'Hello!'
					},
				],
				newMessage: '',
				scrollHeight: 'calc(100vh - 50px)', // 50px 为输入框高度
			};
		},
		computed: {
			lastMessageId() {
				return 'message-' + (this.messages.length - 1);
			},
		},
		methods: {
			sendMessage() {
				if (this.newMessage.trim() !== '') {
					this.messages.push({
						sender: 'You',
						text: this.newMessage
					});
					this.newMessage = '';
					this.$nextTick(() => {
						this.scrollToBottom();
					});
				}
			},
			scrollToBottom() {
				this.$refs.messageList.scrollTo({
					top: 10000,
					behavior: 'smooth',
				});
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
		background-color: #f0f0f0;
		box-sizing: border-box;
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