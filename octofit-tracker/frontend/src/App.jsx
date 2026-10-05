import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from './assets/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const links = [
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Octofit Tracker logo" height="32" className="me-2" />
          Octofit Tracker
        </NavLink>
        <ul className="navbar-nav">
          {links.map(([to, label]) => (
            <li className="nav-item" key={to}>
              <NavLink className="nav-link" to={to}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
