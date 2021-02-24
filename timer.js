//Timer


class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targerDate = targetDate;
        const targetDateForTimer = new Date(targetDate);
        //console.log(targetDateForTimer);
        let unixTargetTime = targetDateForTimer.getTime();
        //console.log(unixTargetTime);

        this.template = `<div class="field">
            <span class="value" data-value="days">11</span>
            <span class="label">Days</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="hours">11</span>
            <span class="label">Hours</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="mins">11</span>
            <span class="label">Minutes</span>
        </div>
    
        <div class="field">
            <span class="value" data-value="secs">11</span>
            <span class="label">Seconds</span>
        </div>`;
console.dir(targetDate);
        this.root = document.querySelector(this.selector);
        this.root.insertAdjacentHTML('beforeend', this.template);
        this.refs = {
            days: this.root.querySelector("span[data-value='days']"),
            hours: this.root.querySelector("span[data-value='hours']"),
            minutes: this.root.querySelector("span[data-value='mins']"),
            seconds: this.root.querySelector("span[data-value='secs']")
        };
        

        const startTimeRef = new Date();
        let difStartTime = targetDateForTimer - startTimeRef;
        console.log(difStartTime);
        this.refs.days.textContent = Math.floor(difStartTime / (1000 * 60 * 60 * 24));
        this.refs.hours.textContent = Math.floor( difStartTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        this.refs.minutes.textContent = Math.floor(difStartTime % (1000 * 60 * 60) / (1000 * 60));
        this.refs.seconds.textContent = Math.floor(difStartTime % (1000 * 60) / 1000);

        
        const timerRef = setInterval(() => {
            if (unixTargetTime > 0) {
                const date = new Date();
                let nowTimeRef = date.getTime()
                //console.log(nowTimeRef);
                
                let difTimeNow = unixTargetTime - nowTimeRef;
                const days = Math.floor(difTimeNow / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difTimeNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((difTimeNow % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((difTimeNow % (1000 * 60)) / 1000);

                this.refs.days.textContent = days;
                this.refs.hours.textContent = hours;
                this.refs.minutes.textContent = mins;
                this.refs.seconds.textContent = secs;
                //
            } else {
                console.log('Відлік завершено або дата задана в минулому!!!');
                clearInterval(timerRef);
            }
        }, 1000);
    }
}


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

