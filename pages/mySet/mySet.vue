<template>
	<view class="content">
		<uni-notice-bar show-icon scrollable text="提醒:准时打卡,及时汇报工作记录..." color="#2979FF" background-color="#EAF2FF" />
		<uni-list-chat :title="'工号:  ' + user.userName" avatar="/static/logo.png" :note="'id:   ' + user.openId">
		</uni-list-chat>
		<!-- <uni-section title="用户设置" type="line">
			<uni-list>
				<uni-list-item title="修改用户名称" @touchend="openDialog('user')" />
			</uni-list>

		</uni-section>
		<uni-section title="密码组" type="line">
			<uni-list>
				<uni-list-item title="新增密码" @touchend="openDialog('secret')" showArrow />
				<uni-list-item title="编辑密码组" showArrow />
			</uni-list>

		</uni-section>
		
		
		
		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :title="title" :value="value" :placeholder="placeholder"
					@confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view> -->

		<uni-section title="工作事宜" type="line">
			<uni-list>
				<uni-section class="mb-10" title="打卡记录" sub-title="早中晚">
					<button type="button" @click="openMatterDialog('car')">点击打卡</button>
				</uni-section>
				<uni-section class="mb-10" title="工作便签" sub-title="汇总要干的事情">
					<button type="button" @click="openMatterDialog('')">添加</button>
				</uni-section>
				<uni-section class="mb-10" title="添加工作记录" sub-title="每天回报">
					<button type="button" @click="openMatterDialog('')">添加</button>
				</uni-section>
				<uni-section class="mb-10" title="添加未完成项" sub-title="任务未完成项,每天汇报一次">
					<button type="button" @click="openMatterDialog('')">添加</button>
				</uni-section>
			</uni-list>

		</uni-section>
		<view>
			<uni-popup ref="matterDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :title="matterTitle" :value="matterValue"
					@confirm="dialogMatterConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		updateUser
	} from "@/services/api.js"
	export default {
		data() {
			return {
				title: '请输入密码',
				placeholder: '请输入密码',
				value: "",
				user: uni.getStorageSync("user")
			}
		},
		onLoad() {

		},
		methods: {
			async updateUserFun(val) {
				const res = await updateUser({
					openid: uni.getStorageSync("openid"),
					userName: val
				})
				return res
			},
			openDialog(type) {
				if (type === "secret") {
					this.value = ""
					this.title = '请输入密码'
					this.placeholder = '请输入密码'
				} else {
					return;
					// this.value = uni.getStorageSync("user").userName
					// this.title = '请输入用户名称'
					// this.placeholder = '请输入用户名称'
				}
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {

				this.updateUserFun(val)
				this.user.userName = val
				uni.setStorage({
					key: "user",
					data: user
				})
				// uni.showLoading({
				// 	title: this.updateUserFun(val).msg
				// })
				// setTimeout(() => {
				// 	uni.hideLoading()
				// 	this.$refs.inputDialog.close()
				// }, 1000)
			},
			openMatterDialog(type) {

				switch (type) {
					case "car":
						uni.showLoading({
							title: '打卡中...'
						});

						setTimeout(() => {
							uni.hideLoading()
						}, 2000)
						break;

					default:
						this.$refs.matterDialog.open()
						break;
				}
			},
			dialogMatterConfirm() {
				uni.showLoading({
					title: '添加中...'
				});

				setTimeout(() => {
					uni.hideLoading()
				}, 2000)
			}
		}
	}
</script>

<style>
	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.mb-10 {
		margin-bottom: 10px;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>