import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { API_URL } from "../config/api";

export function useOportunidadesApi() {
  // Guarda las oportunidades obtenidas desde la API.
  const [oportunidades, setOportunidades] = useState([]);

  // Indica si la petición todavía está cargando.
  const [cargando, setCargando] = useState(true);

  // Guarda el mensaje si ocurre un error.
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerOportunidades = async () => {
      if (!API_URL) {
        const mensaje =
          "No se encontró la URL de la API.";

        setError(mensaje);
        setCargando(false);

        Swal.fire({
          icon: "error",
          title: "Error de configuración",
          text: mensaje,
        });

        return;
      }

      try {
        setCargando(true);
        setError("");

        // Realiza la petición HTTP GET.
        const response = await axios.get(API_URL);

        const resultados = Array.isArray(
          response.data?.results,
        )
          ? response.data.results
          : [];

        setOportunidades(resultados);
      } catch (errorPeticion) {
        console.error(
          "Error al consumir la API:",
          errorPeticion,
        );

        const mensaje =
          "No se pudieron obtener las oportunidades.";

        setError(mensaje);

        Swal.fire({
          icon: "error",
          title: "Error al cargar datos",
          text: mensaje,
        });
      } finally {
        setCargando(false);
      }
    };

    obtenerOportunidades();
  }, []);

  return {
    oportunidades,
    cargando,
    error,
  };
}