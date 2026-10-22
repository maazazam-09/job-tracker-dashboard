import { STATUSES } from "../constants";

export default function FilterBar({
  filter,
  search,
  counts,
  total,
  onFilter,
  onSearch,
}) {
  return (
    <div className="filter-bar">
      <div className="chips" role="tablist" aria-label="Filter by status">
        <button
          type="button"
          className={`chip ${filter === "All" ? "chip-active" : ""}`}
          onClick={() => onFilter("All")}
        >
          All ({total})
        </button>
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`chip ${filter === status ? "chip-active" : ""}`}
            onClick={() => onFilter(status)}
          >
            {status} ({counts[status]})
          </button>
        ))}
      </div>
      <input
        type="search"
        className="search"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search applications"
      />
    </div>
  );
}
