import React, { useState, useEffect } from 'react';

function BaseURLPage() {

  const [baseUrl, setBaseUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySet, setAlreadySet] = useState(false);

  useEffect(() => {
    async function fetchBaseUrl() {
      try {
        const response = await fetch('/api/env');
        if (response.ok) {
          const data = await response.json();
          if (data.BASE_URL) {
            setBaseUrl(data.BASE_URL);
            setAlreadySet(true);
          }
        }
      } catch (error) {
        // ignore error
      }
    }
    fetchBaseUrl();
  }, []);

  const handleChange = (e) => {
    setBaseUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    try {
      const response = await fetch('/api/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'BASE_URL',
          value: baseUrl
        }),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    }
  };

  return (
    <div className='center-page flex-row p-4 justify-content-center'>
      <div id="base-url-form" className="scrollable p-4 justify-content-center">
        {alreadySet && (
          <div className="text-info mb-2">Base URL is already set. You can update it below if needed.</div>
        )}
        <p>Enter your Base URL below.</p>
        <p>If you're running locally, you probably want to enter <code>http://127.0.0.1:8000/udoit3</code></p>
        <p>Otherwise, if you're deploying using Terraform on AWS, please check your console output to retrieve the Base URL.</p>
        <form onSubmit={handleSubmit} className="flex-column gap-2">
          <div className="flex-column gap-1">
            <label className="fw-bold mb-1" htmlFor="base_url">Base URL</label>
            <input
              className="p-2"
              id="base_url"
              name="base_url"
              type="text"
              value={baseUrl}
              onChange={handleChange}
              maxLength={255}
              required
              placeholder="https://canvas.institution.edu/"
            />
          </div>
          <div className="sticky-submit">
            <button type="submit" className="btn-primary mt-3">
              Save Base URL
            </button>
          </div>
        </form>
        {submitted && (
          <div className="text-success mt-2">Base URL saved successfully!</div>
        )}
      </div>
    </div>
  );
}

export default BaseURLPage;