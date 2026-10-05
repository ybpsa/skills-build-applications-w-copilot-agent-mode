import DataTable from './DataTable.jsx'
import { apiUrl, parseList } from '../api.js'
import useList from '../useList.js'

const ENDPOINT = '/api/workouts/'

const load = (signal) =>
  fetch(apiUrl(ENDPOINT), { signal }).then(parseList)

const columns = [
  { label: 'Title', render: (w) => w.title },
  { label: 'Description', render: (w) => w.description },
  { label: 'Difficulty', render: (w) => w.difficulty },
  { label: 'Duration (min)', render: (w) => w.durationMinutes },
]

export default function Workouts() {
  const state = useList(load)
  return <DataTable title="Workouts" state={state} columns={columns} />
}
