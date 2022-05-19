Cypress.Commands.add('getToken', () => {
     cy.request({
        method: 'POST',
        url: '/auth',
        form : true,
        headers: {
            'Content-Type': 'application/json', 
        },
        body: {
            "username" : "admin",
            "password" : "password123",
        }
    }).as('getToken').then((response)=>{
        expect(response.status).to.eq(200)
        cy.log(response.body)
    }).its('body').then((body)=>{
    cy.intercept('@getToken')
    const auth = body.token
    cy.log(auth)
    cy.request({
        method: 'GET',
        url: '/booking/10',
        form : true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token: ' + auth
        },
      })
  })
})

