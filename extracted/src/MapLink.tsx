import { track } from "./analytics";
import { googleMapsSearchUrl } from "./maps";

type MapLinkProps = {
  label: string;
  place: string;
  query: string;
  source: "photo" | "food" | "cafe";
};

export default function MapLink({ label, place, query, source }: MapLinkProps) {
  return (
    <a
      className="map-link"
      href={googleMapsSearchUrl(query)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${place} · ${label}`}
      onClick={() => track("map_open", { source, place })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.25" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

