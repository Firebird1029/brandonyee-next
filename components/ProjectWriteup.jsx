/* global hljs */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ProjectWriteup({ name }) {
	const [markdownString, setMarkdownString] = useState("Loading...");
	useEffect(() => {
		if (!name) return;

		fetch(`/markdown/${name}.md`)
			.then((res) => (res.status === 200 ? res.text() : "Project not found :("))
			.then((res) => setMarkdownString(res))
			.then(() => hljs.highlightAll())
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}, [name]);

	useEffect(() => hljs.highlightAll(), [markdownString]);

	return (
		<>
			<div>
				<ReactMarkdown>{markdownString}</ReactMarkdown>
			</div>
			<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js"></script>
		</>
	);
}
