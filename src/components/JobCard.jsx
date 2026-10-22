import { STATUSES, STATUS_COLORS } from "../constants";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JobCard({ job, onEdit, onDelete, onStatusChange }) {
  return (
    <li className="job" style={{ borderLeftColor: STATUS_COLORS[job.status] }}>
      <div className="job-main">
        <h3>{job.role}</h3>
        <p className="job-company">{job.company}</p>
        {job.notes && <p className="job-notes">{job.notes}</p>}
        <p className="muted">Applied {formatDate(job.date)}</p>
      </div>

      <div className="job-side">
        <select
          className="status-select"
          value={job.status}
          style={{ color: STATUS_COLORS[job.status] }}
          onChange={(e) => onStatusChange(job.id, e.target.value)}
          aria-label={`Status for ${job.role} at ${job.company}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="job-actions">
          <button type="button" className="btn btn-small" onClick={() => onEdit(job.id)}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-small btn-danger"
            onClick={() => onDelete(job.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
