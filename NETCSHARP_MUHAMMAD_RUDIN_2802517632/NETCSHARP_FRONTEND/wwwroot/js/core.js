const core = {
    async fetchAvailableCar(start, end) {
        const res = await fetch('http://localhost:5189/api/v1/cars/available', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "startDate": start,
                "endDate": end
            }),
        });

        if (!res.ok) {  
            return false
        }
        else return res.json()

    }
}