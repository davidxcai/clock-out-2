$(document).ready(function () {

    $('.collapsible').collapsible();

    const date = new Date();
    $('#footer').html(`© ${date.getFullYear()} David Cai`)

    const calculateBtn = $('#calculateBtn');

    calculateBtn.click(() => calculate())

    const calculate = () => {
        const goHome = clockOutTime();
        $('#clockOutDisplay').html(`${goHome.hour}:${goHome.minute < 10 ? '0' + goHome.minute : goHome.minute}`);
    }

    const clockOutTime = () => {
        const clockIn = {
            hour: Number($('#clockInHour').val()) || 0,
            minute: Number($('#clockInMinute').val()) || 0,
            type: 'clock in'
        };
        const tx = {
            hour: Number($('#txHour').val()) || 0,
            minute: Number($('#txMinute').val()) || 0,
            type: 'treatment'
        };
        const lunch = {
            hour: Number($('#lunchHour').val()) || 0,
            minute: Number($('#lunchMinute').val()) || 0,
        };
        const meeting = {
            hour: Number($('#meetingHour').val()) || 0,
            minute: Number($('#meetingMinute').val()) || 0
        };
        const productivity = Number($('#productivity').val()) || 0;
        const refusal = Number($('#refusal').val()) || 0;

        if (refusal > 0) {
            let refuse = {
                hour: Math.floor(refusal / 60),
                minute: Math.round(((refusal / 60) % 1) * 60)
            }
            tx.hour -= refuse.hour
            if (refuse.minute > tx.minute) {
                tx.minute += 60 - refuse.minute;
                tx.hour--;
            } else {
                tx.minute -= refuse.minute
            }
        }

        // hours and minutes converted to minutes
        const workMinutes = (tx.hour * 60 + tx.minute);

        // calculate facility time by calculating productivity rate of time
        let totalMinutes = Math.round((workMinutes * 100) / productivity);

        // check if lunch was taken and if it was, add the time to total minutes at facility
        totalMinutes += (lunch.hour * 60 + lunch.minute);

        totalMinutes += (meeting.hour * 60 + meeting.minute);

        const totalTime = {
            hour: Math.floor(totalMinutes / 60),
            minute: Math.round(((totalMinutes / 60) % 1) * 60)
        }
        const clockOut = {
            hour: clockIn.hour + totalTime.hour,
            minute: clockIn.minute + totalTime.minute
        }
        if (clockOut.minute > 60) {
            clockOut.minute -= 60;
            clockOut.hour += 1;
        }
        if (clockOut.hour > 12) {
            clockOut.hour -= 12;
        }
        return clockOut;
    }

})

