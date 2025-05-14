describe('Story Viewer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  });

  it('renders story list avatars', () => {
    cy.get('.profile-image').should('have.length.at.least', 1);
  });

  it('loads stories on avatar click', () => {
    cy.get('.profile-image').first().click();

    cy.get('img[alt="story"]').should('be.visible');
    cy.get('img[alt="story"]').should('have.attr', 'src').and('include', 'http');
  });

  it('shows progress bar after image loads', () => {
    cy.get('.profile-image').first().click();

    cy.get('img[alt="story"]').should('be.visible');
    cy.get('.progress-bar')
      .should('exist')
      .should('be.visible');
  });

  it('auto-advances to next story', () => {
    // cy.get('.profile-image').first().click();

    cy.get('img[alt="story"]')
      .invoke('attr', 'src')
      .then((firstSrc) => {
        cy.wait(10000); // Wait for auto-advance
        cy.get('img[alt="story"]')
          .invoke('attr', 'src')
          .should((newSrc) => {
            expect(newSrc).not.to.eq(firstSrc);
          });
      });
  });

  // it('navigates back and forth on click', () => {
  //   cy.get('.profile-image').first().click();

  //   cy.get('img[alt="story"]').then(($img) => {
  //     const firstSrc = $img.attr('src');

  //     // Click right half to go forward
  //     cy.get('div').contains('img[alt="story"]') // or container wrapper
  //       .click('right');

  //     cy.wait(500);
  //     cy.get('img[alt="story"]').invoke('attr', 'src').should('not.eq', firstSrc);

  //     // Click left half to go back
  //     cy.get('div').contains('img[alt="story"]').click('left');

  //     cy.wait(500);
  //     cy.get('img[alt="story"]').invoke('attr', 'src').should('eq', firstSrc);
  //   });
  // });
});
