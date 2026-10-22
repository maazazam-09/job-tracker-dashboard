import { SAMPLE_JOBS, STORAGE_KEY } from "./constants";

export const ACTIONS = {
  ADD_JOB: "ADD_JOB",
  UPDATE_JOB: "UPDATE_JOB",
  DELETE_JOB: "DELETE_JOB",
  SET_STATUS: "SET_STATUS",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH: "SET_SEARCH",
  START_EDIT: "START_EDIT",
  CANCEL_EDIT: "CANCEL_EDIT",
};

function loadJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return SAMPLE_JOBS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_JOBS;
  } catch {
    return SAMPLE_JOBS;
  }
}

export function init() {
  return {
    jobs: loadJobs(),
    filter: "All",
    search: "",
    editingId: null,
  };
}

export function jobsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_JOB:
      return { ...state, jobs: [action.payload, ...state.jobs] };

    case ACTIONS.UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((j) =>
          j.id === action.payload.id ? { ...j, ...action.payload } : j
        ),
        editingId: null,
      };

    case ACTIONS.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.id !== action.payload),
        editingId: state.editingId === action.payload ? null : state.editingId,
      };

    case ACTIONS.SET_STATUS:
      return {
        ...state,
        jobs: state.jobs.map((j) =>
          j.id === action.payload.id
            ? { ...j, status: action.payload.status }
            : j
        ),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };

    case ACTIONS.START_EDIT:
      return { ...state, editingId: action.payload };

    case ACTIONS.CANCEL_EDIT:
      return { ...state, editingId: null };

    default:
      return state;
  }
}
