import JobCard from "./JobCard.jsx";

export default function JobList({ jobs, onEdit, onDelete, onStatusChange }) {
  if (jobs.length === 0) {
    return (
      <p className="empty">
        No applications match. Add one or change the filter.
      </p>
    );
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
