## Relationship between DatePicker, CalendarStateful, CalendarStateless

DatePicker is a stateful component that uses CalendarStateful to display the calendar. It rendered as a button displaying title, selected date, and week number. When the button is clicked, 'open' state set to true, and CalendarStateful is rendered.
We use Devic.isTouchOnlyDevice method to determine if the device is a touch device. If it is, we render CalendarStateful in a Modal, otherwise we render CalendarStateful normally.

CalendarStateful is also a stateful component that uses CalendarStateless to display a calendar. This component mainly maintains states for currentDate, selectedDate, and searchText, and passes them to CalendarStateless to render as Calendar.

CalendarStateless is a stateless component that creates Calendar using the data received from the CalendarStateful.