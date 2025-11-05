import React, { useState, useEffect } from 'react';

function DatabaseURLForm() {
  const [databaseUrl, setDatabaseUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  async function testConnection() {
    try {
      const response = await fetch('/api/mysql/test');
      if (!response.ok) throw new Error('Connection test failed');
      setConnected(true);
    } catch (err) {
      setConnected(false);
    }
  }

  async function fetchCurrentDatabaseUrl() {
    try {
      const response = await fetch('/api/env/');
      const data = await response.json();
      setDatabaseUrl(data.DATABASE_URL || '');
    } catch (error) {
      console.error('Error fetching DATABASE_URL:', error);
    }
  }

  useEffect(() => {
    async function init() {
      await fetchCurrentDatabaseUrl();
      await testConnection();
      setLoading(false);
    }

    init();

  }, []);

  const handleChange = (e) => {
    setDatabaseUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          key: 'DATABASE_URL',
          value: databaseUrl
         }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      // test if connection works with the new DATABASE_URL using testConnection
      await testConnection();
      if (connected) {
        alert('Database connection successful!');
      } else {
        alert('Database connection failed: ' + error);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="database-url-form" className="scrollable p-4 justify-content-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {connected ? (
            <>
              <p>Successfully connected to your database! You can proceed to the next step.</p>
              <p>Otherwise, if you want to change your database URL, you can do that here.</p>
            </>
          ) : (
            <>
              <p>We couldn't find your database URL. If you're using MySQL, your connection string should look like:</p>
              <p><code>mysql://user:password@host:port/dbname</code></p>
            </>
          )}
          <form onSubmit={handleSubmit} className="flex-column gap-2">
            <div className="flex-column gap-1">
              <label className="fw-bold mb-1" htmlFor="database_url">Database URL</label>
              <input
                className="p-2"
                id="database_url"
                name="database_url"
                type="text"
                value={databaseUrl}
                onChange={handleChange}
                maxLength={255}
                required
                placeholder="mysql://user:password@host:port/dbname"
              />
            </div>
            <div className="sticky-submit">
              <button type="submit" className="btn-primary mt-3" disabled={loading}>
                {loading ? 'Submitting...' : 'Save Database URL'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default DatabaseURLForm;