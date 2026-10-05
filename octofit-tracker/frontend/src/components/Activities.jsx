import DataTable from './DataTable.jsx'
import useList from '../useList.js'

const columns = [
  { label: 'User', render: (a) => a.user?.displayName ?? a.user?.username ?? a.user },
  { label: 'Activity', render: (a) => a.activityType },
  { label: 'Duration (min)', render: (a) => a.durationMinutes },
  { label: 'Calories', render: (a) => a.calories },
  { label: 'Completed', render: (a) => (a.completedAt ? new Date(a.completedAt).toLocaleString() : null) },
]

export default function Activities() {
  const state = useList('activities')
  return <DataTable title="Activities" state={state} columns={columns} />
}
