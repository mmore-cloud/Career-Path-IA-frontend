import axios from "axios";
import {
  ESCO_API_URL,
  ESCO_LANGUAGE,
  ESCO_VERSION,
} from "../config/api";

const requestCache = new Map();

const normalizarTexto = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getOccupationKey = (occupation) =>
  occupation?.uri ??
  occupation?._links?.self?.href ??
  occupation?.href ??
  occupation?.title ??
  occupation?.preferredLabel ??
  occupation?.label ??
  "";

const normalizeSearchResults = (data) => {
  if (Array.isArray(data?._embedded?.results)) {
    return data._embedded.results;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

export async function buscarOcupaciones(texto, limite = 6) {
  const termino = String(texto ?? "").trim();

  if (!termino) {
    return [];
  }

  const cacheKey = `${normalizarTexto(termino)}-${limite}`;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const request = axios
    .get(`${ESCO_API_URL}/search`, {
      params: {
        text: termino,
        language: ESCO_LANGUAGE,
        type: "occupation",
        limit: limite,
        full: true,
        selectedVersion: ESCO_VERSION,
      },
    })
    .then((response) => normalizeSearchResults(response.data))
    .catch((error) => {
      requestCache.delete(cacheKey);
      throw error;
    });

  requestCache.set(cacheKey, request);

  return request;
}

export async function buscarOcupacionesPorPerfil(
  terminos = [],
  limitePorTermino = 5,
) {
  const terminosUnicos = [
    ...new Set(
      terminos
        .map((termino) => String(termino ?? "").trim())
        .filter(Boolean),
    ),
  ].slice(0, 6);

  if (terminosUnicos.length === 0) {
    return [];
  }

  const responses = await Promise.allSettled(
    terminosUnicos.map((termino) =>
      buscarOcupaciones(termino, limitePorTermino),
    ),
  );

  const ocupaciones = responses.flatMap((response) =>
    response.status === "fulfilled" ? response.value : [],
  );

  if (ocupaciones.length === 0) {
    const failedRequest = responses.find(
      (response) => response.status === "rejected",
    );

    if (failedRequest) {
      throw failedRequest.reason;
    }
  }

  const uniqueOccupations = new Map();

  ocupaciones.forEach((occupation) => {
    const key = getOccupationKey(occupation);

    if (key && !uniqueOccupations.has(key)) {
      uniqueOccupations.set(key, occupation);
    }
  });

  return [...uniqueOccupations.values()];
}
