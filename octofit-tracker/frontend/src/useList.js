import { useEffect, useState } from 'react'
import { fetchList } from './api.js'

export default function useList(resource) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    fetchList(resource, controller.signal)
      .then((items) => setState({ items, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], loading: false, error: error.message })
        }
      })
    return () => controller.abort()
  }, [resource])

  return state
}
