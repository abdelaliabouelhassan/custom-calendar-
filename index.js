
let nav = 0; // current navigation 
let clicked = null; // clicked element
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

new Vue({
    el: "#app",
    data() {
        return {
            weekdays: weekdays,
            paddingDays: 0,
            daysInMonth: 0,
            lastpadding: 0,
            displayMonth: '',
            month: 0,
            year: 0,
            lastPaddingDaysMonth: 0,
            nextPaddingDaysMonth: 0,
            days: [],
            today: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }),
            events: [{
                title: 'event 1 dgdg dfgdfg dfgdffg dfg gdfgfd',
                date: '1/3/2022'
            }, {
                title: 'event 2',
                date: '12/30/2021'
            },
            {
                title: 'event 3',
                date: '1/1/2022'
            },
            ]
        }
    },
    methods: {
        openModal(date) {
            alert(date)
        },
        next() {
            nav++;
            this.load();
        },
        back() {
            nav--;
            this.load();
        },
        load() {
            const dt = new Date();
            if (nav !== 0) {
                dt.setMonth(new Date().getMonth() + nav);
                //last padding month
                this.lastPaddingDaysMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();

            } else {
                this.lastPaddingDaysMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
            }


            const day = dt.getDay();
            this.month = dt.getMonth();
            this.year = dt.getFullYear();
            //  this.today = day + '/' + (this.month + 1)  + '/'+ this.year;
            const firstDayOfMonth = new Date(this.year, this.month, 1);
            this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

            const dateString = firstDayOfMonth.toLocaleDateString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' });
            const monthDayString = new Date(this.year, this.month + 1, 0).toLocaleDateString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric' });

            this.paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

            this.displayMonth = dt.toLocaleDateString('en-US', { month: 'long' }) + ' ' + this.year;
            this.lastpadding = weekdays.indexOf(monthDayString.split(', ')[0]);

            this.days = [];
            let dtlast = new Date();
            let dtnext = new Date();

            dtlast.setMonth(new Date().getMonth() + nav - 1);
            dtnext.setMonth(new Date().getMonth() + nav + 1);

            //last padding month
            for (var i = 0; i < this.paddingDays; i++) {
                var Paddingday = this.lastPaddingDaysMonth--;
                this.days.unshift({
                    day: Paddingday,
                    month: dtlast.getMonth() + 1,
                    year: dtlast.getFullYear(),
                    date: (dtlast.getMonth() + 1) + '/' + Paddingday + '/' + dtlast.getFullYear(),
                    padding: true
                });
            }
            //current month
            for (var i = 1; i <= this.daysInMonth; i++) {
                this.days.push({
                    day: i,
                    month: this.month + 1,
                    year: this.year,
                    date: (this.month + 1) + '/' + i + '/' + this.year,
                    padding: false
                });
            }
            //next padding month

            for (var i = 1; i < 7 - this.lastpadding; i++) {
                this.days.push({
                    day: i,
                    month: dtnext.getMonth() + 1,
                    year: dtnext.getFullYear(),
                    date: (dtnext.getMonth() + 1) + '/' + i + '/' + dtnext.getFullYear(),
                    padding: true
                });
            }

            console.log(this.days)
        }
    },
    created() {
        this.load();
    }

})



