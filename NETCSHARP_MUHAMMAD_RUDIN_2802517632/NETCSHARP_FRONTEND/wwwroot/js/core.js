const core = {
     fetchAvailableCar: async function(start, end) {
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

    },
    fetchAvailableCarByYear: async function (start, end, year) {
        const res = await fetch('http://localhost:5189/api/v1/cars/available-year', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "startDate": start,
                "endDate": end,
                "year": year
            }),
        });

        if (!res.ok) {
            return false
        }
        else return res.json()

    },
      fetchCar: async function(id) {
        const res = await fetch('http://localhost:5189/api/v1/cars/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "carID": id,
            }),
        });

        if (!res.ok) {
            return false
        }
        else return res.json()

    },
    rentCar: async function (carid, token, start, end) {
        const res = await fetch('http://localhost:5189/api/v1/rent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "carID": carid,
                "token": token, 
                "rentalDate": start,
                "returnDate": end
            }),
        });

        if (!res.ok) {
            return false
        }
        else return res.json()
    }
}