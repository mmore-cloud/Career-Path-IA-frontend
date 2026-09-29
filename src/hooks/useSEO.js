import { useEffect } from 'react';

function setMetaTag(attr, key, content) {
    let tag = document.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

export function useSEO({ title, description, canonicalPath }) {
    useEffect(() => {
        // Estrategia 1: título único por página
        if (title) document.title = title;

        // Estrategia 2: meta description unica
        if (description) setMetaTag('name', 'description', description);

        // Estrategia 3: Open Graph 
        if (title) setMetaTag('property', 'og:title', title);
        if (description) setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:type', 'website');

        // Estrategia 4: URL canónica (evita contenido duplicado)
        if (canonicalPath) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', `${window.location.origin}${canonicalPath}`);
        }
    }, [title, description, canonicalPath]);
}