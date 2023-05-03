// Testing valid for E-invoice rendering
describe('E-invoice rendering page in HTML', () => {
  it('should render e-invoices as HTML', () => {
    cy.fixture('simple.xml', 'utf-8').as('xmlFixture');

    // Goes to the homepage
    cy.visit('http://localhost:3000/homepage');
    cy.contains('Empower your billing with Pikachu E-Invoicing - lightning-fast invoicing for all your business needs!');

    // HTML rendering

    // Clicks on the RENDER button on the top section of the website
    cy.get('button.MuiButton-containedPrimary').contains('RENDER').click();
    cy.intercept('POST', '/render/html').as('htmlRender');
    cy.contains('Welcome to our e-invoice rendering page!');

    // Clicks on the XML -> HTML button
    cy.get('button.MuiButton-containedPrimary').contains('XML HTML').click();


    // Selects and fills in the boxes.
    // Language
    cy.get('#render-html-lang').click();
    cy.contains('English').click(); 
    // Template
    cy.get('#render-html-template').click(); 
    cy.contains('Default').click(); 
    // XML Input
    cy.get('#render-html-input').click();
    cy.get('@xmlFixture').then((xmlFixture) => {
      cy.get('#render-html-input').type(xmlFixture);
    })

    // Clicks the Render HTML button, downloads the HTML
    cy.get('Button').contains('Render HTML').click();

  });
});

describe('E-invoice rendering page in JSON', () => {
   it('should render e-invoices as JSON', () => {
     cy.fixture('simple.xml', 'utf-8').as('xmlFixture');
 
     // Goes to the homepage
     cy.visit('http://localhost:3000/homepage');
     cy.contains('Empower your billing with Pikachu E-Invoicing - lightning-fast invoicing for all your business needs!');
 
     // JSON rendering
 
     // Clicks the RENDER E-INVOICE button near the bottom of the page
     cy.get('button.MuiButton-containedPrimary').contains('RENDER').click();
     cy.intercept('POST', '/render/json').as('jsonRender');
     cy.contains('Welcome to our e-invoice rendering page!');
 
     // Clicks the XML -> JSON button
     cy.get('button.MuiButton-containedPrimary').contains('XML JSON').click();
 
     // Selects and fills in the boxes.
     // Template
     cy.get('#render-JSON-template').click(); 
     cy.contains('Default').click(); 
     // XML Input
     cy.get('#render-JSON-input').click();
     cy.get('@xmlFixture').then((xmlFixture) => {
       cy.get('#render-JSON-input').type(xmlFixture);
     })
 
     // CLicks the Render JSON button, downloads the JSON
     cy.get('Button').contains('Render JSON').click();
 
   });
 });

 describe('E-invoice rendering page in PDF', () => {
   it('should render e-invoices as PDF', () => {
     cy.fixture('simple.xml', 'utf-8').as('xmlFixture');
 
     // Goes to the homepage
     cy.visit('http://localhost:3000/homepage');
     cy.contains('Empower your billing with Pikachu E-Invoicing - lightning-fast invoicing for all your business needs!');
 
     // PDF rendering
     
     // Clicks the RENDER E-INVOICE button near the bottom of the page
     cy.get('button.MuiButton-containedPrimary').contains('RENDER').click();
     cy.intercept('POST', '/render/pdf').as('pdfRender');
     cy.contains('Welcome to our e-invoice rendering page!');
 
     // Clicks the XML -> PDF button
     cy.get('button.MuiButton-containedPrimary').contains('XML PDF').click();
 
     // Selects and fills in the boxes.
     // Language
     cy.get('#render-PDF-lang').click(); 
     cy.contains('Dutch').click();
     // Template
     cy.get('#render-PDF-template').click(); 
     cy.contains('Default').click(); 
     // XML Input
     cy.get('#render-PDF-input').click();
     cy.get('@xmlFixture').then((xmlFixture) => {
       cy.get('#render-PDF-input').type(xmlFixture);
     })
     
     // CLicks the Render PDF button, downloads the PDF
     cy.get('Button').contains('Render PDF').click();
 
   });
});