let baseUrl;

if (process.env.NODE_ENV === 'development') {
	baseUrl = "http://192.168.0.108:8088"; // 发布到生产环境时，此处代码会被摇树移除掉。
} else {
	baseUrl = "https://www.strives.online:8088";
}

const request = (url, date = {}, type = 'POST', header = {
	'content-type': 'application/x-www-form-urlencoded'
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			resolve(response.data);
		}).catch(error => {
			reject(error)
		})
	});
}
export default request