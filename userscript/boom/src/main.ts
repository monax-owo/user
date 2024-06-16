import "./app.scss";
import App from "./App.svelte";

const app = new App({
	target: (() => {
		const app = document.createElement("div");
		document.getElementById("header")?.getElementsByTagName("div")[0].appendChild(app);
		return app;
	})(),
});

export default app;
