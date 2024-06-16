(() => {
	"use strict";
	let loop = false;
	const feedList = document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0];
	while (loop) {
		let post = feedList.querySelector("article:nth-child(5)");
		if (post === null) break;
		let postId = post.id.replace("article_", "");
		if (postId === undefined || postId === "") break;
	}
	console.log(document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0].querySelector("article:nth-child(5)")?.id);
})();

fetch("https://linevoom.line.me/api/post/delete?homeId=_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk", {
	headers: {
		"accept": "application/json, text/plain, */*",
		"accept-language": "ja,en-US;q=0.9,en;q=0.8",
		"baggage":
			"sentry-environment=production,sentry-release=3.44.1.0,sentry-public_key=1f84b015401a455abc185c9ede2d18a1,sentry-trace_id=1ec2edecd1f14d54b371d3153701a9f8,sentry-sample_rate=0.2,sentry-transaction=%2FuserHome,sentry-sampled=false",
		"content-type": "application/json",
		"priority": "u=1, i",
		"sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
		"sec-ch-ua-mobile": "?1",
		"sec-ch-ua-platform": '"Android"',
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"sec-gpc": "1",
		"sentry-trace": "1ec2edecd1f14d54b371d3153701a9f8-b65b4ae202098e23-0",
		"x-timeline-tid": "477546cc548c39a14587bff4aaaab4e3",
		"x-timeline-webversion": "3.44.1.0",
	},
	referrer: "https://linevoom.line.me/user/_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk",
	referrerPolicy: "strict-origin-when-cross-origin",
	body: '{"postId":"1170403580620577487"}',
	method: "POST",
	mode: "cors",
	credentials: "include",
});
