import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { careers } from "../data/careers";
import { questions } from "../data/testQuestions";
import CareerCard from "../components/CareerCard";
import { useSEO } from "../hooks/useSEO";
import { useLocalAuth } from "../hooks/useLocalAuth";
import {
	buildEscoProfile,
	getDominantArea,
	rankCareersFromEsco,
} from "../utils/careerMatcher";
import { buildLearningRouteFromCareer } from "../utils/learningRouteBuilder";
import { buscarOcupacionesPorPerfil } from "../services/escoService";

const TEST_ANSWERS_KEY = "careerpath_test_answers";
const ESCO_PROFILE_KEY = "careerpath_esco_profile";
const RECOMMENDED_CAREERS_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_KEY = "careerpath_learning_route";
const FAVORITES_KEY = "careerpath-favoritos-utn";
const VOCATIONAL_CAREERS = careers.filter(
	(career) => career.area === "grado" || career.area === "pregrado",
);

const normalizeText = (value) =>
	String(value ?? "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

const getCareerTitle = (career) =>
	career?.nombre ?? career?.titulo ?? "Carrera UTN";

const getCareerDescription = (career) =>
	career?.descripcion ?? "Información de la carrera no disponible.";

const getCareerArea = (career) =>
	career?.area ?? career?.subtipo ?? career?.tipo ?? "Carrera UTN";

const adaptCareerForCard = (career) => ({
	...career,
	nombre: getCareerTitle(career),
	titulo: career?.titulo ?? career?.nombre ?? "Carrera UTN",
	descripcion: getCareerDescription(career),
	area: getCareerArea(career),
	duracion: career?.duracion ?? "No especificada",
	modalidad: career?.modalidad ?? "No especificada",
});

const getOccupationTitle = (occupation) =>
	occupation?.title ??
	occupation?.preferredLabel ??
	occupation?.label ??
	"Ocupación relacionada";

function readFavorites() {
	try {
		return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
	} catch {
		return [];
	}
}

function readStoredProfile() {
	try {
		return JSON.parse(localStorage.getItem(ESCO_PROFILE_KEY)) || null;
	} catch {
		return null;
	}
}

function getAnswerList(rawAnswers) {
	return Object.entries(rawAnswers)
		.map(
			([questionIndex, optionIndex]) =>
				questions[Number(questionIndex)]?.options?.[optionIndex],
		)
		.filter(Boolean);
}

function readTestContext() {
	const storedAnswers = localStorage.getItem(TEST_ANSWERS_KEY);

	if (!storedAnswers) {
		return {
			hasTestAnswers: false,
			answerList: [],
		};
	}

	try {
		const rawAnswers = JSON.parse(storedAnswers);
		const answerList = getAnswerList(rawAnswers);

		return {
			hasTestAnswers: answerList.length > 0,
			answerList,
		};
	} catch (error) {
		console.error("Error al leer las respuestas del test:", error);

		return {
			hasTestAnswers: false,
			answerList: [],
		};
	}
}

export default function Resultados() {
	useSEO({
		title: "Resultados y Carreras UTN | CareerPath AI",
		description:
			"Explorá carreras de la UTN relacionadas con tu perfil vocacional y ocupaciones de ESCO.",
		canonicalPath: "/resultados",
	});

	const { activeUser, isAuthenticated, isLoadingAuth } = useLocalAuth();

	const [testContext] = useState(readTestContext);
	const { hasTestAnswers, answerList } = testContext;

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedArea, setSelectedArea] = useState("");
	const [recommendedCareers, setRecommendedCareers] = useState([]);
	const [escoOccupations, setEscoOccupations] = useState([]);
	const [escoProfile, setEscoProfile] = useState(readStoredProfile);
	const [isLoadingResults, setIsLoadingResults] = useState(
		() => hasTestAnswers,
	);
	const [escoError, setEscoError] = useState("");
	const [viewMode, setViewMode] = useState("grid");
	const [favorites, setFavorites] = useState(readFavorites);
	const [selectedCareer, setSelectedCareer] = useState(null);
	const [toastMessage, setToastMessage] = useState("");
	const [openPlanIndex, setOpenPlanIndex] = useState(null);
	const [showCareerSites, setShowCareerSites] = useState(false);

	useEffect(() => {
		if (isLoadingAuth || !activeUser || !hasTestAnswers) {
			return undefined;
		}

		let isActive = true;

		const loadRecommendations = async () => {
			await Promise.resolve();

			if (!isActive) {
				return;
			}

			setIsLoadingResults(true);
			setEscoError("");

			const storedProfile = readStoredProfile();
			const profile =
				storedProfile ??
				buildEscoProfile({
					answers: answerList,
					user: activeUser,
				});

			setEscoProfile(profile);
			localStorage.setItem(ESCO_PROFILE_KEY, JSON.stringify(profile));

			try {
				const occupations = await buscarOcupacionesPorPerfil(
					profile.searchTerms,
					5,
				);

				if (!isActive) {
					return;
				}

				setEscoOccupations(occupations);

				const recommendations = rankCareersFromEsco({
					careers,
					occupations,
					answers: answerList,
					user: activeUser,
					limit: 8,
				});

				const finalRecommendationsRaw =
					recommendations.length > 0
						? recommendations
						: careers.slice(0, 6);

				const finalRecommendations =
					finalRecommendationsRaw.map(adaptCareerForCard);

				setRecommendedCareers(finalRecommendations);

				localStorage.setItem(
					RECOMMENDED_CAREERS_KEY,
					JSON.stringify(finalRecommendations),
				);

				const dominantArea =
					profile.dominantArea ?? getDominantArea(answerList);

				const learningRoute = buildLearningRouteFromCareer(
					finalRecommendations[0],
					dominantArea,
				);

				if (learningRoute) {
					localStorage.setItem(
						LEARNING_ROUTE_KEY,
						JSON.stringify(learningRoute),
					);
				}
			} catch (error) {
				console.error("Error al consultar ESCO:", error);

				if (!isActive) {
					return;
				}

				setEscoOccupations([]);
				setEscoError(
					"No pudimos consultar ESCO en este momento. Mostramos recomendaciones calculadas con tus respuestas.",
				);

				const fallbackRecommendations = rankCareersFromEsco({
					careers: VOCATIONAL_CAREERS,
					occupations: [],
					answers: answerList,
					user: activeUser,
					limit: 8,
				});

				const finalRecommendationsRaw =
					fallbackRecommendations.length > 0
						? fallbackRecommendations
						: VOCATIONAL_CAREERS.slice(0, 6);

				const finalRecommendations =
					finalRecommendationsRaw.map(adaptCareerForCard);

				setRecommendedCareers(finalRecommendations);

				localStorage.setItem(
					RECOMMENDED_CAREERS_KEY,
					JSON.stringify(finalRecommendations),
				);

				const dominantArea =
					profile.dominantArea ?? getDominantArea(answerList);

				const learningRoute = buildLearningRouteFromCareer(
					finalRecommendations[0],
					dominantArea,
				);

				if (learningRoute) {
					localStorage.setItem(
						LEARNING_ROUTE_KEY,
						JSON.stringify(learningRoute),
					);
				}
			} finally {
				if (isActive) {
					setIsLoadingResults(false);
				}
			}
		};

		loadRecommendations();

		return () => {
			isActive = false;
		};
	}, [
		activeUser,
		answerList,
		hasTestAnswers,
		isLoadingAuth,
	]);

	useEffect(() => {
		if (!toastMessage) {
			return undefined;
		}

		const timeout = setTimeout(() => {
			setToastMessage("");
		}, 2400);

		return () => clearTimeout(timeout);
	}, [toastMessage]);

	useEffect(() => {
		if (selectedCareer) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [selectedCareer]);

	const normalizedSearch = normalizeText(searchTerm);
	const normalizedSelectedArea = normalizeText(selectedArea);

	const filteredCareers = recommendedCareers
		.filter((career) => {
			const careerText = normalizeText(
				[
					career?.id,
					getCareerTitle(career),
					getCareerDescription(career),
					getCareerArea(career),
					career?.subtipo,
					career?.tipo,
					career?.duracion,
					career?.modalidad,
					career?.planNombre,
					career?.facultades?.join(" "),
				].join(" "),
			);

			const matchesSearch =
				normalizedSearch === "" || careerText.includes(normalizedSearch);

			const matchesArea =
				normalizedSelectedArea === "" ||
				normalizeText(getCareerArea(career)) === normalizedSelectedArea ||
				normalizeText(career?.subtipo) === normalizedSelectedArea ||
				normalizeText(career?.tipo) === normalizedSelectedArea;

			return matchesSearch && matchesArea;
		})
		.map(adaptCareerForCard);

	const areaOptions = [
		...new Set(
			recommendedCareers
				.map((career) => getCareerArea(career))
				.filter(Boolean),
		),
	];

	const visibleOccupations = escoOccupations
		.map((occupation) => ({
			...occupation,
			displayTitle: getOccupationTitle(occupation),
		}))
		.filter(
			(occupation, index, array) =>
				array.findIndex(
					(item) => item.displayTitle === occupation.displayTitle,
				) === index,
		)
		.slice(0, 8);

	const handleToggleFavorite = (career) => {
		const careerId = career.id;
		const careerTitle = getCareerTitle(career);
		let updatedFavorites = [...favorites];

		if (updatedFavorites.includes(careerId)) {
			updatedFavorites = updatedFavorites.filter(
				(favoriteId) => favoriteId !== careerId,
			);
			setToastMessage(`“${careerTitle}” se quitó de tus favoritos.`);
		} else {
			updatedFavorites.push(careerId);
			setToastMessage(`“${careerTitle}” se guardó en tus favoritos.`);
		}

		setFavorites(updatedFavorites);
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
	};

	const handleRetakeTest = () => {
		localStorage.removeItem(TEST_ANSWERS_KEY);
		localStorage.removeItem(ESCO_PROFILE_KEY);
		localStorage.removeItem(RECOMMENDED_CAREERS_KEY);
		localStorage.removeItem(LEARNING_ROUTE_KEY);
	};

	const handleOpenCareer = (career) => {
		setOpenPlanIndex(null);
		setShowCareerSites(false);
		setSelectedCareer(career);
	};

	const closeModal = () => {
		setSelectedCareer(null);
	};

	if (isLoadingAuth) {
		return (
			<main className="container py-5 text-center">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Cargando...</span>
				</div>
			</main>
		);
	}

	if (!isAuthenticated) {
		return (
			<main className="container py-5 text-center cp-fade-up">
				<i className="bi bi-person-lock display-4 text-primary mb-3"></i>
				<h1 className="fw-bold">Primero iniciá sesión</h1>
				<p className="text-secondary">
					Necesitás iniciar sesión o crear una cuenta para generar tus
					resultados.
				</p>
				<Link to="/perfil" className="btn btn-primary rounded-pill mt-3">
					<i className="bi bi-arrow-right-circle me-2"></i>
					Ir a Mi Perfil
				</Link>
			</main>
		);
	}

	if (!hasTestAnswers) {
		return (
			<main className="container py-5 text-center cp-fade-up">
				<i className="bi bi-clipboard-x display-4 text-primary mb-3"></i>
				<h1 className="fw-bold">Todavía no hiciste el test</h1>
				<p className="text-secondary">
					Completá el test vocacional para consultar ESCO y ver tus carreras
					recomendadas.
				</p>
				<Link to="/test" className="btn btn-primary rounded-pill mt-3">
					<i className="bi bi-clipboard-check me-2"></i>
					Ir al Test Vocacional
				</Link>
			</main>
		);
	}

	return (
		<main className="container py-5 cp-results-page">
			<header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 cp-fade-up">
				<div>
					<span className="badge rounded-pill text-bg-primary mb-3 cp-soft-badge">
						<i className="bi bi-stars me-2"></i>
						Resultados personalizados
					</span>
					<h1 className="fw-bold mb-1">Resultados de tu Test Vocacional</h1>
					<p className="text-secondary mb-0">
						Hola {activeUser?.nombre ?? "usuario"}, relacionamos tus respuestas
						con ocupaciones de ESCO y carreras disponibles en la UTN.
					</p>
				</div>

				<Link
					to="/test"
					className="btn btn-outline-primary rounded-pill"
					onClick={handleRetakeTest}
				>
					<i className="bi bi-arrow-repeat me-2"></i>
					Rehacer test
				</Link>
			</header>

			{isLoadingResults && (
				<section className="text-center py-5 bg-body-tertiary rounded-4 border mb-4 cp-fade-up">
					<div className="spinner-border text-primary mb-3" role="status">
						<span className="visually-hidden">Consultando ESCO...</span>
					</div>
					<h2 className="h5 fw-bold">Analizando tu perfil vocacional</h2>
					<p className="text-secondary mb-0">
						Estamos consultando ocupaciones de ESCO y relacionándolas con
						carreras de la UTN.
					</p>
				</section>
			)}

			{escoError && (
				<div
					className="alert alert-warning rounded-4 d-flex align-items-start gap-3 cp-fade-up"
					role="alert"
				>
					<i className="bi bi-exclamation-triangle-fill fs-4"></i>
					<div>
						<strong>ESCO no respondió correctamente.</strong>
						<div>{escoError}</div>
					</div>
				</div>
			)}

			{!isLoadingResults && visibleOccupations.length > 0 && (
				<section className="card border-0 shadow-sm rounded-4 mb-4 cp-fade-up">
					<div className="card-body p-4">
						<div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
							<div>
								<span className="badge bg-primary-subtle text-primary-emphasis rounded-pill mb-2">
									<i className="bi bi-diagram-3 me-2"></i>
									ESCO
								</span>
								<h2 className="h5 fw-bold mb-1">
									Ocupaciones relacionadas con tu perfil
								</h2>
								<p className="text-secondary small mb-0">
									Estas ocupaciones ayudan a CareerPath a relacionar tus
									intereses con carreras de la UTN.
								</p>
							</div>

							{escoProfile?.dominantArea && (
								<span className="badge text-bg-secondary rounded-pill">
									Área predominante: {escoProfile.dominantArea}
								</span>
							)}
						</div>

						<div className="d-flex flex-wrap gap-2">
							{visibleOccupations.map((occupation, index) => (
								<span
									className="badge rounded-pill bg-body-tertiary text-body border px-3 py-2"
									key={
										occupation?.uri ??
										occupation?._links?.self?.href ??
										`${occupation.displayTitle}-${index}`
									}
								>
									<i className="bi bi-briefcase me-2 text-primary"></i>
									{occupation.displayTitle}
								</span>
							))}
						</div>
					</div>
				</section>
			)}

			{!isLoadingResults && recommendedCareers.length > 0 && (
				<>
					<section
						className="row g-3 mb-4 cp-fade-up"
						aria-label="Filtros de búsqueda"
					>
						<div className="col-md-7">
							<label
								htmlFor="buscar-carrera"
								className="form-label fw-semibold"
							>
								<i className="bi bi-search text-primary me-2"></i>
								Buscar carrera
							</label>
							<input
								id="buscar-carrera"
								type="text"
								className="form-control"
								placeholder="Buscar por nombre, área, descripción o facultad..."
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>

						<div className="col-md-3">
							<label htmlFor="filtro-area" className="form-label fw-semibold">
								<i className="bi bi-funnel text-primary me-2"></i>
								Filtrar por área
							</label>
							<select
								id="filtro-area"
								className="form-select"
								value={selectedArea}
								onChange={(event) => setSelectedArea(event.target.value)}
							>
								<option value="">Todas las áreas</option>
								{areaOptions.map((area) => (
									<option value={area} key={area}>
										{area}
									</option>
								))}
							</select>
						</div>

						<div className="col-md-2">
							<label className="form-label fw-semibold">
								<i className="bi bi-layout-three-columns text-primary me-2"></i>
								Vista
							</label>
							<div
								className="btn-group w-100"
								role="group"
								aria-label="Cambiar vista"
							>
								<button
									className={`btn btn-outline-primary ${viewMode === "grid" ? "active" : ""
										}`}
									type="button"
									onClick={() => setViewMode("grid")}
								>
									<i className="bi bi-grid-3x3-gap"></i>
								</button>
								<button
									className={`btn btn-outline-primary ${viewMode === "list" ? "active" : ""
										}`}
									type="button"
									onClick={() => setViewMode("list")}
								>
									<i className="bi bi-list-ul"></i>
								</button>
							</div>
						</div>
					</section>

					<section className="mb-3 cp-fade-up">
						<p className="text-secondary mb-0">
							<i className="bi bi-list-check me-2 text-primary"></i>
							Carreras recomendadas encontradas:{" "}
							<strong>{filteredCareers.length}</strong>
						</p>
					</section>

					<section
						className={
							viewMode === "grid"
								? "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
								: "row row-cols-1 g-3"
						}
						aria-label="Listado de carreras recomendadas"
					>
						{filteredCareers.length === 0 ? (
							<div className="col-12">
								<div
									className="alert alert-info rounded-4 cp-fade-up"
									role="alert"
								>
									<i className="bi bi-info-circle me-2"></i>
									No se encontraron carreras que coincidan con la búsqueda.
								</div>
							</div>
						) : (
							filteredCareers.map((career, index) => (
								<div
									className="col cp-fade-up"
									key={career.id ?? `${career.nombre}-${index}`}
									style={{ animationDelay: `${index * 45}ms` }}
								>
									<CareerCard
										career={career}
										isFavorite={favorites.includes(career.id)}
										viewMode={viewMode}
										onToggleFavorite={() => handleToggleFavorite(career)}
										onViewDetails={() => handleOpenCareer(career)}
									/>
								</div>
							))
						)}
					</section>
				</>
			)}

			{!isLoadingResults &&
				recommendedCareers.length === 0 &&
				!escoError && (
					<div className="alert alert-info rounded-4 cp-fade-up" role="alert">
						<i className="bi bi-info-circle me-2"></i>
						No pudimos generar recomendaciones para este perfil.
					</div>
				)}

			{toastMessage && (
				<div className="res-toast-careerpath visible" role="status">
					<i className="bi bi-info-circle me-2"></i>
					{toastMessage}
				</div>
			)}

			{selectedCareer && (
				<div
					className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-center overflow-auto p-2 p-sm-3 bg-dark bg-opacity-75"
					style={{
						zIndex: 2000,
						backdropFilter: "blur(8px)",
					}}
					role="dialog"
					aria-modal="true"
					onClick={closeModal}
				>
					<article
						className="card border-0 shadow-lg rounded-4 w-100 my-auto cp-fade-up"
						style={{ maxWidth: "680px" }}
						onClick={(event) => event.stopPropagation()}
					>
						<div className="card-body p-3 p-md-4">
							<div className="d-flex justify-content-between align-items-start gap-3 mb-3">
								<div>
									<span className="badge rounded-pill text-bg-primary mb-2">
										<i className="bi bi-mortarboard me-2"></i>
										{getCareerArea(selectedCareer)}
									</span>
									<h2 className="h4 fw-bold mb-0">
										{getCareerTitle(selectedCareer)}
									</h2>
								</div>

								<button
									type="button"
									className="btn btn-sm btn-outline-secondary rounded-circle flex-shrink-0"
									aria-label="Cerrar"
									onClick={closeModal}
								>
									<i className="bi bi-x-lg"></i>
								</button>
							</div>

							<p className="text-secondary small mb-3">
								{getCareerDescription(selectedCareer)}
							</p>

							{selectedCareer.matchedOccupations?.length > 0 && (
								<div className="mb-3">
									<small className="text-secondary d-block mb-2">
										Ocupaciones ESCO relacionadas
									</small>
									<div className="d-flex flex-wrap gap-1">
										{selectedCareer.matchedOccupations.map((occupation) => (
											<span
												className="badge rounded-pill bg-primary-subtle text-primary-emphasis"
												key={occupation}
											>
												{occupation}
											</span>
										))}
									</div>
								</div>
							)}


							<div className="row g-2 mb-3">
								{/* Duración */}
								<div className="col-12 col-md-4">
									<div className="bg-body-tertiary border rounded-3 p-3 h-100">
										<i className="bi bi-clock text-primary d-block mb-2"></i>
										<small className="text-secondary d-block mb-1">
											Duración
										</small>
										<strong className="d-block">
											{selectedCareer.duracion ?? "No especificada"}
										</strong>
									</div>
								</div>

								{/* Modalidad */}
								<div className="col-12 col-md-4">
									<div className="bg-body-tertiary border rounded-3 p-3 h-100">
										<i className="bi bi-display text-primary d-block mb-2"></i>
										<small className="text-secondary d-block mb-1">
											Modalidad
										</small>
										<strong className="d-block">
											{selectedCareer.modalidad ?? "No especificada"}
										</strong>
									</div>
								</div>

								{/* Tipo */}
								<div className="col-12 col-md-4">
									<div className="bg-body-tertiary border rounded-3 p-3 h-100">
										<i className="bi bi-award text-primary d-block mb-2"></i>
										<small className="text-secondary d-block mb-1">
											Tipo
										</small>
										<strong className="d-block">
											{selectedCareer.subtipo ??
												selectedCareer.tipo ??
												"UTN"}
										</strong>
									</div>
								</div>
							</div>

							<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary rounded-pill"
									onClick={() =>
										setShowCareerSites((currentValue) => !currentValue)
									}
								>
									<i className="bi bi-building me-2"></i>
									{showCareerSites
										? "Ocultar facultades"
										: "Ver facultades"}
								</button>

								<small className="text-secondary">
									{selectedCareer.facultades?.length ?? 0} sede/s cargada/s
								</small>
							</div>

							{showCareerSites && (
								<div className="d-flex flex-wrap gap-1 mb-3">
									{selectedCareer.facultades?.length > 0 ? (
										selectedCareer.facultades.map((sede) => (
											<span
												className="badge rounded-pill text-bg-secondary"
												key={sede}
											>
												{sede}
											</span>
										))
									) : (
										<span className="text-secondary small">
											Consultar disponibilidad en la UTN.
										</span>
									)}
								</div>
							)}

							<div className="border rounded-3 overflow-hidden mb-3">
								<div className="bg-body-tertiary px-3 py-2 border-bottom">
									<div className="d-flex justify-content-between align-items-center gap-2">
										<h3 className="h6 fw-bold mb-0">
											<i className="bi bi-journal-text me-2 text-primary"></i>
											{selectedCareer.planNombre ?? "Plan de estudios"}
										</h3>
										<small className="text-secondary d-none d-sm-inline">
											Tocá un año para ver materias
										</small>
									</div>
								</div>

								{selectedCareer.planEstudios?.length > 0 ? (
									<div
										className="accordion accordion-flush"
										id="accordionPlanCarrera"
									>
										{selectedCareer.planEstudios.map((bloque, index) => {
											const collapseId = `planCarrera${index}`;
											const isOpen = openPlanIndex === index;

											return (
												<div
													className="accordion-item"
													key={collapseId}
												>
													<h4 className="accordion-header">
														<button
															className={`accordion-button py-2 ${isOpen ? "" : "collapsed"
																}`}
															type="button"
															onClick={() =>
																setOpenPlanIndex(
																	isOpen ? null : index,
																)
															}
															aria-expanded={isOpen}
															aria-controls={collapseId}
														>
															<span className="fw-semibold small">
																{bloque.nivel ?? `Año ${index + 1}`}
															</span>
														</button>
													</h4>

													<div
														id={collapseId}
														className={`accordion-collapse collapse ${isOpen ? "show" : ""
															}`}
													>
														<div className="accordion-body py-2">
															<ul className="mb-0 small ps-3">
																{(bloque.materias ?? []).map(
																	(materia) => (
																		<li
																			className="mb-1"
																			key={materia}
																		>
																			{materia}
																		</li>
																	),
																)}
															</ul>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								) : (
									<div className="alert alert-info rounded-0 mb-0 py-2 small">
										<i className="bi bi-info-circle me-2"></i>
										El detalle del plan todavía no está cargado. Podés consultar
										la fuente oficial de la UTN.
									</div>
								)}
							</div>

							<div className="d-flex flex-wrap justify-content-end gap-2">
								{selectedCareer.fuenteOficial && (
									<a
										href={selectedCareer.fuenteOficial}
										target="_blank"
										rel="noreferrer"
										className="btn btn-outline-primary btn-sm rounded-pill"
									>
										<i className="bi bi-box-arrow-up-right me-2"></i>
										Fuente oficial
									</a>
								)}

								{selectedCareer.planUrl && (
									<a
										href={selectedCareer.planUrl}
										target="_blank"
										rel="noreferrer"
										className="btn btn-primary btn-sm rounded-pill"
									>
										<i className="bi bi-journal-bookmark me-2"></i>
										Ver plan
									</a>
								)}

								<button
									type="button"
									className="btn btn-secondary btn-sm rounded-pill"
									onClick={closeModal}
								>
									Cerrar
								</button>
							</div>
						</div>
					</article>
				</div>
			)}
		</main>
	);
}
