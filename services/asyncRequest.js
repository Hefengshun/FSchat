// const baseUrl = "http://localhost:8088";
// const baseUrl = "http://192.168.0.108:8088";
const baseUrl = "http://www.strives.online:8088";

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