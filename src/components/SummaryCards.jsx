import { STATUSES, STATUS_COLORS } from "../constants";

export default function SummaryCards({ counts, total }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <span className="summary-label">Total</span>
        <span className="summary-value">{total}</span>
      </div>
      {STATUSES.map((status) => (
        <div
          key={status}
          className="summary-card"
          style={{ borderTopColor: STATUS_COLORS[status] }}
        >
          <span className="summary-label">{status}</span>
          <span className="summary-value">{counts[status]}</span>
        </div>
      ))}
    </div>
  );
}
