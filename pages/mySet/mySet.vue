<template>
	<view class="content">
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
</style>