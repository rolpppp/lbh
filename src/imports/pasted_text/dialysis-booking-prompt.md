Website Creation Prompt — Dialysis Appointment & Booking System

Design and build a modern, professional, mobile-first dialysis appointment and booking website template for healthcare providers and dialysis centers.

The website should feel trustworthy, calm, fast, accessible, and premium, while making the actual booking process extremely simple. The primary goal is to help a patient or caregiver go from “I need dialysis” → “I have a confirmed appointment” with as little friction as possible.

This is a company-specific template, so the design must establish a recognizable visual identity for our company without allowing branding or decorative elements to interfere with the booking experience.

⸻

1. Core Design Philosophy

Prioritize these principles above everything else:

Minimize friction

Users should immediately understand:

* What service they can book
* Where they can book it
* When appointments are available
* How much it costs, when pricing is applicable
* What they need to prepare
* How to proceed

Do not force users through multiple unnecessary search screens just to discover basic information.

The first booking screen should provide the most important information needed to make a decision.

Avoid:

* Long forms before showing availability
* Hidden pricing
* Requiring account creation before browsing available slots
* Repeatedly entering the same information
* Unnecessary confirmation screens
* Excessive popups
* Ambiguous buttons
* Technical healthcare/system terminology

⸻

2. Progressive Disclosure

Do not show every possible dialysis-related option at once.

Start with the minimum information required to find an appointment.

Example flow:

Step 1 — Choose location

* Select dialysis center
* Use current location if permitted
* Search by city/location

↓

Step 2 — Choose date

* Show calendar
* Highlight available dates
* Clearly indicate fully booked dates

↓

Step 3 — Show availability
Display available appointment/session times immediately.

Each availability card should clearly communicate:

* Date
* Time
* Session duration
* Availability
* Price or estimated cost, if applicable
* Center/location
* Relevant session information

↓

Step 4 — Patient information

Only after the user chooses an appointment should additional information be requested.

Collect only information necessary for the booking.

↓

Step 5 — Review

Show a simple summary:

Dialysis Appointment

* Center
* Date
* Time
* Session type
* Duration
* Price / estimated cost

Patient:

* Name
* Contact information

↓

Step 6 — Confirm

Use a strong, unambiguous CTA:

Confirm Appointment

After booking, show a clear success state containing:

* Confirmation number
* Appointment date
* Appointment time
* Center address
* Contact information
* Preparation instructions
* Add to calendar
* Reschedule
* Cancel

⸻

3. Homepage

The homepage should NOT behave like a conventional corporate healthcare website.

The primary purpose is appointment booking.

Use a strong hero section with a concise headline such as:

Book Your Dialysis Session

Supporting text:

Find an available dialysis session at a center near you.

Immediately below, place the booking interface.

Primary booking card

The first screen should prominently contain:

Where?
[ Select a dialysis center ]

When?
[ Select date ]

Session
[ Select session type ]

[ Find Available Sessions ]

Keep this card visually dominant.

Do not bury booking behind a navigation menu.

⸻

4. Availability-First Experience

Availability is one of the most important pieces of information.

Once a location and date are selected, show availability without requiring the user to navigate through several additional pages.

Example:

Available Sessions

Today — September 8

9:00 AM
Available
4 seats remaining
4-hour session

[ Select ]

⸻

11:00 AM
Available
2 seats remaining
4-hour session

[ Select ]

⸻

1:00 PM
Limited availability
1 seat remaining
4-hour session

[ Select ]

⸻

4:00 PM
Fully booked

[ Unavailable ]

Use clear visual states for:

* Available
* Limited availability
* Fully booked
* Selected

Do not rely solely on color to communicate these states.

⸻

5. Booking Interface

The booking interface should feel closer to a premium reservation system than a traditional hospital form.

Use a clear step indicator:

1 Location → 2 Session → 3 Patient → 4 Review

Keep users aware of where they are in the process.

Allow users to go back without losing information.

Do not reset the entire form when going backward.

⸻

6. Patient Information

Keep the form short.

Group information logically.

Patient

Full Name
Date of Birth
Contact Number
Email Address

Booking Information

Reason for visit / booking type, if required
Relevant dialysis/session information, if required

Emergency Contact

Only request this when actually necessary.

Avoid displaying large collections of optional medical fields.

If additional information is required by a specific dialysis center, reveal those fields progressively after the user reaches the appropriate step.

Clearly distinguish:

Required

from

Optional

⸻

7. Guest Booking

Do not require account creation before booking unless absolutely necessary.

Prefer:

Continue as Guest

Then optionally offer:

Create an account to manage future appointments

Account creation should be positioned as a convenience, not a barrier.

⸻

8. Pricing

If pricing is available, show it early.

Do not hide pricing until the final checkout step.

For example:

Dialysis Session

₱2,500

4-hour session

or:

Estimated cost

₱2,500–₱3,000

Final amount may vary depending on coverage and services.

If insurance, PhilHealth, or other coverage is supported, make this information easy to understand without overwhelming the booking interface.

Example:

Estimated patient cost

₱500

Insurance/coverage applied

₱2,000

Avoid displaying complicated billing terminology unless necessary.

⸻

9. Mobile-First Design

Design the entire experience starting from a mobile viewport.

The website must work exceptionally well on:

* Mobile phones
* Tablets
* Laptops
* Desktop screens

On mobile:

* Use large touch targets
* Keep buttons within comfortable thumb reach
* Avoid dense tables
* Avoid tiny text
* Use stacked appointment cards
* Use bottom-fixed primary CTAs where appropriate
* Keep navigation compact
* Minimize scrolling
* Avoid horizontal scrolling

The booking process should feel natural on a phone.

⸻

10. Navigation

Keep navigation minimal.

Suggested navigation:

Home
Book Appointment
My Appointments
Centers
Help

Primary navigation CTA:

Book Appointment

Do not overload the header with:

* Services
* About
* Blog
* Careers
* News
* Resources
* Multiple dropdown menus

These can exist elsewhere but should not compete with booking.

⸻

11. Healthcare UX

The design should communicate:

Trust + Safety + Calm + Competence

Avoid overly clinical or intimidating visual design.

Do not make the website look like an outdated hospital portal.

Avoid excessive:

* Medical icons
* Blue gradients
* Stock photos of doctors
* Dense medical terminology
* Decorative animations
* Flashy marketing sections

Instead, use:

* Generous whitespace
* Clear typography
* Subtle borders
* Soft surfaces
* Calm visual hierarchy
* Familiar interface patterns
* Strong accessibility

⸻

12. Visual Identity

Although this is a booking system, it must clearly feel like a product created by [OUR COMPANY NAME].

The branding should be recognizable without interfering with usability.

Create a subtle but consistent company design language.

Brand signature

Use:

* A distinctive primary color
* A recognizable typography system
* Custom button styling
* Consistent corner radius
* A subtle graphic motif
* Custom iconography where appropriate
* Consistent spacing
* A recognizable logo treatment

The company identity should be visible primarily through the design system, rather than through excessive logos.

For example:

Instead of placing a large company logo throughout the booking flow, use the company’s visual language in:

* Header
* Buttons
* Progress indicators
* Appointment cards
* Empty states
* Confirmation screens
* Small footer signature

The branding should feel like:

“This is clearly our product.”

not:

“The user is being advertised to while trying to book healthcare.”

⸻

13. Company Signature

Include a subtle company signature in the interface.

For example, in the footer:

Powered by [OUR COMPANY NAME]

or:

A [OUR COMPANY NAME] healthcare platform

The signature should be understated.

Do not place large promotional banners inside the booking flow.

The user should never feel that branding is slowing them down.

⸻

14. Design System

Create a reusable design system so the template can be customized for different dialysis centers.

Define:

Colors

* Brand Primary
* Brand Secondary
* Background
* Surface
* Text Primary
* Text Secondary
* Border
* Success
* Warning
* Error
* Information

The system should support easy white-label customization.

Changing the center/company brand should require changing a small number of design tokens rather than redesigning the entire website.

⸻

Typography

Use a modern highly readable sans-serif typeface.

Prioritize:

* Excellent readability
* Clear hierarchy
* Large headings
* Comfortable body text
* Strong button labels

Avoid overly stylized fonts.

⸻

Components

Create reusable components for:

* Header
* Navigation
* Booking card
* Location selector
* Date picker
* Session card
* Availability badge
* Step indicator
* Form fields
* Select fields
* Calendar
* Confirmation card
* Appointment card
* Empty state
* Error state
* Loading state
* Modal
* Toast notification
* Footer

⸻

15. Accessibility

Follow strong accessibility practices.

Ensure:

* WCAG-conscious contrast
* Keyboard navigation
* Visible focus states
* Semantic HTML
* Proper form labels
* Large touch targets
* Screen-reader-friendly controls
* Errors explained in plain language
* Status changes communicated clearly
* Color is never the only indicator

Example:

Instead of:

🔴 Fully booked

Use:

Fully booked

with supporting visual styling.

⸻

16. Error Handling

Errors should be helpful rather than technical.

Never display:

Error 500: POST /api/appointments failed

Instead:

We couldn’t complete your booking

Your appointment wasn’t confirmed. Please try again.

[ Try Again ]

If a selected slot becomes unavailable:

This session is no longer available

Someone else booked this session while you were completing your booking.

[ Choose Another Session ]

Preserve the user’s information whenever possible.

⸻

17. Loading States

The experience should feel fast even when data is loading.

Use skeleton loaders for:

* Session availability
* Center information
* Appointment history

Avoid unnecessary full-page loading screens.

For example:

Finding available sessions…

with lightweight skeleton cards.

⸻

18. Confirmation Page

The confirmation page should provide immediate reassurance.

Use:

✓ Appointment Confirmed

September 12, 2026
9:00 AM – 1:00 PM

[Dialysis Center Name]
123 Example Street
Tacloban City

Confirmation number:

DX-20260912-4821

Primary actions:

[ Add to Calendar ]

[ View Appointment ]

Secondary actions:

[ Get Directions ]

[ Contact Center ]

Include preparation instructions below.

⸻

19. My Appointments

Create a simple appointment management page.

Show:

Upcoming

September 12

9:00 AM

Dialysis Session
[Center Name]

[ View Details ]

[ Reschedule ]

[ Cancel ]

Past

Display previous appointments in a simplified list.

Avoid unnecessary medical history or complex dashboard elements unless required.

⸻

20. Empty States

Make empty states useful.

Example:

No upcoming appointments

You don’t have any upcoming dialysis sessions.

[ Book an Appointment ]

Avoid empty screens that simply say:

“No data found.”

⸻

21. Responsive Desktop Experience

On desktop, use a centered content area with generous whitespace.

The booking interface can use a two-column layout:

Left

Booking controls / session selection

Right

Booking summary

For example:

┌──────────────────────────────┬───────────────────────┐
│                              │                       │
│   Find a Session             │   Booking Summary     │
│                              │                       │
│   Location                   │   Center              │
│   [Tacloban Center]          │   Date                │
│                              │   Time                │
│   Date                       │   Session             │
│   [September 12]             │   Price               │
│                              │                       │
│   Available Sessions         │                       │
│                              │                       │
│   9:00 AM    [Select]        │   [Continue]          │
│   11:00 AM   [Select]        │                       │
│                              │                       │
└──────────────────────────────┴───────────────────────┘

On mobile, stack these sections vertically.

⸻

22. Microinteractions

Use subtle animations only when they improve understanding.

Examples:

* Smooth transition between booking steps
* Appointment card selection animation
* Button loading state
* Calendar transitions
* Confirmation animation
* Toast notifications

Do NOT use:

* Excessive parallax
* Large entrance animations
* Distracting moving backgrounds
* Long transition durations
* Animations that delay the user’s task

The interface should feel fast, not flashy.

⸻

23. Performance

Treat performance as a core UX requirement.

Prioritize:

* Lightweight assets
* Optimized images
* Minimal JavaScript
* Lazy loading
* Fast initial render
* Responsive interactions
* Efficient API requests
* Caching where appropriate

The booking interface should remain usable even on slower mobile connections.

Do not sacrifice booking speed for decorative visual effects.

⸻

24. Content Tone

Use language that is:

* Human
* Clear
* Reassuring
* Professional
* Direct

Prefer:

Book an Appointment

over:

Initiate Appointment Scheduling Process

Prefer:

Choose a Session

over:

Select Preferred Dialysis Treatment Schedule

Prefer:

No sessions available

over:

No appointment inventory detected

Avoid internal system terminology entirely.

⸻

25. Important Screens to Build

Create the following screens:

1. Homepage
2. Book Appointment
3. Location Selection
4. Date Selection
5. Session Availability
6. Patient Information
7. Booking Review
8. Booking Confirmation
9. My Appointments
10. Appointment Details
11. Reschedule Appointment
12. Cancel Appointment
13. Dialysis Centers
14. Center Details
15. Help / FAQ
16. 404 / Error
17. Loading States
18. Empty States

⸻

26. Template Architecture

The website must be designed as a reusable product template, not a one-off website.

Separate:

Brand configuration

* Logo
* Colors
* Typography
* Company name
* Company tagline
* Contact information
* Footer signature

Healthcare configuration

* Dialysis centers
* Session types
* Session durations
* Pricing
* Availability
* Booking rules
* Preparation instructions

User interface

The interface should remain consistent regardless of the configured healthcare provider.

This allows the same system to be deployed for different dialysis providers with minimal redesign.

⸻

27. Overall Visual Direction

The final design should feel like a combination of:

Modern healthcare platform + premium booking application + trustworthy medical service

Think:

* Apple-level simplicity
* Modern fintech-level information hierarchy
* Premium hotel/reservation-level booking flow
* Healthcare-level trust and accessibility

But do not directly copy another company’s visual identity.

The result should have its own recognizable visual language.

⸻

28. Most Important UX Rule

When making design decisions, prioritize them in this order:

1. Patient safety and clarity
2. Booking speed
3. Accessibility
4. Information hierarchy
5. Mobile usability
6. Trust
7. Brand identity
8. Decorative aesthetics

If a branding element makes the booking process slower or harder to understand, remove or simplify it.

If a decorative element competes with the Book Appointment action, remove it.

The website should ultimately feel like:

“I immediately understand what to do, I can see what’s available, and I can book it quickly.”

rather than:

“This is a beautiful healthcare website, but I have to figure out how to make an appointment.”