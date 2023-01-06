import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Projects.module.css";
import { projects } from "../data/projects.js";

export default function Projects() {
	const router = useRouter();

	return (
		<>
			<main className="app">
				<Header />
			</main>
			<section
				style={{
					// https://www.schemecolor.com/beautiful-light-pastels-color-scheme.php
					// linear-gradient(transparent, #DEFDE0, #DEF3FD, #FDDFDF, #FCF7DE, transparent)
					background: "linear-gradient(white, #DEF3FD, #DEF3FD, white)",
				}}
			>
				<section
					className="app app-wide"
					style={{
						backgroundColor: "initial",
					}}
				>
					<p className="spacer hidden-touch">&nbsp;</p>
					<div className={styles.container}>
						{projects.map(
							({
								id,
								title,
								description,
								year,
								imageSrc,
								linkHref,
								linkText,
							}) => (
								<div
									key={id}
									className={`${styles.card} ${styles.glass}`}
									onClick={() => router.push(`/project/${id}`)}
								>
									<div className={styles.hoverGradient}></div>
									<h3>{title}</h3>
									<p>{year}</p>
									{imageSrc && (
										<div className={styles.imageContainer}>
											<Image
												src={imageSrc}
												fill
												alt={title}
												style={{ objectFit: "contain" }}
											/>
										</div>
									)}
									<p>
										{linkHref && linkText && (
											<a href={linkHref} target="_blank">
												{linkText}
											</a>
										)}
									</p>
									<p>{description}</p>
								</div>
							)
						)}
					</div>
				</section>
			</section>
			<Footer />
		</>
	);
}
