# FixIt

Home-services app (React Native, Expo, TypeScript, NativeWind). Initial UI with fake data.

## Run
```
npm install
npx expo start
```
Press `w` for web, or scan the QR code with Expo Go. Log in with any email and a password of 6+ characters. Choose **Technician** on the login screen to see the technician side.

## Team and branches
`main` holds only the shared base (config, layouts, UI components, validators, theme). Each member's screens live on their own branch and are merged into `main` with a pull request. The app runs once all three are merged.

| Branch | Member | Screens | Requirements |
|---|---|---|---|
| `feature/member-a-discovery` | A | Home, Technician List, Technician Profile, Login, Sign up | FR-1, FR-2 |
| `feature/member-b-requests` | B | New Request, My Requests, Request Details | FR-3, FR-4, FR-8 |
| `feature/member-c-technician` | C | Technician Dashboard, Job Details, Rate & Review | FR-5, FR-6, FR-7 |

## Workflow
```
git checkout feature/member-b-requests      # your own branch
# work, then
git add .
git commit -m "requests: add photo picker"
git push
```
Open a pull request into `main` when your part is ready. The last person to merge pulls `main`, runs `npm install` and `npx expo start` to check the whole app.
To try your screens before the others are merged, merge their branches into yours locally and do not push that.

## Who owns what
- Member A: `src/features/auth`, `home`, `technicians`, `src/context/session.tsx`, `src/data/categories.ts`, `technicians.ts`, routes `login`, `signup`, `(customer)/home`, `technicians/`
- Member B: `src/features/requests`, `src/context/requests.tsx`, `src/data/requests.ts`, routes `request/new`, `requests/[id]`, `(customer)/requests`
- Member C: `src/features/jobs`, `src/features/reviews`, `src/context/reviews.tsx`, `src/data/reviews.ts`, routes `dashboard`, `tech/jobs/[id]`, `review/[id]`

Do not edit another member's files. Shared files (`package.json`, `app.json`, `src/components/ui`, `src/lib`, `src/theme`, layouts) change only through a pull request to `main` that everyone agrees on. Put unit tests in `__tests__/` with your own file names.

## Structure
```
src/app         routes (one-line files that re-export a screen)
src/features    screens, grouped by area
src/components  shared UI components
src/context     session, requests, reviews providers
src/data        types and starting data
src/lib         validators
src/theme       color tokens
```
See `SCREENS.md` for the screen list and requirements.
