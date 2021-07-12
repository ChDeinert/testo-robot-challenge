/// <reference types="Cypress" />

describe('Index page e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Placing the robot', () => {
    it('places the robot', () => {
      cy.get('input[name="xCoordinate"]').type(0);
      cy.get('input[name="yCoordinate"]').type(1);
      cy.get('input[type="submit"]').click();
      cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
    });

    it('places the robot facing the correct direction', () => {
      cy.get('input[name="xCoordinate"]').type(0);
      cy.get('input[name="yCoordinate"]').type(1);
      cy.get('select[name="direction"]').select('NORTH')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--NORTH');
      cy.get('select[name="direction"]').select('EAST')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--EAST');
      cy.get('select[name="direction"]').select('SOUTH')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--SOUTH');
      cy.get('select[name="direction"]').select('WEST')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--WEST');
    });

    it('shows an error if xCoordinate is not filled', () => {
      cy.get('input[type="submit"]').click();
      cy.contains('X-Coordinate is required!');
    });

    it('shows an error if yCoordinate is not filled', () => {
      cy.get('input[type="submit"]').click();
      cy.contains('Y-Coordinate is required!');
    });
  });

  describe('placed', () => {
    it('it moves the robot', () => {
      cy.get('input[name="xCoordinate"]').type(0);
      cy.get('input[name="yCoordinate"]').type(1);
      cy.get('input[type="submit"]').click();
      cy.get('div[data-testid="boardTile01"]').children().should('have.length.gt', 0);
    });

    it('rotates the robot in left direction', () => {
      cy.get('input[name="xCoordinate"]').type(0);
      cy.get('input[name="yCoordinate"]').type(1);
      cy.get('select[name="direction"]').select('NORTH')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--NORTH');
      cy.get('button').contains('left').click();
      cy.get('.robot__direction-indicator--WEST');
    });

    it('rotates the robot in right direction', () => {
      cy.get('input[name="xCoordinate"]').type(0);
      cy.get('input[name="yCoordinate"]').type(1);
      cy.get('select[name="direction"]').select('NORTH')
      cy.get('input[type="submit"]').click();
      cy.get('.robot__direction-indicator--NORTH');
      cy.get('button').contains('right').click();
      cy.get('.robot__direction-indicator--EAST');
    });

    it('moves and rotates the robot after placement', () => {
      cy.get('input[name="xCoordinate"]').type(1);
      cy.get('input[name="yCoordinate"]').type(2);
      cy.get('select[name="direction"]').select('EAST');
      cy.get('input[type="submit"]').click();
      cy.get('div[data-testid="boardTile12"]').children().should('have.length.gt', 0);
      cy.get('button').contains('move').click().click();
      cy.get('button').contains('left').click();
      cy.get('button').contains('move').click();
      cy.get('div[data-testid="boardTile12"]').children().should('have.length', 0);
      cy.get('div[data-testid="boardTile33"]').children().should('have.length.gt', 0);
    });
  });

  describe('unplaced', () => {
    xit('shows an error if robot is not placed and rotated left', () => { });

    xit('shows an error if robot is not placed and rotated right', () => { });

    xit('Shows an error if robot is not placed and moved', () => {
      cy.get('button').contains('move').click();
      cy.get('.msg-error').contains(/not placed/);
    });
  });
});
