<script>
	import {
		wxLogin
	} from "@/request/api.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			wx.login({
				success(res) {
					if (res.code) {
						wxLogin({
							code: res.code
						}).then(res => {
							console.log(res)
							uni.setStorage({
								key: "openid",
								data: res.data.openId
							})
							uni.setStorage({
								key: "user",
								data: res.data
							})
						})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>