import { useEffect, useState } from 'react'

// `load` receives an AbortSignal and resolves to an array of items.
export default function useList(load) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
      .then((items) => setState({ items, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], loading: false, error: error.message })
        }
      })
    return () => controller.abort()
  }, [load])

  return state
}
