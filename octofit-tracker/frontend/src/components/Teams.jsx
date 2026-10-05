import DataTable from './DataTable.jsx'
import { apiUrl, parseList } from '../api.js'
import useList from '../useList.js'

const ENDPOINT = '/api/teams/'

const load = (signal) =>
  fetch(apiUrl(ENDPOINT), { signal }).then(parseList)

const columns = [
  { label: 'Name', render: (t) => t.name },
  { label: 'Description', render: (t) => t.description },
  { label: 'Members', render: (t) => t.members?.length ?? 0 },
]

export default function Teams() {
  const state = useList(load)
  return <DataTable title="Teams" state={state} columns={columns} />
}
