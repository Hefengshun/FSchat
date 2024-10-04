<template>
	<view class="content">
		<view class="header">
			<uni-search-bar placeholder="输入uuid查找添加" v-model="searchValue" bgColor="#EEEEEE" @confirm="search"
				cancelButton="none" />
			<uni-icons type="plus" size="30" @touchend="search">
			</uni-icons>
		</view>
		<uni-section title="好友申请信息" type="line">
			<!-- accordion -->
			<uni-collapse class="collapse" v-model="accordionVal">
				<uni-collapse-item v-for="item in friendsDataList" :key="item" :title="item.friend_name"
					thumb="/static/logo.png">
					<view class="content">
						<text class="text">备注：XXXXX</text>
						<view style="display: contents;">
							<button class="button popup-success" @click="addFriendStatus(item.ID,'accepted')">
								<text class="button-text success-text">接受</text>
							</button>
							<button class="button popup-error" @click="addFriendStatus(item.ID,'reject')">
								<text class="button-text error-text">拒绝</text>
							</button>
						</view>
					</view>
				</uni-collapse-item>

			</uni-collapse>
		</uni-section>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" :showClose="false" confirmText="确认" title="通知" :content="massage">
				</uni-popup-dialog>

			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		addFriend,
		friendsList,
		handleFriendApply
	} from "@/services/api.js"
	export default {
		data() {
			return {
				massage: '',
				searchValue: '',
				accordionVal: '1',
				openid: uni.getStorageSync("openid"),
				friendsDataList: []
			}
		},
		onLoad() {
			this.getFriendsList()
		},
		methods: {
			async getFriendsList() {
				const res = await friendsList({
					openid: this.openid,
					friendStatus: 'pending'
				})
				this.friendsDataList = res.data
				console.log(res)
			},
			async search() {
				console.log(this.searchValue, this.openid)
				if (this.searchValue === '') {
					this.massage = "请填写ID"
					this.$refs.alertDialog.open()
					return
				}
				if (this.searchValue === this.openid) {
					this.massage = "不可自己添加自己！"
					this.$refs.alertDialog.open()
					return
				}
				const res = await addFriend({
					openid: this.openid,
					friendOpenid: this.searchValue
				})
				this.massage = res.msg
				this.$refs.alertDialog.open()
			},
			async addFriendStatus(id, status) {
				console.log(status)
				const res = await handleFriendApply({
					id,
					status
				})
				console.log(res)

			}
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



	.collapse {
		@mixin flex {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
		}

		.button {
			@include flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			height: 35px;
			margin: 0 5px;
			border-radius: 5px;
		}

		.button-text {
			color: #fff;
			font-size: 12px;
		}

		.popup-success {
			color: #fff;
			background-color: #e1f3d8;
		}

		.success-text {
			color: #09bb07;
		}


		.error-text {
			color: #f56c6c;
		}

		.popup-error {
			color: #fff;
			background-color: #fde2e2;
		}

		.content {
			padding: 15px;
		}

		.text {
			font-size: 14px;
			color: #666;
			line-height: 20px;
		}

		.button {
			// margin-top: 10px;
			margin: 10px;
			margin-bottom: 0;
		}
	}
</style>