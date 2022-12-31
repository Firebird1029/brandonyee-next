// use https://affinda.com/resume-parser/ to parse resume
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import styles from "../styles/Resume.module.css";
import resumeData from "../resume.json";
import { projects as projectData } from "../projects.js";

// Re-format Affinda-parsed dates (MM-DD-YY) to pretty date
const MONTH_NAME_MAP = {
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	10: "October",
	11: "November",
	12: "December",
};

function parseDate(date) {
	const [year, month] = date.split("-");
	return `${MONTH_NAME_MAP[month].substring(0, 3)} ${year}`;
}

export default function Resume() {
	return (
		<>
			<main className="app">
				<Header />
				<p>&nbsp;</p>
				<div className="sticky-container">
					<div className={styles.sectionHeader}>
						<h2 className="blue-text" style={{ margin: 0 }}>
							WORK EXPERIENCE
						</h2>
					</div>
					{resumeData.workExperience.map(
						({
							id,
							jobTitle,
							jobDescription,
							organization,
							dates,
							location,
						}) => (
							<div key={id}>
								<div className={styles.resumeSectionFlex}>
									{/* Job Title + Company */}
									<div className={styles.jobTitleCompany}>
										<strong>{jobTitle}</strong>

										<span className="hidden-touch">
											&nbsp;&nbsp;/&nbsp;&nbsp;
										</span>
										<br className="hidden-desktop" />

										<em>{organization}</em>
									</div>

									{/* Job Date + Location */}
									<div>
										<strong>{parseDate(dates.startDate)}</strong>
										<span>&nbsp;&#8211;&nbsp;</span>
										<strong>{parseDate(dates.endDate)}</strong>

										<span className="hidden-touch">
											&nbsp;&nbsp;/&nbsp;&nbsp;
										</span>
										<br className="hidden-desktop" />

										<em>{location ? location.rawInput : "Remote"}</em>
									</div>
								</div>

								{/* Job Description */}
								<div style={{ marginTop: "-0.5rem" }}>
									<div className="markdown" style={{ marginBottom: "2rem" }}>
										<ReactMarkdown>
											{jobDescription.replaceAll("\n-", "\n- ")}
										</ReactMarkdown>
									</div>
								</div>
							</div>
						)
					)}
				</div>
				<p>&nbsp;</p>
				<div className="sticky-container">
					<div className={styles.sectionHeader}>
						<h2 className="blue-text" style={{ margin: 0 }}>
							PROJECTS
						</h2>
					</div>
					{projectData
						.sort(({ year: y1, title: t1 }, { year: y2, title: t2 }) =>
							// sort by year descending, then by title ascending
							y1 === y2 ? t1 - t2 : y2 - y1
						)
						.map(({ title, description, year, id }) => (
							<div key={id}>
								<div className={styles.resumeSectionFlex}>
									<div className={styles.jobTitleCompany}>
										<strong>{title}</strong>

										<span className="hidden-touch">
											&nbsp;&nbsp;/&nbsp;&nbsp;
										</span>
										<br className="hidden-desktop" />

										<em>{year}</em>
									</div>
								</div>
								<div style={{ marginTop: "-0.5rem" }}>
									<div className="markdown" style={{ marginBottom: "2rem" }}>
										<ReactMarkdown>{description}</ReactMarkdown>
									</div>
								</div>
							</div>
						))}
				</div>
			</main>
			<section className={`${styles.parallax} hidden-touchs`}>
				<div
					style={{
						width: "100%",
						textAlign: "center",
						position: "fixed",
						bottom: 0,
						zIndex: -1,
					}}
				>
					<h3 className="unselectable">BRANDON YEE</h3>
				</div>
			</section>
		</>
	);
}
