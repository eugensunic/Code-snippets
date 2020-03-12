fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed')
    .then(res => res.json())
    .then(({
        locations
    }) => {
        const UK = locations.find(({
            country
        }) => country === 'United Kingdom');
        const result = coronaConfirmedCases(UK.history);
        console.table(result);
    }).catch(err => console.log('Error: ', err));



function coronaConfirmedCases(history) {
    const sortedHistory = {};
    // sort dates first
    Object.keys(history).sort((a, b) => {
        const date1 = new Date(a);
        const date2 = new Date(b);
        if (date1 < date2) return -1
        if (date1 > date2) return 1
        return 0;
    }).forEach(key => {
        sortedHistory[key] = parseInt(history[key]);
    });

    // populate infected list
    const dailyInfectedList = [];
    const infected = Object.values(sortedHistory);
    const dates = Object.keys(sortedHistory);

    for (let i = 0; i < infected.length; i++) {
        const previous = infected[i - 1];
        const current = infected[i];
        const diff = current - previous;

        const dailyPercentage = !!parseInt(previous) && !!diff ?
            ((diff / previous) * 100).toFixed(2) + '%' :
            0;
        const newObj = {
            date: dates[i],
            dailyTotal: current,
            dailyRise: diff || 0,
            ['%rise']: dailyPercentage
        };

        dailyInfectedList.push(newObj);

    }
    return dailyInfectedList;
}
