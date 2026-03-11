// src/hooks/useApi.js
import { useState, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

async function apiFetch(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
  return response.json()
}

export function useApi(endpoint) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    setLoading(true)
    apiFetch(`${BASE}${endpoint}`)
      .then(res  => { setData(res);         setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [endpoint])

  return { data, loading, error }
}

export async function postContact(formData) {
  const response = await fetch(`${BASE}/contact/`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(formData),
  })
  return response.json()
}