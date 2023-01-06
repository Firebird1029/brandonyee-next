import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<>
			<section className={`${styles.parallax} hidden-touch`}>
				<div>
					<h3 className="unselectable">BRANDON YEE</h3>
				</div>
			</section>
			<section className="hidden-desktop">
				<p className="spacer">&nbsp;</p>
				<p style={{ textAlign: "center" }}>&copy; 2023 Brandon Yee</p>
			</section>
		</>
	);
}
