// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map(employee => {
        return {
            firstName: employee[0],
            familyName: employee[1],
            title: employee[2],
            payPerHour: employee[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    })
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");

    const newEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    };

    employeeRecord.timeInEvents.push(newEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");

    const newEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    };

    employeeRecord.timeOutEvents.push(newEvent);
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, date) => {
    let inEvent = employeeRecord.timeInEvents.find(e => e.date === date)
    let outEvent = employeeRecord.timeOutEvents.find(e => e.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    let hoursworked = hoursWorkedOnDate(employeeRecord, date)
    return hoursworked * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
    let eligibleDates = employeeRecord.timeInEvents.map(e => e.date);
    let payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employeeRecord, d), 0);
    return payable;
}

const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
}
