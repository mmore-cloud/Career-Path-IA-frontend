import React, { useState } from 'react';
import { carrerasUTN } from '../data/careers';
import CareerCard from '../components/CareerCard';
import { useSEO } from '../hooks/useSEO';

export default function Resultados({ onRetakeTest }) {
    useSEO({
        title: 'Resultados y Carreras UTN | CareerPath AI',
        description:
            'Explorá las carreras de la UTN Facultad Regional Tucumán, filtrá por área de interés y guardá tus favoritas.',
        canonicalPath: '/resultados',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    const filteredCareers = carrerasUTN.filter((carrera) => {
        const matchesSearch =
            carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            carrera.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesArea = selectedArea === '' || carrera.area === selectedArea;
        return matchesSearch && matchesArea;
    });

    const handleToggleFavorite = (id) => {
        let favorites = JSON.parse(localStorage.getItem('utn_favorites')) || [];
        if (favorites.includes(id)) {
            favorites = favorites.filter((favId) => favId !== id);
            alert('Carrera eliminada de favoritos.');
        } else {
            favorites.push(id);
            alert('Carrera guardada en favoritos.');
        }
        localStorage.setItem('utn_favorites', JSON.stringify(favorites));
    };

    return (
        <main className="container py-5">
            <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Resultados de tu Test Vocacional</h1>
                    <p className="text-muted mb-0">
                        Explorá las carreras de la UTN Facultad Regional Tucumán
                    </p>
                </div>
                <button onClick={onRetakeTest} className="btn btn-primary">
                    Repetir Test
                </button>
            </header>

            <section className="row g-3 mb-4" aria-label="Filtros de búsqueda">
                <div className="col-md-8">
                    <label htmlFor="buscar-carrera" className="visually-hidden">
                        Buscar carrera
                    </label>
                    <input
                        id="buscar-carrera"
                        type="text"
                        className="form-control"
                        placeholder="Buscar carrera..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="filtro-area" className="visually-hidden">
                        Filtrar por área
                    </label>
                    <select
                        id="filtro-area"
                        className="form-select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value="">Todas las areas</option>
                         <option value="carrera de grado">Carrera de grado</option>
                        <option value="carrera de pregrado">Carrera de pregrado</option>
                        <option value="complementación curricular">Complementación curricular</option>
                        <option value="carrera de posgrado">Carrera de posgrado</option>
                    </select>
                </div>
            </section>

            <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" aria-label="Listado de carreras">
                {filteredCareers.length === 0 ? (
                    <p className="text-muted text-center">
                        No se encontraron carreras que coincidan con la búsqueda.
                    </p>
                ) : (
                    filteredCareers.map((career) => (
                        <div className="col" key={career.id}>
                            <CareerCard career={career} onToggleFavorite={handleToggleFavorite} />
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}