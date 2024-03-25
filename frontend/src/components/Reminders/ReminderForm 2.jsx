import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReminder } from '../store/reminders'; 

const ReminderForm = ({ vendorId, userId }) => {
    const dispatch = useDispatch();
    const [reminderFrequency, setReminderFrequency] = useState('');
    // const vendorId = vendorId
    // const userId = userId

    const handleSubmit = (e) => {
    e.preventDefault();
    const frequencyInteger = parseInt(reminderFrequency, 10)
    let reminder = {userId, vendorId, frequency: frequencyInteger}
    debugger
    dispatch(createReminder(reminder));
    // Close the form
    // onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="vendorId" value={vendorId} />
            <select
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(e.target.value)}
            >
            <option value="">Select Frequency</option>
            <option value="1">Monthly</option>
            <option value="3">Quarterly</option>
            <option value="6">Biannually</option>
            <option value="12">Yearly</option>
            </select>
            <button type="submit">Confirm</button>
        </form>
    );
}

export default ReminderForm;