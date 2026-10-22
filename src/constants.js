export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export const STATUS_COLORS = {
  Applied: "#3b82f6",
  Interview: "#f59e0b",
  Offer: "#10b981",
  Rejected: "#ef4444",
};

export const STORAGE_KEY = "job-tracker-dashboard:v1";

export const SAMPLE_JOBS = [
  {
    id: "seed-1",
    company: "Acme Corp",
    role: "Frontend Developer",
    status: "Applied",
    date: "2026-10-10",
    notes: "Applied via company careers page.",
  },
  {
    id: "seed-2",
    company: "Globex",
    role: "React Developer",
    status: "Interview",
    date: "2026-10-05",
    notes: "Technical round scheduled for next week.",
  },
  {
    id: "seed-3",
    company: "Initech",
    role: "Junior Software Engineer",
    status: "Offer",
    date: "2026-09-28",
    notes: "Offer received, reviewing compensation.",
  },
  {
    id: "seed-4",
    company: "Umbrella Labs",
    role: "UI Engineer",
    status: "Rejected",
    date: "2026-09-20",
    notes: "Position filled internally.",
  },
];
