import React, { useState, useEffect } from "react";
import jobsDataRaw, { cities, experiences, specializations } from "./data/jobs";
import JobCard from "./components/JobCard";
import Filter from "./components/Filter";
import "./App.css";

const jobsData = jobsDataRaw.map(job => ({
  ...job,
  rating: [2.5, 3.5, 4.5][Math.floor(Math.random() * 3)]
}));

const filtersConfig = [
  { id: "specialization", name: "Specialization", options: specializations.map(s => ({ value: s, label: s })) },
  { id: "location", name: "Location", options: cities.map(c => ({ value: c, label: c })) },
  { id: "experience", name: "Experience", options: experiences.map(e => ({ value: e, label: e })) },
  { id: "rating", name: "Rating", options: [{ value: "2.5", label: "2+" }, { value: "3.5", label: "3+" }, { value: "4.5", label: "4+" }] }
];

function App() {
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [viewSaved, setViewSaved] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarked");
    return saved ? JSON.parse(saved) : [];
  });
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  useEffect(() => {
    let jobs = jobsData;
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        jobs = jobs.filter(job => {
          if (key === "rating") return job.rating >= parseFloat(values[0]);
          return values.includes(job[key]);
        });
      }
    });
    setFilteredJobs(jobs);
  }, [activeFilters]);

  const toggleBookmark = id => {
    const updated = bookmarked.includes(id)
      ? bookmarked.filter(j => j !== id)
      : [...bookmarked, id];
    setBookmarked(updated);
    localStorage.setItem("bookmarked", JSON.stringify(updated));
  };

  const clearFilters = () => setActiveFilters({});
  const displayedJobs = viewSaved ? jobsData.filter(job => bookmarked.includes(job.id)) : filteredJobs;

  return (
    <div className="App">
      <div className="sidebar">
        <div className="nav-links">
          <div className={`nav-item ${!viewSaved ? "active" : ""}`} onClick={() => setViewSaved(false)}>Home</div>
          <div className={`nav-item ${viewSaved ? "active" : ""}`} onClick={() => setViewSaved(true)}>Saved Listings</div>
        </div>
        {!viewSaved && (
          <>
            <div className="filters-header">
              <div className="nav-item" onClick={() => setFiltersExpanded(prev => !prev)}>Filters</div>
              {Object.values(activeFilters).some(arr => arr.length > 0) && (
                <div className="clear-text" onClick={clearFilters}>Clear Filters</div>
              )}
            </div>
            {filtersExpanded && (
              <div className="filter-sections">
                {filtersConfig.map(section => (
                  <div className="dropdown" key={section.id}>
                    <div className="dropdown-label">{section.name}</div>
                    <div className="dropdown-options">
                      <Filter section={section} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="main-content">
        <h1 className="page-heading">{viewSaved ? "Saved Listings" : "Doctor Job Listings"}</h1>
        {!viewSaved && Object.values(activeFilters).some(arr => arr.length > 0) && (
          <p className="result-count">{filteredJobs.length} jobs found</p>
        )}
        <div className="job-list">
          {displayedJobs.length === 0 ? <p>No jobs to show.</p> : displayedJobs.map(job => (
            <JobCard key={job.id} job={job} isBookmarked={bookmarked.includes(job.id)} toggleBookmark={toggleBookmark} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
