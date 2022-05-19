describe('API Testing', () => {

    it('API Tests', () => {

        //getting token
        cy.request({
            method: 'POST',
            url: '/auth',
            form: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "username": "admin",
                "password": "password123",
            }
        }).as('getToken').then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.body)
        }).its('body').then((body) => {

            const auth = body.token


            //createBooking
            cy.request({
                method: 'POST',
                url: '/booking',
                form: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    //its possible to use faker to randomize the data as well.
                    "firstname": "Vini",
                    "lastname": "Milani",
                    "totalprice": "100",
                    "depositpaid": "true",
                    "bookingdates": {
                        "checkin": "2020-05-01",
                        "checkout": "2020-05-02"
                    },
                    "additionalneeds": "Breakfast"
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(response.body)
            }).its('body').then((body) => {

                const bookID = body.bookingid
                //getBooking
                cy.request({
                    method: 'GET',
                    url: '/booking/' + bookID, //we could ramdomize this number using js
                    form: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token: ' + auth
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('bookingdates')
                    expect(response.body).to.have.property('depositpaid')
                    expect(response.body).to.have.property('firstname')
                    expect(response.body).to.have.property('lastname')
                    expect(response.body).to.have.property('totalprice')
                    cy.log(response.body)
                })

                //updateBooking
                cy.request({
                    method: 'PUT',
                    url: '/booking/' + bookID,
                    form: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        "firstname": "Vini",
                        "lastname": "Milani",
                        "totalprice": "100",
                        "depositpaid": "true",
                        "bookingdates": {
                            "checkin": "2020-05-01",
                            "checkout": "2020-05-02"
                        },
                        "additionalneeds": "Breakfast"
                    }
                })

            })
        })
    })
})
