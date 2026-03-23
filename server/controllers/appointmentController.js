const Appointment = require('../models/Appointment');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAppointment = async (req, res) => {
  const { date, time, slots, isAvailable } = req.body;

  try {
    const appointment = new Appointment({
      date,
      time,
      slots,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid appointment data' });
  }
};

const updateAppointment = async (req, res) => {
  const { date, time, slots, isAvailable } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.date = date || appointment.date;
      appointment.time = time || appointment.time;
      appointment.slots = slots !== undefined ? slots : appointment.slots;
      appointment.isAvailable = isAvailable !== undefined ? isAvailable : appointment.isAvailable;

      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid appointment data' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.deleteOne();
      res.json({ message: 'Appointment removed' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
