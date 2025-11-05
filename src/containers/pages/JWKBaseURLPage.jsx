import React, { useState, useEffect } from 'react';

function JWKBaseURLPage() {

  const [jwkBaseUrl, setJwkBaseUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySet, setAlreadySet] = useState(false);

  useEffect(() => {
    async function fetchJwkBaseUrl() {
      try {
        const response = await fetch('/api/env');
        if (response.ok) {
          const data = await response.json();
          if (data.JWK_BASE_URL) {
            setJwkBaseUrl(data.JWK_BASE_URL);
            setAlreadySet(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchJwkBaseUrl();
  }, []);

  const handleChange = (e) => {
    setJwkBaseUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    try {
      const response = await fetch('/api/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'JWK_BASE_URL',
          value: jwkBaseUrl
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
      <div id="jwk-base-url-form" className="scrollable p-4 justify-content-center">
        {alreadySet && (
          <div className="text-info mb-2">JWK Base URL is already set. You can update it below if needed.</div>
        )}
        <p>Enter your JWK Base URL below. This will usually just be your Canvas domain.</p>
        <form onSubmit={handleSubmit} className="flex-column gap-2">
          <div className="flex-column gap-1">
            <label className="fw-bold mb-1" htmlFor="jwk_base_url">JWK Base URL</label>
            <input
              className="p-2"
              id="jwk_base_url"
              name="jwk_base_url"
              type="text"
              value={jwkBaseUrl}
              onChange={handleChange}
              maxLength={255}
              required
              placeholder="https://canvas.institution.edu/"
            />
          </div>
          <div className="sticky-submit">
            <button type="submit" className="btn-primary mt-3">
              Save JWK Base URL
            </button>
          </div>
        </form>
        {submitted && (
          <div className="text-success mt-2">JWK Base URL saved successfully!</div>
        )}
      </div>
    </div>
  );
}

export default JWKBaseURLPage;