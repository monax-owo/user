<script lang="ts">
	import "sanitize.css/sanitize.css";
	import "sanitize.css/assets.css";
	console.log("working!");
	let nth = 1;
	const deletePost = () => {
		const MAX = 15;
		let loop = 0;
		const feedList = document.getElementsByClassName("feedListLayout_feed_list__Z1Jh_")[0];
		while (loop < MAX) {
			let post = feedList.querySelector(`article:nth-child(${nth})`);
			if (post === null) break;
			let postId = post.id.replace("article_", "");
			if (postId === undefined || postId === "") break;
			if (post.querySelector(".media_image") === null) {
				console.log("no image");
				fetch("https://linevoom.line.me/api/post/delete?homeId=_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk", {
					headers: {
						accept: "application/json, text/plain, */*",
						"accept-language": "ja,en-US;q=0.9,en;q=0.8",
						baggage:
							"sentry-environment=production,sentry-release=3.44.1.0,sentry-public_key=1f84b015401a455abc185c9ede2d18a1,sentry-trace_id=75efc58c2367446ab8d9d2750a17ef1c,sentry-sample_rate=0.2,sentry-transaction=%2FuserHome,sentry-sampled=false",
						"content-type": "application/json",
						priority: "u=1, i",
						"sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
						"sec-ch-ua-mobile": "?0",
						"sec-ch-ua-platform": '"Windows"',
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
						"sec-gpc": "1",
						"sentry-trace": "75efc58c2367446ab8d9d2750a17ef1c-843191a5392664d0-0",
						"x-timeline-tid": "d818e348e76802a4c1bee4e4e463cbbe",
						"x-timeline-webversion": "3.44.1.0",
					},
					referrer: "https://linevoom.line.me/user/_dVkHnuS19n3F4QZRu6woElyJ1YUwrYkVVDKc2mk",
					referrerPolicy: "strict-origin-when-cross-origin",
					body: `{"postId":${postId}}`,
					method: "POST",
					mode: "cors",
					credentials: "include",
				});
			} else {
				console.log("with images");
			}
			console.log(postId);
			++nth;
			++loop;
		}
	};
</script>

<div class="app">
	<label>
		<input type="checkbox" name="toggle" on:click={() => deletePost()} />
		<span>del{nth}</span>
	</label>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: row;
		margin: 0 8px;
		height: 40px;
		text-align: center;
		& label {
			display: inline-flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			cursor: pointer;
			text-align: center;
		}
	}
	input[type="checkbox"] {
		display: block;
		appearance: auto;
		margin: 4px;
		width: 12px;
		height: 12px;
	}
</style>
