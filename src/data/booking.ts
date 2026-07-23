/**
 * Demo scheduling config. When the owner provides a self-scheduling link
 * (Calendly / Cal.com / Google Appointment Schedule), set scheduleUrl below —
 * the contact page's "Book a 15-min demo" button then links to it (opens the
 * booking page). While null, the button scrolls to the contact form, which
 * IS the demo-request form. No fabricated availability.
 */
export const BOOKING: { scheduleUrl: string | null; minutes: number } = {
  scheduleUrl: null, // e.g. 'https://cal.com/giovanna-weissmann/15min'
  minutes: 15,
};
