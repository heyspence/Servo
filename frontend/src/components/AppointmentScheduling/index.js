import './AppointmentScheduling.css'

const AppointmentScheduling = ({schedulingOpen}) => {
    return (
        <div className={`appointment-scheduling ${schedulingOpen ? '' : 'minimize' }`}>
            <h2>Hello from scheduling</h2>
        </div>
    )
}

export default AppointmentScheduling;