/* global hljs */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Script from "next/script";

export default function ProjectWriteup({ name }) {
	const [markdownString, setMarkdownString] = useState("Loading...");
	const [hljsObj, setHljsObj] = useState(null);

	useEffect(() => {
		if (!name) return;

		fetch(`/markdown/${name}.md`)
			.then((res) => (res.status === 200 ? res.text() : "Project not found :("))
			.then((res) => setMarkdownString(res))
			.then(() => hljs.highlightAll())
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}, [name]);

	useEffect(() => {
		hljsObj && hljsObj.highlightAll();
	}, [markdownString, hljsObj]);

	return (
		<>
			<div>
				<ReactMarkdown>
					{/* https://stackoverflow.com/a/29194283 */}
					{markdownString.replace(/(?=<!--)([\s\S]*?)-->/g, "")}
				</ReactMarkdown>
			</div>
			<Script
				src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js"
				onReady={() => {
					setHljsObj(hljs);
				}}
			/>
		</>
	);
}
