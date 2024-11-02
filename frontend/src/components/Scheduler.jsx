import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';

// Set up moment.js as the date localizer
const localizer = momentLocalizer(moment);

// Function to generate a whole month schedule of recurring events with team names and descriptions
const generateMonthlySchedule = () => {
  const events = [];
  const today = moment();
  const endOfMonth = moment().endOf('month');

  // Stand-Ups: 15 mins, 2x a day on weekdays
  for (let day = today.clone(); day.isBefore(endOfMonth); day.add(1, 'days')) {
    if (day.isoWeekday() < 6) { // Only weekdays
      events.push({
        id: events.length,
        title: 'Morning Stand-Up',
        start: day.clone().hour(9).minute(0).toDate(),
        end: day.clone().hour(9).minute(15).toDate(),
        person: 'Development Team',
        description: 'Daily stand-up to discuss progress and blockers',
      });
      events.push({
        id: events.length,
        title: 'Afternoon Stand-Up',
        start: day.clone().hour(16).minute(0).toDate(),
        end: day.clone().hour(16).minute(15).toDate(),
        person: 'Development Team',
        description: 'Daily stand-up to discuss progress and blockers',
      });
    }
  }

  // Discipline Meeting: 15th or nearest weekday
  let disciplineMeetingDate = today.clone().startOf('month').add(14, 'days'); // 15th of the month
  if (disciplineMeetingDate.isoWeekday() > 5) {
    disciplineMeetingDate = disciplineMeetingDate.isoWeekday(5); // Move to Friday if it's on a weekend
  }
  events.push({
    id: events.length,
    title: 'Discipline Meeting',
    start: disciplineMeetingDate.clone().hour(10).minute(0).toDate(),
    end: disciplineMeetingDate.clone().hour(11).minute(0).toDate(),
    person: 'All Teams',
    description: 'Monthly meeting to discuss team discipline and processes',
  });

  // Reviews: Twice a week (Tuesdays and Thursdays)
  for (let day = today.clone(); day.isBefore(endOfMonth); day.add(1, 'days')) {
    if (day.isoWeekday() === 2 || day.isoWeekday() === 4) { // Tuesdays and Thursdays
      events.push({
        id: events.length,
        title: 'Project Review',
        start: day.clone().hour(14).minute(0).toDate(),
        end: day.clone().hour(15).minute(0).toDate(),
        person: 'Project Management Team',
        description: 'Review project status and next steps',
      });
    }
  }

  // Additional Meetings with specific details
  events.push(
    {
      id: events.length,
      title: 'Team Sync',
      start: today.clone().add(3, 'days').hour(11).minute(0).toDate(),
      end: today.clone().add(3, 'days').hour(12).minute(0).toDate(),
      person: 'Marketing Team',
      description: 'Weekly sync to discuss ongoing campaigns and upcoming launches',
    },
    {
      id: events.length,
      title: '1:1 Check-In',
      start: today.clone().add(10, 'days').hour(13).minute(0).toDate(),
      end: today.clone().add(10, 'days').hour(13).minute(30).toDate(),
      person: 'Team Lead - Development',
      description: 'One-on-one meeting to discuss individual progress and goals',
    },
    {
      id: events.length,
      title: 'Strategy Meeting',
      start: today.clone().add(20, 'days').hour(15).minute(0).toDate(),
      end: today.clone().add(20, 'days').hour(16).minute(30).toDate(),
      person: 'Executive Team',
      description: 'Discuss long-term company strategy and objectives',
    }
  );

  return events;
};

const Scheduler = () => {
  const [events, setEvents] = useState(generateMonthlySchedule());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), person: '', description: '' });

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({ title: '', start: slotInfo.start, end: slotInfo.end, person: '', description: '' });
    setDialogOpen(true);
  };

  const handleEventChange = (field) => (e) => {
    setNewEvent({ ...newEvent, [field]: e.target.value });
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }]);
    setDialogOpen(false);
  };

  // Custom event renderer to display person and description with the event title
  const eventRenderer = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <div>{event.person}</div>
      <div>{event.description}</div>
    </div>
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', margin: '2rem', borderRadius: '8px' }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => alert(event.description)}
        components={{
          event: eventRenderer,
        }}
        views={['month', 'week', 'day', 'agenda']} // Enable month, week, day, and agenda views
      />

      {/* Dialog for adding new events */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={handleEventChange('title')}
          />
          <TextField
            margin="dense"
            label="Person/Team"
            type="text"
            fullWidth
            value={newEvent.person}
            onChange={handleEventChange('person')}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={newEvent.description}
            onChange={handleEventChange('description')}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Scheduler;
