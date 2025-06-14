import Event from '../models/event.model.js';

// Publish an event
export const publishEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.published = true;
    await event.save();
    res.status(200).json({ message: 'Event published successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit event
export const editEvent = async (req, res) => {
  const { eventId } = req.params;
  const updateData = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    Object.assign(event, updateData);
    await event.save();
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
