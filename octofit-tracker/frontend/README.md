# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Octofit Tracker configuration

The app calls the API at `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/<resource>/`
(`activities`, `leaderboard`, `teams`, `users`, `workouts`).

`VITE_CODESPACE_NAME` **must be defined** in a Codespace, e.g. in `octofit-tracker/frontend/.env.local`:

```
VITE_CODESPACE_NAME=your-codespace-name
```

If it is unset, the app falls back to `http://localhost:8000/api`. Restart `npm run dev` after changing it.
Both array and paginated (`{ "results": [...] }`) responses are supported.
