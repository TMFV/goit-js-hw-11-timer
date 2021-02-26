//Timer


class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targerDate = targetDate;
        const targetDateForTimer = new Date(targetDate);
        let unixTargetTime = targetDateForTimer.getTime();
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
        
        this.root = document.querySelector(this.selector);
        this.root.insertAdjacentHTML('beforeend', this.template);
        this.refs = {
            days: this.root.querySelector("span[data-value='days']"),
            hours: this.root.querySelector("span[data-value='hours']"),
            minutes: this.root.querySelector("span[data-value='mins']"),
            seconds: this.root.querySelector("span[data-value='secs']")
        };
        
        function timeCalc(currentTime, refs) {
            refs.days.textContent = Math.floor(currentTime / (1000 * 60 * 60 * 24));
            refs.hours.textContent = Math.floor( currentTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            refs.minutes.textContent = Math.floor(currentTime % (1000 * 60 * 60) / (1000 * 60));
            refs.seconds.textContent = Math.floor(currentTime % (1000 * 60) / 1000);
        };
        function deltaTime(targetDate, nowTime) { 
            return targetDate - nowTime;
        };

        const startTimeRef = new Date();
        let difStartTime = deltaTime(targetDateForTimer, startTimeRef);

        timeCalc(difStartTime, this.refs);

        const timerRef = setInterval(() => {
            if (unixTargetTime > 0) {
                const date = new Date();
                let nowTimeRef = date.getTime()
                let difTimeNow = deltaTime(unixTargetTime, nowTimeRef);
                timeCalc(difTimeNow, this.refs);
            } else {
                console.log('Відлік завершено або дата задана в минулому!!!');
                clearInterval(timerRef);
            }
        }, 1000);
    }
};


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

