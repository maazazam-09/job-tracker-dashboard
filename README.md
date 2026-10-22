# Job Tracker Dashboard

A responsive React app for tracking job applications by status (Applied, Interview, Offer, Rejected), with add, edit, delete and filter features, Chart.js statistics and localStorage persistence.

**Tech stack:** React 18, JavaScript (ES6+), CSS3, Chart.js (via react-chartjs-2), Vite

## Features

- Add, edit and delete job applications
- Change an application's status inline from the list
- Filter by status and search by company or role
- Summary cards and Doughnut + Bar charts (Chart.js) that update live
- Data persisted in `localStorage`, so it survives page refreshes
- Responsive layout for desktop and mobile

## React concepts used

| Concept | Where |
| --- | --- |
| `useReducer` | `src/reducer.js`, used in `App.jsx` for all job and filter state |
| `useState` | `JobForm.jsx` form fields and validation errors |
| `useEffect` | `App.jsx` saves jobs to `localStorage` on every change |
| `useMemo` | `App.jsx` derived counts and filtered list |
| Reusable components | `src/components/*` |

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  App.jsx              Root component, reducer wiring, persistence
  reducer.js           Reducer, action types, localStorage loader
  constants.js         Statuses, colours, storage key, sample data
  styles.css           All styling (CSS3 variables, grid, flexbox)
  components/
    JobForm.jsx        Add / edit form
    JobList.jsx        List of applications
    JobCard.jsx        Single application with inline status change
    FilterBar.jsx      Status chips and search box
    SummaryCards.jsx   Totals per status
    StatsChart.jsx     Chart.js Doughnut and Bar charts
```

## Deploying

Run `npm run build` and upload the `dist/` folder to Netlify, Vercel or GitHub Pages.
For GitHub Pages, set `base: "/your-repo-name/"` in `vite.config.js`.
