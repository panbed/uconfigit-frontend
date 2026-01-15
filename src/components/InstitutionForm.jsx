import React, { useState } from 'react'

function InstitutionForm() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    lms_domain: '',
    lms_id: '',
    lms_account_id: '',
    status: 1,
    vanity_url: '',
    metadata: '',
    api_client_id: '',
    api_client_secret: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting:', form)

    try {
      const addInstitutionResponse = await fetch('/api/mysql/add-institution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!addInstitutionResponse.ok) {
        throw new Error('uh oh')
      }

      const completeSetupResponse = await fetch('/api/env', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'SETUP_COMPLETE',
          value: 'true'
        }),
      })

      const addInstitutionData = await addInstitutionResponse.json()
      console.log(addInstitutionData)

      const completeSetupData = await completeSetupResponse.json()
      console.log(completeSetupData)
      
    }
    catch (error) {
      console.error('err:', error)
    }
  }

  return (
    <div id='institution-form' className='scrollable'>
      <form onSubmit={handleSubmit} className="flex-column gap-2">
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="title">Title</label>
          <input
            className="p-2"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="lms_domain">LMS Domain</label>
          <input
            className="p-2"
            id="lms_domain"
            name="lms_domain"
            value={form.lms_domain}
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="lms_id">LMS ID</label>
          <input
            className="p-2"
            id="lms_id"
            name="lms_id"
            value={form.lms_id}
            onChange={handleChange}
            maxLength={64}
            required
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="lms_account_id">LMS Account ID</label>
          <input
            className="p-2"
            id="lms_account_id"
            name="lms_account_id"
            value={form.lms_account_id}
            onChange={handleChange}
            maxLength={255}
            required
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="vanity_url">Vanity URL</label>
          <input
            className="p-2"
            id="vanity_url"
            name="vanity_url"
            value={form.vanity_url}
            onChange={handleChange}
            maxLength={255}
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="metadata">Metadata</label>
          <textarea
            className="p-2"
            id="metadata"
            name="metadata"
            value={form.metadata}
            onChange={handleChange}
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="api_client_id">API Client ID</label>
          <input
            className="p-2"
            id="api_client_id"
            name="api_client_id"
            value={form.api_client_id}
            onChange={handleChange}
            maxLength={255}
          />
        </div>
        <div className="flex-column gap-1">
          <label className="fw-bold mb-1" htmlFor="api_client_secret">API Client Secret</label>
          <input
            className="p-2"
            id="api_client_secret"
            name="api_client_secret"
            value={form.api_client_secret}
            onChange={handleChange}
            maxLength={255}
          />
        </div>
        <div className='sticky-submit'>
          {loading ? <LoadingSpinner /> : <button type="submit" className="btn-primary mt-3">Create Institution</button>}
        </div>
      </form>
    </div>
  )
}

export default InstitutionForm