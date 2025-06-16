import React, { useState, useEffect } from 'react';
import './jobs.css';
import searchIcon from '../assets/icons/search.png';
import filterIcon from '../assets/icons/filter.png';
import sortIcon from '../assets/icons/sort.png';

// Fake data for jobs
const fakeJobs = [
  {
    id: 1,
    title: 'Warehouse Assistant',
    company: 'LogisticsPlus',
    location: 'Amsterdam, Netherlands',
    type: 'Full-time',
    salary: '€2,200 - €2,500',
    sellingPoints: [
      'No Dutch language required',
      'On-the-job training provided',
      'International team environment'
    ],
    description: 'Looking for motivated individuals to join our warehouse team. No previous experience required. We provide full training and support. Basic English is sufficient.',
    status: 'new',
    datePosted: '2024-03-15'
  },
  {
    id: 2,
    title: 'Kitchen Helper',
    company: 'Global Cuisine',
    location: 'Rotterdam, Netherlands',
    type: 'Part-time',
    salary: '€1,800 - €2,000',
    sellingPoints: [
      'Multicultural workplace',
      'Flexible hours',
      'Meal benefits included'
    ],
    description: 'Join our diverse kitchen team. No previous experience needed. We welcome people from all backgrounds. Basic English or Dutch is sufficient.',
    status: 'new',
    datePosted: '2024-03-14'
  },
  {
    id: 3,
    title: 'Cleaning Staff',
    company: 'Clean Solutions',
    location: 'Utrecht, Netherlands',
    type: 'Full-time',
    salary: '€2,000 - €2,300',
    sellingPoints: [
      'No language requirements',
      'Stable hours',
      'Supportive team environment'
    ],
    description: 'Looking for reliable cleaning staff. Full training provided. No previous experience required. We value hard work and dedication.',
    status: 'new',
    datePosted: '2024-03-13'
  },
  {
    id: 4,
    title: 'Production Line Worker',
    company: 'FoodFactory',
    location: 'Amsterdam, Netherlands',
    type: 'Full-time',
    salary: '€2,100 - €2,400',
    sellingPoints: [
      'No Dutch required',
      'Regular shifts',
      'Health insurance included'
    ],
    description: 'Join our food production team. We provide all necessary training. Looking for reliable team members who are eager to learn.',
    status: 'new',
    datePosted: '2024-03-12'
  },
  {
    id: 5,
    title: 'Retail Assistant',
    company: 'Global Market',
    location: 'Eindhoven, Netherlands',
    type: 'Part-time',
    salary: '€1,900 - €2,200',
    sellingPoints: [
      'Multilingual environment',
      'Customer service training',
      'Flexible scheduling'
    ],
    description: 'Join our international retail team. Basic English required. We value cultural diversity and provide full training.',
    status: 'new',
    datePosted: '2024-03-11'
  },
  {
    id: 6,
    title: 'Delivery Driver',
    company: 'QuickDelivery',
    location: 'Rotterdam, Netherlands',
    type: 'Part-time',
    salary: '€2,000 - €2,500',
    sellingPoints: [
      'Flexible hours',
      'Independent work',
      'Vehicle provided'
    ],
    description: 'Looking for reliable delivery drivers. Basic navigation skills required. We provide the vehicle and training.',
    status: 'new',
    datePosted: '2024-03-10'
  },
  {
    id: 7,
    title: 'Construction Helper',
    company: 'BuildRight',
    location: 'Amsterdam, Netherlands',
    type: 'Full-time',
    salary: '€2,200 - €2,600',
    sellingPoints: [
      'On-the-job training',
      'Safety equipment provided',
      'Regular hours'
    ],
    description: 'Join our construction team. No experience needed. We provide all necessary training and safety equipment.',
    status: 'new',
    datePosted: '2024-03-09'
  },
  {
    id: 8,
    title: 'Garden Maintenance',
    company: 'Green Spaces',
    location: 'Utrecht, Netherlands',
    type: 'Part-time',
    salary: '€1,800 - €2,200',
    sellingPoints: [
      'Outdoor work',
      'Flexible schedule',
      'Tools provided'
    ],
    description: 'Looking for garden maintenance workers. No experience required. We provide all tools and training.',
    status: 'new',
    datePosted: '2024-03-08'
  }
];

// Filter and sort options
const filterOptions = {
  type: ['All', 'Full-time', 'Part-time'],
  location: ['All', 'Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven'],
  status: ['All', 'New', 'Saved', 'Applied', 'Not Interested']
};

const sortOptions = [
  { label: 'Newest First', value: 'date-desc' },
  { label: 'Oldest First', value: 'date-asc' },
  { label: 'Salary High to Low', value: 'salary-desc' },
  { label: 'Salary Low to High', value: 'salary-asc' }
];

function Jobs() {
  const [jobs, setJobs] = useState([...fakeJobs]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
    status: 'All'
  });
  const [sortBy, setSortBy] = useState('date-desc');

  // Stats
  const savedJobs = jobs.filter(job => job.status === 'saved').length;
  const appliedJobs = jobs.filter(job => job.status === 'interested').length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuClick = (jobId) => {
    setActiveMenu(activeMenu === jobId ? null : jobId);
  };

  const handleJobAction = (jobId, action) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          // If trying to save an already saved job, unsave it
          if (action === 'saved' && job.status === 'saved') {
            return { ...job, status: 'new' };
          }
          // If trying to mark as interested an already interested job, remove it
          if (action === 'interested' && job.status === 'interested') {
            return { ...job, status: 'new' };
          }
          // Otherwise apply the new status
          return { ...job, status: action };
        }
        return job;
      })
    );
    setActiveMenu(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setShowFilterDropdown(false);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = React.useMemo(() => {
    let result = [...jobs];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (filters.type !== 'All') {
      result = result.filter(job => job.type === filters.type);
    }

    // Apply location filter
    if (filters.location !== 'All') {
      result = result.filter(job => job.location.includes(filters.location));
    }

    // Apply status filter
    if (filters.status !== 'All') {
      const statusMap = {
        'New': 'new',
        'Saved': 'saved',
        'Applied': 'interested',
        'Not Interested': 'not-interested'
      };
      result = result.filter(job => job.status === statusMap[filters.status]);
    }

    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
        break;
      case 'salary-desc':
        result.sort((a, b) => {
          const aSalary = parseInt(a.salary.match(/\d+/)[0]);
          const bSalary = parseInt(b.salary.match(/\d+/)[0]);
          return bSalary - aSalary;
        });
        break;
      case 'salary-asc':
        result.sort((a, b) => {
          const aSalary = parseInt(a.salary.match(/\d+/)[0]);
          const bSalary = parseInt(b.salary.match(/\d+/)[0]);
          return aSalary - bSalary;
        });
        break;
      default:
        break;
    }

    return result;
  }, [jobs, searchTerm, filters, sortBy]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest('.job-menu')) {
        setActiveMenu(null);
      }
      if (showFilterDropdown && !event.target.closest('.filter-container')) {
        setShowFilterDropdown(false);
      }
      if (showSortDropdown && !event.target.closest('.sort-container')) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu, showFilterDropdown, showSortDropdown]);

  const handleShowMore = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleApply = (jobId) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status: 'interested' } : job
      )
    );
    setSelectedJob(null);
  };

  return (
    <div className="jobs-page">
      <div className="search-section">
        <div className="search-controls-card">
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{ paddingLeft: '3rem' }}
            />
            <img
              src={searchIcon}
              alt="Search"
              className="search-icon"
            />
          </div>

          <div className="controls-bar">
            <div className="controls-left">
              <div className="filter-container">
                <button 
                  className="filter-btn"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  aria-label="Filter"
                >
                  <img src={filterIcon} alt="Filter" style={{ width: '1.3rem', height: '1.3rem' }} />
                </button>
                {showFilterDropdown && (
                  <div className="dropdown-menu">
                    <div className="filter-section">
                      <h4>Job Type</h4>
                      {filterOptions.type.map(type => (
                        <div
                          key={type}
                          className={`filter-option ${filters.type === type ? 'selected' : ''}`}
                          onClick={() => handleFilterChange('type', type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                    <div className="filter-section">
                      <h4>Location</h4>
                      {filterOptions.location.map(location => (
                        <div
                          key={location}
                          className={`filter-option ${filters.location === location ? 'selected' : ''}`}
                          onClick={() => handleFilterChange('location', location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                    <div className="filter-section">
                      <h4>Status</h4>
                      {filterOptions.status.map(status => (
                        <div
                          key={status}
                          className={`filter-option ${filters.status === status ? 'selected' : ''}`}
                          onClick={() => handleFilterChange('status', status)}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sort-container">
                <button 
                  className="sort-btn"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  aria-label="Sort"
                >
                  <img src={sortIcon} alt="Sort" style={{ width: '1.3rem', height: '1.3rem' }} />
                </button>
                {showSortDropdown && (
                  <div className="dropdown-menu">
                    {sortOptions.map(option => (
                      <div
                        key={option.value}
                        className={`sort-option ${sortBy === option.value ? 'selected' : ''}`}
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">{savedJobs}</span>
                  <span>Saved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{appliedJobs}</span>
                  <span>Applied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {filteredAndSortedJobs.map((job, index) => (
          <div 
            key={job.id} 
            className="job-card"
            style={index === filteredAndSortedJobs.length - 1 ? { marginBottom: '100px' } : {}}
          >
            <div className="job-header">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-menu">
                <button 
                  className="menu-button"
                  onClick={() => handleMenuClick(job.id)}
                >
                  ⋮
                </button>
                <div className={activeMenu === job.id ? "menu-dropdown show" : "menu-dropdown"}>
                  <div className="menu-item" onClick={() => handleJobAction(job.id, 'saved')}>
                    {job.status === 'saved' ? 'Unsave' : 'Save'}
                  </div>
                  <div className="menu-item" onClick={() => handleJobAction(job.id, 'interested')}>
                    {job.status === 'interested' ? 'Remove Application' : 'Mark as Interested'}
                  </div>
                  <div className="menu-item" onClick={() => handleJobAction(job.id, 'not-interested')}>
                    Not Interested
                  </div>
                </div>
              </div>
            </div>
            <div className="job-details">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span className="job-type">{job.type}</span>
              <span>•</span>
              <span>{job.salary}</span>
            </div>
            <ul className="selling-points">
              {job.sellingPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button className="more-btn" onClick={() => handleShowMore(job)}>
              Show more
              <span>▼</span>
            </button>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="job-details-overlay">
          <div className="job-details-content">
            <button className="close-btn" onClick={handleCloseJobDetails}>×</button>
            
            <div className="job-details-header">
              <h1>{selectedJob.title}</h1>
              <div className="job-details-meta">
                <span>{selectedJob.company}</span>
                <span>•</span>
                <span>{selectedJob.location}</span>
                <span>•</span>
                <span className="job-type">{selectedJob.type}</span>
                <span>•</span>
                <span>{selectedJob.salary}</span>
              </div>
            </div>

            <div className="job-details-body">
              <section className="job-description-section">
                <h2>Job Description</h2>
                <p>{selectedJob.description}</p>
              </section>

              <section className="job-requirements-section">
                <h2>Requirements</h2>
                <ul>
                  <li>No previous experience required</li>
                  <li>Basic English language skills</li>
                  <li>Willingness to learn</li>
                  <li>Reliable and punctual</li>
                </ul>
              </section>

              <section className="job-benefits-section">
                <h2>Benefits</h2>
                <ul>
                  {selectedJob.sellingPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </section>

              <section className="job-application-section">
                <h2>How to Apply</h2>
                <p>To apply for this position, click the button below. We'll guide you through the application process.</p>
                <button 
                  className="apply-btn"
                  onClick={() => handleApply(selectedJob.id)}
                >
                  Apply Now
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
