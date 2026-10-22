import { useState } from "react";
import { STATUSES } from "../constants";

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = () => ({
  company: "",
  role: "",
  status: "Applied",
  date: today(),
  notes: "",
});

export default function JobForm({ editingJob, onAdd, onUpdate, onCancel }) {
  // The parent re-mounts this form (via `key`) when the edited job changes,
  // so initial state is enough to keep the fields in sync.
  const [form, setForm] = useState(() =>
    editingJob
      ? {
          company: editingJob.company,
          role: editingJob.role,
          status: editingJob.status,
          date: editingJob.date,
          notes: editingJob.notes || "",
        }
      : emptyForm()
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = form.company.trim();
    const role = form.role.trim();

    if (!company || !role) {
      setError("Company and role are required.");
      return;
    }
    setError("");

    const data = { ...form, company, role, notes: form.notes.trim() };

    if (editingJob) {
      onUpdate({ ...data, id: editingJob.id });
    } else {
      onAdd({ ...data, id: crypto.randomUUID() });
      setForm(emptyForm());
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        Company
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="e.g. Acme Corp"
        />
      </label>

      <label>
        Role
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
        />
      </label>

      <div className="row">
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date applied
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        Notes
        <textarea
          name="notes"
          rows="3"
          value={form.notes}
          onChange={handleChange}
          placeholder="Recruiter name, next steps, links..."
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingJob ? "Save changes" : "Add application"}
        </button>
        {editingJob && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
