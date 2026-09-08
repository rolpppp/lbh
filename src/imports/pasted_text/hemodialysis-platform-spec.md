Leyte Baptist Hospital

Hemodialysis Patient Scheduling, Slot Booking & Administrative Platform

Design and build a modern, professional, healthcare-focused website and digital appointment platform for Leyte Baptist Hospital’s Hemodialysis Unit.

This is a single-center system specifically tailored for Leyte Baptist Hospital. Do not design it as a multi-clinic marketplace or generic healthcare booking platform.

The system should combine:

1. Hemodialysis Patient Scheduling & Slot Booking
2. Custom Website & Patient Portal
3. Internal Workflow & Administrative Dashboards

The primary objective is to make dialysis scheduling fast, clear, reliable, and easy for patients and staff, while giving the Hemodialysis Unit a centralized system for managing appointments, schedules, patients, and daily operations.

⸻

1. Overall Product Structure

Create three connected experiences:

A. Public Website

For patients, caregivers, and visitors who need information about the Hemodialysis Unit.

B. Patient Portal

For existing dialysis patients to:

* Book appointments
* View upcoming sessions
* Review appointment history
* Reschedule appointments
* Cancel appointments
* View relevant instructions
* Manage their profile

C. Internal Administrative Dashboard

For hospital staff and authorized personnel to:

* Manage dialysis schedules
* Manage appointment slots
* View daily schedules
* Manage patients
* Confirm/check-in patients
* Handle cancellations and rescheduling
* Monitor unit capacity
* Manage dialysis session availability
* Review operational information

These three experiences should share the same visual identity and underlying design system while having different information densities appropriate to their users.

⸻

2. Core Design Philosophy

The system should prioritize:

Clarity → Speed → Safety → Accessibility → Operational efficiency → Brand identity

Do not prioritize visual decoration over usability.

The system should feel like a modern healthcare product, not an outdated hospital information portal.

Patients should immediately understand:

“Where do I book my dialysis session?”

Staff should immediately understand:

“Who is scheduled today, which slots are occupied, and what needs attention?”

⸻

3. Public Website

The homepage should introduce the Leyte Baptist Hospital Hemodialysis Unit and make appointment access immediately visible.

Hero

Use a concise headline such as:

Hemodialysis Care at Leyte Baptist Hospital

Supporting text:

Manage your dialysis appointments, view available schedules, and stay informed about your care.

Primary CTA:

Book a Dialysis Session

Secondary CTA:

Patient Portal

Do not make users navigate through multiple pages before finding the booking option.

⸻

4. Public Website Sections

Include:

Hemodialysis Unit

Briefly explain:

* Hemodialysis services
* Unit information
* Operating schedule
* General patient information

How It Works

Simple 3–4 step explanation:

1. Choose a schedule
2. Select an available slot
3. Confirm your appointment
4. Arrive for your session

Patient Information

Include important information such as:

* What to bring
* When to arrive
* Preparation instructions
* General dialysis information
* Contact information

Hospital / Unit Information

Display:

* Leyte Baptist Hospital
* Hemodialysis Unit
* Address
* Contact number
* Operating hours
* Emergency/contact guidance where appropriate

FAQ

Examples:

* How do I book a dialysis session?
* How early should I arrive?
* Can I reschedule my appointment?
* What should I bring?
* How do I contact the Hemodialysis Unit?

⸻

5. Hemodialysis Patient Scheduling & Slot Booking

This is the primary feature of the platform.

The booking process should be significantly simpler than a conventional hospital appointment form.

Booking Flow

Use:

1. Date → 2. Available Slot → 3. Patient → 4. Review → 5. Confirmation

Avoid unnecessary steps.

⸻

6. Step 1 — Choose Date

Display a simple calendar.

Clearly indicate:

* Available dates
* Dates with limited availability
* Fully booked dates
* Past dates

Avoid forcing users to manually enter dates.

Use familiar calendar interactions.

⸻

7. Step 2 — Available Dialysis Slots

Once the patient chooses a date, immediately display the available dialysis slots.

Example:

September 12, 2026

Morning

9:00 AM – 1:00 PM
4-hour dialysis session
Available

[ Select ]

⸻

Afternoon

1:00 PM – 5:00 PM
4-hour dialysis session
2 slots remaining

[ Select ]

⸻

Evening

5:00 PM – 9:00 PM
4-hour dialysis session
Fully booked

[ Unavailable ]

Availability must be immediately understandable.

Use clear states:

* Available
* Limited availability
* Fully booked
* Selected
* Temporarily unavailable

Do not rely solely on colors.

⸻

8. Slot Information

Each dialysis slot should be capable of displaying:

* Date
* Start time
* End time
* Session duration
* Available capacity
* Current booking status
* Relevant session information

If the hospital has a fixed recurring schedule, represent it clearly rather than making patients navigate a complex calendar.

⸻

9. Slot Protection

The interface should account for the possibility that multiple users attempt to book the same slot.

When a patient selects a slot:

Slot temporarily reserved

Show a short reservation timer if appropriate.

Example:

This slot is being held for you for 05:00

If the user does not complete the booking, the slot becomes available again.

This prevents double-booking.

⸻

10. Patient Information

Do not ask for information that the hospital already has.

For logged-in patients, automatically populate known information.

Example:

Patient

Rolf Garces

Date of Birth
Contact Number

Allow the patient to verify the information rather than re-entering it.

For first-time patients, collect only the information necessary to create the appointment/request.

⸻

11. Booking Review

Before confirmation, display a concise summary.

Your Dialysis Appointment

Date
September 12, 2026

Time
9:00 AM – 1:00 PM

Service
Hemodialysis

Location
Leyte Baptist Hospital
Hemodialysis Unit

Patient
Patient Name

Primary CTA:

Confirm Appointment

Secondary:

Change Schedule

⸻

12. Confirmation

After successful booking:

Appointment Confirmed

Your hemodialysis session has been scheduled.

September 12, 2026
9:00 AM – 1:00 PM

Leyte Baptist Hospital
Hemodialysis Unit

Appointment ID
LBH-HD-XXXXXX

Actions:

Add to Calendar

View Appointment

Return to Patient Portal

Include preparation instructions and arrival guidance.

⸻

13. Patient Portal

Create a dedicated patient portal.

The dashboard should immediately show the patient’s next appointment.

Example

Good morning, [Patient Name]

Next Dialysis Session

September 12, 2026
9:00 AM – 1:00 PM

Leyte Baptist Hospital
Hemodialysis Unit

Confirmed

[ View Appointment ]

[ Reschedule ]

⸻

14. Patient Portal Features

Include:

Dashboard

* Next appointment
* Appointment status
* Important reminders
* Unit announcements
* Quick booking action

My Appointments

Display:

Upcoming

* Date
* Time
* Status
* Appointment details

Past

* Previous dialysis appointments
* Date
* Time
* Status

Book Appointment

Allow patients to quickly schedule another session.

Reschedule

Patients can select another available slot according to hospital scheduling rules.

Cancel

Provide a clear cancellation flow with confirmation.

Profile

Allow patients to view/manage permitted:

* Contact information
* Basic account information
* Notification preferences

Do not expose sensitive medical information unless explicitly required and properly authorized.

⸻

15. Appointment Statuses

Use clear statuses throughout the system:

* Pending
* Confirmed
* Checked In
* Completed
* Cancelled
* No Show
* Rescheduled

Statuses should be understandable to both patients and staff.

⸻

16. Internal Workflow & Administrative Dashboard

Create a separate staff-facing dashboard.

This interface can be more information-dense than the patient experience.

The primary goal is:

Give staff a real-time operational view of the Hemodialysis Unit.

⸻

17. Staff Dashboard

The dashboard should immediately show:

Today’s Overview

Today’s Date

Total Sessions
24

Confirmed
21

Pending
2

Available Slots
3

Cancelled
1

No Shows
0

Use cards for high-level operational metrics.

⸻

18. Daily Dialysis Schedule

Create the central scheduling interface.

Example:

September 12, 2026

Time	Patient	Slot	Status	Action
7:00 AM	Patient A	HD-01	Confirmed	View
7:00 AM	Patient B	HD-02	Confirmed	View
9:00 AM	Patient C	HD-03	Checked In	View
11:00 AM	—	HD-04	Available	Book

The interface should make occupied and available slots immediately obvious.

Provide:

Day / Week views

where useful.

⸻

19. Schedule Management

Authorized staff should be able to:

* Create dialysis slots
* Edit slot times
* Set slot capacity
* Close slots
* Reopen slots
* Mark slots unavailable
* Adjust schedules
* View booking occupancy

Example:

9:00 AM Session

Capacity: 5
Booked: 4
Available: 1

[ Manage Slot ]

⸻

20. Patient Management

Create a patient directory.

Search patients by:

* Name
* Patient ID
* Contact number

Patient profile should provide authorized staff with relevant operational information such as:

* Patient name
* Patient ID
* Contact information
* Upcoming appointments
* Appointment history
* Scheduling status

Avoid exposing unnecessary medical information to staff who do not need it.

⸻

21. Appointment Management

Staff should be able to:

* View appointments
* Confirm appointments
* Reschedule appointments
* Cancel appointments
* Check in patients
* Mark sessions completed
* Mark no-shows
* Manually create appointments when authorized
* Correct scheduling errors

Every action should have clear confirmation.

⸻

22. Check-In Workflow

Provide a fast check-in interface.

Example:

Today’s Patient

Juan Dela Cruz

9:00 AM
Hemodialysis

Status:

Confirmed

[ Check In ]

After check-in:

Checked In — 8:42 AM

Staff should be able to process check-ins with minimal interaction.

⸻

23. Operational Alerts

The dashboard should highlight issues requiring attention.

Examples:

Attention Required

2 appointments awaiting confirmation

1 patient cancellation

1 slot approaching capacity

1 scheduling conflict

Use priority levels without creating excessive notification noise.

⸻

24. Staff Search

Provide a global search or highly accessible patient/appointment search.

Staff should be able to quickly find:

* Patient
* Appointment
* Date
* Appointment ID

Search should not require navigating through multiple administrative pages.

⸻

25. Administrative Navigation

Use a clear sidebar:

Dashboard

Schedule

Appointments

Patients

Slots

Reports

Settings

Keep the active section obvious.

⸻

26. Reports

Include an administrative reporting section.

Potential reports:

* Daily appointment count
* Weekly appointment count
* Monthly appointment count
* Slot utilization
* Cancellation rate
* No-show rate
* Completed sessions
* Booking trends

Use simple charts and tables.

Do not overload the dashboard with analytics that staff do not need during daily operations.

⸻

27. Notifications

Design the system so it can support appointment notifications.

Potential notifications:

Patient

* Booking confirmation
* Appointment reminder
* Rescheduling notification
* Cancellation notification
* Schedule changes

Staff

* New booking
* Cancellation
* Reschedule request
* Capacity warning
* Scheduling conflict

The UI should clearly communicate notification status without becoming distracting.

⸻

28. Responsive Design

Patient interface

Prioritize mobile.

Most patient interactions should work exceptionally well on smartphones.

Staff interface

Prioritize desktop/tablet.

Staff dashboards can use wider layouts, tables, calendars, and sidebars.

However, administrative screens should remain responsive for tablets and smaller displays.

⸻

29. Brand Identity

The entire platform should feel unmistakably connected to:

Leyte Baptist Hospital

However, branding must never interfere with booking.

Use the hospital identity through:

* Logo
* Color system
* Typography
* Buttons
* Cards
* Icons
* Spacing
* Visual motifs

Do not use oversized branding throughout the booking flow.

The interface should communicate:

Professional healthcare institution

rather than:

Marketing website.

⸻

30. Company/Product Signature

The platform is being designed and developed by [OUR COMPANY NAME].

Leave a subtle, professional signature within the platform.

For example:

Powered by [OUR COMPANY NAME]

Place this primarily in:

* Footer
* Login page
* Administrative system footer
* Appropriate system/about locations

Do not place promotional material inside the patient booking process.

The design itself should also have subtle characteristics unique to our company so that the product feels like our platform, even while being customized for Leyte Baptist Hospital.

⸻

31. Design Language

The visual direction should be:

Clean + Professional + Calm + Modern + Trustworthy

Use:

* Generous whitespace
* Strong typography hierarchy
* Soft surfaces
* Subtle borders
* Restrained shadows
* Consistent corner radius
* Clear cards
* Simple iconography
* Accessible contrast

Avoid:

* Excessive gradients
* Excessive glassmorphism
* Huge decorative graphics
* Unnecessary animations
* Stock-photo-heavy layouts
* Dense hospital-portal aesthetics
* Excessive blue medical clichés
* Overly complicated dashboards

⸻

32. Accessibility

Build with accessibility in mind.

Ensure:

* WCAG-conscious contrast
* Keyboard navigation
* Visible focus states
* Semantic HTML
* Clear form labels
* Large touch targets
* Screen-reader compatibility
* Color-independent status indicators
* Clear error messages

Healthcare users may include elderly patients or caregivers, so readability is especially important.

⸻

33. Error Handling

Never expose technical system errors.

Instead of:

API Error 500

Show:

We couldn’t complete your booking.

Your information has been saved. Please try again.

[ Try Again ]

For unavailable slots:

This slot is no longer available.

Another patient may have booked this session.

[ Choose Another Slot ]

⸻

34. Loading States

Use lightweight loading states.

Examples:

Finding available sessions…

Loading your appointments…

Updating schedule…

Use skeleton loaders where appropriate.

Avoid unnecessary full-screen loading experiences.

⸻

35. Security & Privacy UX

Because this is a healthcare-related platform, design the interface with privacy and access control in mind.

Include:

* Secure login
* Session timeout
* Clear logout
* Role-based access concepts
* Patient/staff separation
* Confirmation for sensitive actions
* Minimal display of sensitive information
* Privacy-conscious notifications

Do not expose patient information on public pages.

⸻

36. Important Screens

Build the following:

Public

1. Homepage
2. Hemodialysis Unit
3. Services / Information
4. Patient Information
5. FAQ
6. Contact
7. Login
8. Registration / Patient Access

Patient

9. Patient Dashboard
10. Book Dialysis
11. Date Selection
12. Slot Availability
13. Patient Details
14. Booking Review
15. Booking Confirmation
16. My Appointments
17. Appointment Details
18. Reschedule
19. Cancellation
20. Profile
21. Notifications

Staff

22. Staff Login
23. Administrative Dashboard
24. Daily Schedule
25. Weekly Schedule
26. Appointment Management
27. Patient Directory
28. Patient Details
29. Slot Management
30. Check-In
31. Reports
32. Notifications
33. Settings

Also create:

34. Loading states
35. Empty states
36. Error states
37. 404 page
38. Unauthorized / access denied state

⸻

37. Role-Based Administrative Experience

Design the system so different staff roles can eventually have different permissions.

Potential roles:

Administrator

Full system access.

Scheduling Staff

Appointments, schedules, slots, patients.

Reception / Front Desk

Appointments, check-in, patient lookup.

Clinical Staff

Relevant appointment and patient operational information.

Do not assume every staff member should have access to every piece of information.

⸻

38. Booking Rules

The architecture should support configurable hospital rules such as:

* Maximum appointments per day
* Booking cutoff time
* Cancellation cutoff
* Rescheduling rules
* Slot capacity
* Session duration
* Operating days
* Blocked dates
* Holiday schedules

These rules should be configurable by authorized administrators rather than hard-coded into the UI.

⸻

39. Overall User Experience

Patient experience

The patient should feel:

“I know exactly when my dialysis session is, I can see available slots immediately, and I can manage my appointment without calling the hospital for every small change.”

Staff experience

Staff should feel:

“I can see today’s entire dialysis schedule at a glance and resolve scheduling issues quickly.”

Hospital experience

The hospital should gain:

* Better appointment organization
* Reduced manual scheduling
* Better slot utilization
* Fewer scheduling conflicts
* Easier patient communication
* Centralized appointment information
* Better operational visibility

⸻

40. Final UX Principle

The system should always favor:

One clear action over multiple confusing choices.

Patients should never have to understand the hospital’s internal scheduling system.

Staff should never have to fight through the patient-facing interface to perform operational tasks.

Keep the two experiences optimized for their respective users.

The final product should feel like:

A premium digital healthcare service built specifically for Leyte Baptist Hospital — not a generic hospital template.

The booking experience must remain the centerpiece:

Find a date → See available dialysis slots → Select a slot → Confirm → Done.