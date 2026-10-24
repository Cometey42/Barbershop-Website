// =========================
// File: js/calendar.js
// Dynamic Booking Calendar
// =========================
// ----- DOM Elements -----
// Grab every HTML element the script needs once, up front, by its id.
// (calendar grid, month label, prev/next buttons, time slot area, booking form fields, message box)
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const selectedDateText = document.getElementById("selectedDateText");
const timeSlots = document.getElementById("timeSlots");
const bookingForm = document.getElementById("bookingForm");
const customerName = document.getElementById("customerName");
const customerService = document.getElementById("customerService");
const selectedTimeInput = document.getElementById("selectedTimeInput");
const bookingMessage = document.getElementById("bookingMessage");
// ----- Calendar State -----
// Variables that change as the user interacts:
// currentMonth/currentYear = month being displayed, selectedDate = clicked day (or null),
// selectedTime = clicked time slot ("" if none)
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;
let selectedTime = "";
// ----- Time Slot Data -----
// The shop's hours as lists of bookable times: one list for Mon-Fri, one for Saturday.
// Sunday has no list because the shop is closed.
const weekdaySlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
const saturdaySlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];
// ----- Booked Appointments (Sample Data) -----
// Example booked data for practice
// Format: { "YYYY-MM-DD": ["time", "time"] }. Lives in memory only, so it resets on page refresh.
const bookedAppointments = {
  "2026-03-28": ["10:00 AM", "2:00 PM"],
  "2026-03-29": [],
};
// ----- Helper Functions -----
// Small reusable functions for names, date formatting, and open/closed checks.
const getMonthName = (monthIndex) => {
  const monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
const formatDateKey = (year, month, day) => {
  const safeMonth = String(month + 1).padStart(2, "0");
  const safeDay = String(day).padStart(2, "0");
  return `${year}-${safeMonth}-${safeDay}`;
};
const formatReadableDate = (year, month, day) => {
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
const isPastDate = (year, month, day) => {
  const compareDate = new Date(year, month, day);
  compareDate.setHours(0, 0, 0, 0);
  const todayOnly = new Date();
  todayOnly.setHours(0, 0, 0, 0);
  return compareDate < todayOnly;
};
const isClosedDay = (year, month, day) => {
  const date = new Date(year, month, day);
  const weekday = date.getDay();
  // Sunday closed
  if (weekday === 0) {
    return true;
  }
  return false;
};
const getSlotsForDate = (year, month, day) => {
  const date = new Date(year, month, day);
  const weekday = date.getDay();
  if (weekday === 6) {
    return saturdaySlots;
  }
  if (weekday === 0) {
    return [];
  }
  return weekdaySlots;
};
// ----- Render Calendar (draws the month grid of day buttons) -----
const renderCalendar = () => {
  if (!calendarGrid || !calendarMonthLabel) return;
  // if the caldendar is not (!) available, don't run!
  // if the monthlabel is not (!) available, don't run!
  calendarMonthLabel.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
  calendarGrid.innerHTML = "";
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); //gets the current year/month and with that info finds the 1st
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //gets the next month and then goes to that month's zero day

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-empty";
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = day;
    dayButton.className = "calendar-day";

    const dateKey = formatDateKey(currentYear, currentMonth, day); // 2026-09-30 (September 30, 2026)

    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayButton.classList.add("today");
    }

    if (
      isPastDate(currentYear, currentMonth, day) ||
      isClosedDay(currentYear, currentMonth, day)
    ) {
      dayButton.classList.add("disabled");
    }
    
    if (
      selectedDate &&
      selectedDate.year === currentYear &&
      selectedDate.month === currentMonth &&
      selectedDate.day === day
    ) {
      dayButton.classList.add("selected");
    }

    dayButton.addEventListener("click", () => {
      if (isPastDate(currentYear, currentMonth, day)) return;
      if (isClosedDay(currentYear, currentMonth, day)) return;
      selectedDate = {
        year: currentYear,
        month: currentMonth,
        day: day,
        key: dateKey,
      };
      selectedTime = "";
      selectedTimeInput.value = "";
      selectedDateText.textContent = formatReadableDate(
        currentYear,
        currentMonth,
        day,
      );
      renderCalendar();
      renderTimeSlots();
      bookingMessage.textContent = "";
      bookingMessage.className = "booking-message";
    });
    calendarGrid.appendChild(dayButton);
  }
};
// ----- Render Time Slots (draws the time buttons for the selected date) -----
const renderTimeSlots = () => {
  if (!timeSlots) return;
  timeSlots.innerHTML = "";

  if (!selectedDate) {
    timeSlots.innerHTML = `<p class="selected-date-text">Choose a date first.</p>`;
    return;
  }

  const slots = getSlotsForDate(
    selectedDate.year,
    selectedDate.month,
    selectedDate.day,
  );

  const bookedForDay = bookedAppointments[selectedDate.key] || [];
  if (slots.length === 0) {
    timeSlots.innerHTML = `<p class="selected-date-text">No appointments available for 
this date.</p>`;
    return;
  }
  
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const slotBtn = document.createElement("button");
    slotBtn.type = "button";
    slotBtn.textContent = slot;
    slotBtn.className = "time-slot-btn";

    if (bookedForDay.includes(slot)) {
      slotBtn.classList.add("disabled");
      slotBtn.disabled = true;
      slotBtn.textContent = `${slot} - Booked`;
    }

    if (selectedTime === slot) {
      slotBtn.classList.add("selected");
    }

    slotBtn.addEventListener("click", () => {
      selectedTime = slot;
      selectedTimeInput.value = slot;
      renderTimeSlots();
    });
    timeSlots.appendChild(slotBtn);
  }
};
// ----- Month Navigation (previous / next month buttons) -----
if (prevMonthBtn) {
  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
}

if (nextMonthBtn) {
  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
}
// ----- Booking Submit (validates the form and records the appointment) -----
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameValue = customerName.value.trim();
    const serviceValue = customerService.value;
    const timeValue = selectedTimeInput.value;

    if (
      nameValue === "" ||
      serviceValue === "" ||
      !selectedDate ||
      timeValue === ""
    ) {
      bookingMessage.textContent =
        "Please choose a date, time, name, and service.";
      bookingMessage.className = "booking-message error";
      return;
    }

    if (!bookedAppointments[selectedDate.key]) {
      bookedAppointments[selectedDate.key] = [];
    }

    if (bookedAppointments[selectedDate.key].includes(timeValue)) {
      bookingMessage.textContent =
        "That time was just taken. Please choose another.";
      bookingMessage.className = "booking-message error";
      renderTimeSlots();
      return;
    }

    bookedAppointments[selectedDate.key].push(timeValue);
    bookingMessage.textContent = `${nameValue}, your ${serviceValue} appointment is 
booked for ${formatReadableDate(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
    )} at ${timeValue}.`;
    bookingMessage.className = "booking-message success";
    bookingForm.reset();
    selectedTime = "";
    selectedTimeInput.value = "";
    renderTimeSlots();
  });
}
// ----- App Start (first draw when the page loads) -----
renderCalendar();
renderTimeSlots();

/* =====================================================================
   FUNCTION REFERENCE: what each function does and how
   =====================================================================

   getMonthName(monthIndex)
   - Turns a month number (0 = January ... 11 = December) into its name.
   - How: keeps an array of the 12 names and returns the one at that index.

   formatDateKey(year, month, day)
   - Builds a string like "2026-03-28" used as the lookup key in bookedAppointments.
   - How: month + 1 (JS months start at 0), then padStart(2, "0") so single digits
     become "03" / "07", and joins the parts with a template literal.

   formatReadableDate(year, month, day)
   - Builds a friendly string like "Saturday, March 28, 2026" for display.
   - How: creates a Date and uses toLocaleDateString("en-US", {...}) with the
     weekday/month/day/year options.

   isPastDate(year, month, day)
   - True if the day is before today, so it can't be booked.
   - How: sets both the given date and today to midnight (setHours(0,0,0,0)) so
     the time of day doesn't interfere, then compares them with <.

   isClosedDay(year, month, day)
   - True if the shop is closed that day (currently Sundays only).
   - How: Date.getDay() returns 0-6 (0 = Sunday); returns true when it's 0.

   getSlotsForDate(year, month, day)
   - Returns the list of time slots available for that weekday.
   - How: getDay() === 6 gives saturdaySlots, 0 gives an empty array (closed),
     anything else gives weekdaySlots.

   renderCalendar()
   - Draws the current month as a grid of buttons.
   - How: exits early if the grid or label element is missing; sets the
     "Month Year" label and clears the grid; finds which weekday the 1st falls on
     (new Date(y, m, 1).getDay()) and adds that many empty <div> spacers; finds
     the number of days (new Date(y, m + 1, 0).getDate(), day 0 of next month =
     last day of this one); then loops 1..daysInMonth creating a button per day.
     Each button gets CSS classes: "today", "disabled" (past or closed), and
     "selected" (matches selectedDate). Clicking an enabled day stores
     selectedDate, clears the chosen time, updates the date text, and re-renders
     the calendar and time slots.

   renderTimeSlots()
   - Draws the time buttons for the selected date.
   - How: clears the container; shows "Choose a date first." if nothing is
     selected; gets that day's slots and the booked list for the date; shows
     "No appointments available" if there are no slots; otherwise loops through
     the slots creating buttons. Booked slots are disabled and labeled
     "- Booked", the chosen slot gets "selected", and clicking a slot saves it to
     selectedTime and the hidden input, then re-renders to show the highlight.

   Previous / Next month button handlers
   - Move the displayed month back or forward.
   - How: decrement/increment currentMonth; wrap at the year boundary
     (below 0 -> December of the previous year, above 11 -> January of the next
     year); then call renderCalendar(). The if-checks skip this if a button
     doesn't exist on the page.

   Booking form submit handler
   - Validates and saves a booking when the form is submitted.
   - How: event.preventDefault() stops the page reload; reads the trimmed name,
     service, and selected time; shows a red error message if any field or the
     date is missing; makes sure the date has an array in bookedAppointments;
     re-checks that the time wasn't taken and shows an error if it was;
     otherwise pushes the time into bookedAppointments, shows a green success
     message, resets the form and selected time, and re-renders the time slots
     so the new booking shows as "Booked".
   ===================================================================== */
