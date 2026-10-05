import DataTable from './DataTable.jsx'
import useList from '../useList.js'

const columns = [
  { label: 'Title', render: (w) => w.title },
  { label: 'Description', render: (w) => w.description },
  { label: 'Difficulty', render: (w) => w.difficulty },
  { label: 'Duration (min)', render: (w) => w.durationMinutes },
]

export default function Workouts() {
  const state = useList('workouts')
  return <DataTable title="Workouts" state={state} columns={columns} />
}
