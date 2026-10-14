import { useEffect } from "react";

function setMetaTag(attr, key, content) {
    let tag = document.querySelector(`meta[${attr}="${key}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

export function useSEO({ title, description, canonicalPath }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        if (description) {
            setMetaTag("name", "description", description);
            setMetaTag("property", "og:description", description);
            setMetaTag("name", "twitter:description", description);
        }

        if (title) {
            setMetaTag("property", "og:title", title);
            setMetaTag("name", "twitter:title", title);
        }

        setMetaTag("property", "og:type", "website");
        setMetaTag("name", "robots", "index, follow");
        setMetaTag("name", "twitter:card", "summary_large_image");

        if (canonicalPath) {
            let link = document.querySelector('link[rel="canonical"]');

            if (!link) {
                link = document.createElement("link");
                link.setAttribute("rel", "canonical");
                document.head.appendChild(link);
            }

            link.setAttribute("href", `${window.location.origin}${canonicalPath}`);
            setMetaTag("property", "og:url", `${window.location.origin}${canonicalPath}`);
        }
    }, [title, description, canonicalPath]);
}