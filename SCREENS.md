# FixIt - Screens (9 counted + Login and Sign up)

Login and Sign up do not count toward the 9 screens or the 5 functional requirements (CW01 rules).

| # | Screen | Owner | Route | File | Use cases covered |
|---|--------|-------|-------|------|-------------------|
| 1 | Home & Categories | Member A | /home | src/features/*/screens/HomeScreen.tsx | UC-01 Browse categories, UC-02 Search (entry), UC-07 active request shortcut |
| 2 | Technician List (list + map) | Member A | /technicians | src/features/technicians/screens/TechnicianListScreen.tsx | UC-02 Search by service and area, filters, map view |
| 3 | Technician Profile | Member A | /technicians/[id] | TechnicianProfileScreen.tsx | UC-03 View profile, reviews, replies, verified badge |
| 4 | New Request | Member B | /request/new | NewRequestScreen.tsx | UC-04 Create request, UC-05 Attach photos, UC-06 Select location on map |
| 5 | My Requests | Member B | /requests (tab) | MyRequestsScreen.tsx | UC-07 Track status, UC-08 Job history |
| 6 | Request Details & Tracking | Member B | /requests/[id] | RequestDetailsScreen.tsx | UC-07 Track, estimate approve/decline, UC-10 Report disputed service |
| 7 | Technician Dashboard | Member C | /dashboard | DashboardScreen.tsx | UC-12 Availability, UC-13 Incoming requests, UC-17 Received reviews, UC-18 Reply to review |
| 8 | Job Details (technician) | Member C | /tech/jobs/[id] | JobDetailsScreen.tsx | UC-14 Respond, UC-15 Price and time estimate, UC-16 Update job status |
| 9 | Rate & Review | Member C | /review/[id] | ReviewScreen.tsx | UC-09 Rate and review technician |
| - | Login | not counted | /login | LoginScreen.tsx | Role choice: Customer or Technician |
| - | Sign up | not counted | /signup | SignupScreen.tsx | Create account with validation |

Not covered by a screen in this UI phase: UC-11 Manage technician profile (edit), UC-19 Resolve disputed service (Administrator).

## Functional requirements (for the report)
FR-1 Customers browse service categories and search or filter technicians by service, area, availability and rating.
FR-2 Customers view technician profiles with experience, price, verified status and reviews.
FR-3 Customers create a service request with description, photos, map location, date and time.
FR-4 Customers track a request through its statuses, approve or decline the technician's estimate, and view history.
FR-5 Technicians receive requests, accept with a price and time estimate or decline with a reason, and set availability.
FR-6 Technicians update the job status (on the way, in progress, completed).
FR-7 Customers rate and review a completed job, and technicians reply to reviews.
FR-8 Customers report a disputed service.

## Demo accounts
No real sign-in. Any valid email and a password of 6+ characters works. Choose Customer or Technician on the login screen.
