import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import ProjectWriteup from "../../components/ProjectWriteup";

export default function ProjectPage() {
	const router = useRouter();
	const { pid } = router.query;

	return (
		<main className="app">
			<Header />

			<div style={{ margin: "2rem 0" }}>
				<a onClick={() => router.back()} style={{ cursor: "pointer" }}>
					<strong>
						<FontAwesomeIcon icon={faArrowLeft} size="1x" />
						<span style={{ fontSize: "1.1rem" }}>&nbsp;Return</span>
					</strong>
				</a>
			</div>

			<ProjectWriteup name={pid} />
		</main>
	);
}
