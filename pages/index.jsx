import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<>
			<main className="app">
				<Header />

				{/* Bio */}
				<div style={{ minHeight: "100vh" }}>
					<p>&nbsp;</p>
					<div className="centered-touch">
						<Image
							src="/img/me.jpg"
							width="150"
							height="150"
							alt="Brandon Yee"
						/>
					</div>
					<p className="spacer" />
					<p style={{ fontSize: "1.5rem", lineHeight: "2rem" }}>
						<span>
							👋 &nbsp;Hey, I&apos;m Brandon, an undergraduate student at Yale
							studying computer science.
						</span>
						<span>&nbsp;</span>
						<span>
							For details on my professional work experience, check out my{" "}
							<Link
								href="/resume"
								style={{ borderBottom: "1px solid #254f93" }}
							>
								resume
							</Link>
							. Or, you can view some of my personal projects on the{" "}
							<Link
								href="/projects"
								style={{ borderBottom: "1px solid #254f93" }}
							>
								Projects
							</Link>{" "}
							page. &nbsp;🚀
						</span>
					</p>
					{/*
					I write software. I believe innovative ideas by themselves cannot stand
					alone; instead, ideas must seek to influence the world in positive,
					meaningful ways. &nbsp;🌱
					*/}
					<p className="spacer" />
					<p style={{ fontSize: "1.25rem", lineHeight: "2rem" }}>
						When I&apos;m not writing software || setting GDB breakpoints ||
						reading Techmeme tweets, you can find me hiking, swimming, listening
						to music, or feeding ducks. &nbsp;🦆
					</p>
					<p className="spacer" />
					{/* TODO obfuscate email */}
					<span className="blue-text">
						<a
							href="mailto:brandon.yee@yale.edu"
							target="_blank"
							rel="noreferrer"
							style={{ marginRight: "1.5rem" }}
						>
							<FontAwesomeIcon icon={faEnvelope} size="2x" />
						</a>
						<a
							href="https://www.linkedin.com/in/brandon-y/"
							target="_blank"
							rel="noreferrer"
							style={{ marginRight: "1.5rem" }}
						>
							<FontAwesomeIcon icon={faLinkedin} size="2x" />
						</a>
						<a
							href="https://github.com/Firebird1029"
							target="_blank"
							rel="noreferrer"
							style={{ marginRight: "1.5rem" }}
						>
							<FontAwesomeIcon icon={faGithub} size="2x" />
						</a>
					</span>
				</div>
			</main>
		</>
	);
}
