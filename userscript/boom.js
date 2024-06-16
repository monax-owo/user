// ==UserScript==
// @name         Delete Post
// @namespace
// @version      0.0.1
// @description
// @author       monax-owo
// @match        https://linevoom.line.me/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=line.me
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.0.nomodule.min.js
// ==/UserScript==
(() => {
	"use strict";
	import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.0.min.js";
	console.log("working!");
	let loop = 0;
	let nth = 1;
	const deletePost = () => {
		const feedList = document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0];
		while (loop < 5) {
			let post = feedList.querySelector(`article:nth-child(${nth})`);
			if (post === null) break;
			let postId = post.id.replace("article_", "");
			if (postId === undefined || postId === "") break;
			if (post.querySelector(".media_image") === null) {
				console.log();
				++nth;
			}
			++loop;
		}
	};
	van.add(document.getElementById("header")?.getElementsByTagName("div"), () =>
		div(p("👋Hello"), ul(li("🗺️World"), li(a({ href: "https://vanjs.org/" }, "🍦VanJS"))))
	);
	// console.log(document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0].querySelector("article:nth-child(5)")?.id);
})();
// fetch("https://linevoom.line.me/api/post/delete?homeId=_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk", {
// 	headers: {
// 		"accept": "application/json, text/plain, */*",
// 		"accept-language": "ja,en-US;q=0.9,en;q=0.8",
// 		"baggage":
// 			"sentry-environment=production,sentry-release=3.44.1.0,sentry-public_key=1f84b015401a455abc185c9ede2d18a1,sentry-trace_id=1ec2edecd1f14d54b371d3153701a9f8,sentry-sample_rate=0.2,sentry-transaction=%2FuserHome,sentry-sampled=false",
// 		"content-type": "application/json",
// 		"priority": "u=1, i",
// 		"sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
// 		"sec-ch-ua-mobile": "?1",
// 		"sec-ch-ua-platform": '"Android"',
// 		"sec-fetch-dest": "empty",
// 		"sec-fetch-mode": "cors",
// 		"sec-fetch-site": "same-origin",
// 		"sec-gpc": "1",
// 		"sentry-trace": "1ec2edecd1f14d54b371d3153701a9f8-b65b4ae202098e23-0",
// 		"x-timeline-tid": "477546cc548c39a14587bff4aaaab4e3",
// 		"x-timeline-webversion": "3.44.1.0",
// 	},
// 	referrer: "https://linevoom.line.me/user/_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk",
// 	referrerPolicy: "strict-origin-when-cross-origin",
// 	body: '{"postId":"1169533143287599137"}',
// 	method: "POST",
// 	mode: "cors",
// 	credentials: "include",
// });