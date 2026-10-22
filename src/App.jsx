import { useEffect, useMemo, useReducer } from "react";
import { STATUSES, STORAGE_KEY } from "./constants";
import { ACTIONS, init, jobsReducer } from "./reducer";
import JobForm from "./components/JobForm.jsx";
import JobList from "./components/JobList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import StatsChart from "./components/StatsChart.jsx";

export default function App() {
  const [state, dispatch] = useReducer(jobsReducer, undefined, init);
  const { jobs, filter, search, editingId } = state;

  // Persist applications to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {
      // Storage may be full or blocked; the app keeps working in memory.
    }
  }, [jobs]);

  const counts = useMemo(() => {
    const base = Object.fromEntries(STATUSES.map((s) => [s, 0]));
    jobs.forEach((j) => {
      if (base[j.status] !== undefined) base[j.status] += 1;
    });
    return base;
  }, [jobs]);

  const visibleJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesStatus = filter === "All" || j.status === filter;
      const matchesSearch =
        !q ||
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [jobs, filter, search]);

  const editingJob = jobs.find((j) => j.id === editingId) || null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Tracker Dashboard</h1>
        <p>Keep every application, interview and offer in one place.</p>
      </header>

      <SummaryCards counts={counts} total={jobs.length} />

      <main className="layout">
        <section className="panel">
          <h2>{editingJob ? "Edit application" : "Add application"}</h2>
          <JobForm
            key={editingJob ? editingJob.id : "new"}
            editingJob={editingJob}
            onAdd={(job) => dispatch({ type: ACTIONS.ADD_JOB, payload: job })}
            onUpdate={(job) =>
              dispatch({ type: ACTIONS.UPDATE_JOB, payload: job })
            }
            onCancel={() => dispatch({ type: ACTIONS.CANCEL_EDIT })}
          />
        </section>

        <section className="panel">
          <h2>Statistics</h2>
          <StatsChart counts={counts} />
        </section>

        <section className="panel panel-wide">
          <div className="list-head">
            <h2>Applications</h2>
            <span className="muted">
              Showing {visibleJobs.length} of {jobs.length}
            </span>
          </div>
          <FilterBar
            filter={filter}
            search={search}
            counts={counts}
            total={jobs.length}
            onFilter={(f) => dispatch({ type: ACTIONS.SET_FILTER, payload: f })}
            onSearch={(s) => dispatch({ type: ACTIONS.SET_SEARCH, payload: s })}
          />
          <JobList
            jobs={visibleJobs}
            onEdit={(id) => dispatch({ type: ACTIONS.START_EDIT, payload: id })}
            onDelete={(id) => {
              if (window.confirm("Delete this application?")) {
                dispatch({ type: ACTIONS.DELETE_JOB, payload: id });
              }
            }}
            onStatusChange={(id, status) =>
              dispatch({ type: ACTIONS.SET_STATUS, payload: { id, status } })
            }
          />
        </section>
      </main>
    </div>
  );
}
