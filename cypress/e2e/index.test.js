/// <reference types="Cypress" />

describe('Index page e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using controls', () => {
    describe('placing the robot', () => {
      it('places the robot', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(1);
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
      });

      it('places the robot facing the correct direction', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(1);
        cy.get('[data-testid="robotplaceform-facing"]').select('NORTH');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--NORTH');
        cy.get('[data-testid="robotplaceform-facing"]').select('EAST');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--EAST');
        cy.get('[data-testid="robotplaceform-facing"]').select('SOUTH');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--SOUTH');
        cy.get('[data-testid="robotplaceform-facing"]').select('WEST');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--WEST');
      });

      it('shows an error if xCoordinate is not filled', () => {
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.contains('X-Coordinate is required!');
      });

      it('shows an error if yCoordinate is not filled', () => {
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.contains('Y-Coordinate is required!');
      });
    });

    describe('placed', () => {
      it('it moves the robot', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(1);
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('[data-testid="robotcontrol-button-move"]').click();
        cy.get('div[data-testid="boardTile02"]').children().should('have.length.gt', 0);
      });

      it('rotates the robot in left direction', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(1);
        cy.get('[data-testid="robotplaceform-facing"]').select('NORTH');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--NORTH');
        cy.get('[data-testid="robotcontrol-button-turnleft"]').click();
        cy.get('.robot__direction-indicator--WEST');
      });

      it('rotates the robot in right direction', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(1);
        cy.get('[data-testid="robotplaceform-facing"]').select('NORTH');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('.robot__direction-indicator--NORTH');
        cy.get('[data-testid="robotcontrol-button-turnright"').click();
        cy.get('.robot__direction-indicator--EAST');
      });

      it('moves and rotates the robot after placement', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(1);
        cy.get('[data-testid="robotplaceform-y"]').type(2);
        cy.get('[data-testid="robotplaceform-facing"]').select('EAST');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('div[data-testid="boardTile12"]').children().should('have.length.gt', 0);
        cy.get('[data-testid="robotcontrol-button-move"]').click().click();
        cy.get('[data-testid="robotcontrol-button-turnleft"]').click();
        cy.get('[data-testid="robotcontrol-button-move"]').click();
        cy.get('div[data-testid="boardTile12"]').children().should('have.length', 0);
        cy.get('div[data-testid="boardTile33"]').children().should('have.length.gt', 0);
      });

      it('Shows an error if robot is about to go out of bounds', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(0);
        cy.get('[data-testid="robotplaceform-y"]').type(0);
        cy.get('[data-testid="robotplaceform-facing"]').select('WEST');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.get('[data-testid="robotcontrol-button-move"]').click();
        cy.get('.error').contains(/The robot can't move in that direction, or it falls down/);
      });

      it('Shows an alert containing the robots current position', () => {
        cy.get('[data-testid="robotplaceform-x"]').type(2);
        cy.get('[data-testid="robotplaceform-y"]').type(2);
        cy.get('[data-testid="robotplaceform-facing"]').select('SOUTH');
        cy.get('[data-testid="robotplaceform-submit"]').click();
        cy.on('window:alert', (alertContent) => {
          console.log(alertContent);
          expect(alertContent).to.equal('The Robot\'s current position: 2, 2, SOUTH');
        });
        cy.get('[data-testid="robotcontrol-button-report"]').click();
      });
    });

    describe('unplaced', () => {
      it('shows an error if robot is not placed and rotated left', () => {
        cy.get('[data-testid="robotcontrol-button-turnleft"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('shows an error if robot is not placed and rotated right', () => {
        cy.get('[data-testid="robotcontrol-button-turnright"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('Shows an error if robot is not placed and moved', () => {
        cy.get('[data-testid="robotcontrol-button-move"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('Shows an error if robot is not placed and position reported', () => {
        cy.get('[data-testid="robotcontrol-button-report"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });
    });
  });

  describe('using written commands', () => {
    describe('placing the robot', () => {
      it('places the robot', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('[data-testid="robotplaceform-facing"]').select('NORTH');
      });
    })

    describe('placed', () => {
      it('move() moves the robot', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('[data-testid="robotcommand-input"]').clear().type('move()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile02"]').children().should('have.length.gt', 0);
      });

      it('left() rotates the robot in left direction', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('.robot__direction-indicator--NORTH');
        cy.get('[data-testid="robotcommand-input"]').clear().type('left()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.robot__direction-indicator--WEST');
      });


      it('right() rotoates the robot in right direction', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('.robot__direction-indicator--NORTH');
        cy.get('[data-testid="robotcommand-input"]').clear().type('right()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.robot__direction-indicator--EAST');
      });

      it('report() shows an alert containing the robots current position', () => {
        cy.on('window:alert', (alertContent) => {
          console.log(alertContent);
          expect(alertContent).to.equal('The Robot\'s current position: 0, 1, NORTH');
        });
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
        cy.get('[data-testid="robotcommand-input"]').clear().type('report()');
        cy.get('[data-testid="robotcommand-submit"]').click();
      });
    });

    describe('unplaced', () => {
      it('move() shows an error if robot is not placed', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('move()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('left() shows an error if robot is not placed', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('left()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('right() shows an error if robot is not placed', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('right()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });

      it('report() shows an error if robot is not placed', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('report()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/The robot is not placed yet/);
      });
    });

    describe('using wrong commands', () => {
      it('shows an error if an unsupported command is submitted', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('unsupported()');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.textcontrol__message > span').contains('The command "unsupported()" is invalid!');
      });

      it('place() shows an error if x-Coordinate out of bounds', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(10,1,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/X Coordinate is invalid/);
      });

      it('place() shows an error if y-Coordinate out of bounds', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,10,NORTH)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.error').contains(/Y Coordinate is invalid/);
      });

      it('place() shows an error with invalid facing direction', () => {
        cy.get('details').click();
        cy.get('[data-testid="robotcommand-input"]').type('place(0,1,UP)');
        cy.get('[data-testid="robotcommand-submit"]').click();
        cy.get('.textcontrol__message > span').contains('The command "place(0,1,UP)" is invalid!');
      });
    });
  });
});
