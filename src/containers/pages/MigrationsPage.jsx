import React, { useState, useEffect } from 'react';

function MigrationsPage() {
  const [missingTables, setMissingTables] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [migrationError, setMigrationError] = useState(null);
  const [migrationSuccess, setMigrationSuccess] = useState(false);

  useEffect(() => {
    async function fetchMigrationsStatus() {
      try {
        const response = await fetch('/api/mysql/check-tables');
        if (response.ok) {
          const missing = await response.json();
          setMissingTables(missing);
        } else {
          setMissingTables([]);
        }
      } catch (error) {
        console.error('Error fetching migrations status:', error);
        setMissingTables([]);
      }
    }
    fetchMigrationsStatus();
  }, []);

  const handleRunMigrations = async () => {
    setMigrating(true);
    setMigrationError(null);
    setMigrationSuccess(false);
    try {
      const response = await fetch('/api/mysql/migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Migration failed');
      setMigrationSuccess(true);
      // Re-check tables after migration
      const checkResponse = await fetch('/api/mysql/check-tables');
      if (checkResponse.ok) {
        const missing = await checkResponse.json();
        setMissingTables(missing);
      }
    } catch (error) {
      setMigrationError(error.message);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className='center-page flex-row p-4 justify-content-center'>
      <div className="scrollable p-4 justify-content-center">
        <h2>Database Migration Status</h2>
        {missingTables === null ? (
          <div>Checking database status...</div>
        ) : missingTables.length === 0 ? (
          <div className="text-success">Database migrations in place.</div>
        ) : (
          <>
            <div className="text-warning mb-2">
              The following tables are missing and migrations are required:
              <ul>
                {missingTables.map(table => (
                  <li key={table}>{table}</li>
                ))}
              </ul>
            </div>
            <button
              className="btn-primary mt-3"
              onClick={handleRunMigrations}
              disabled={migrating}
            >
              {migrating ? 'Running Migrations...' : 'Run Migrations'}
            </button>
            {migrationError && (
              <div className="text-danger mt-2">Error: {migrationError}</div>
            )}
            {migrationSuccess && (
              <div className="text-success mt-2">Migrations completed successfully!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MigrationsPage;