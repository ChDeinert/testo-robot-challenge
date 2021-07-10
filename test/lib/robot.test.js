import Robot, { defaultBoard, possibleDirections } from '../../src/lib/robot';

describe('Robot', () => {
  let testRobot;

  beforeEach(() => {
    testRobot = new Robot(defaultBoard, possibleDirections);
  });

  describe('place()', () => {
    it('Places the robot on the correct field', () => {
      testRobot.place(0, 0, 'NORTH');
      expect(testRobot.xPosition).toBe(0);
      expect(testRobot.yPosition).toBe(0);
      expect(testRobot.direction).toBe('NORTH');
    });

    it('Won\'t allow an xCoordinate out of bounds', () => {
      expect(() => testRobot.place(-1, 0, 'NORTH')).toThrow();
      expect(() => testRobot.place(5, 0, 'NORTH')).toThrow();
    });

    it('Won\'t allow an yCoordinate out of bounds', () => {
      expect(() => testRobot.place(0, -1, 'NORTH')).toThrow();
      expect(() => testRobot.place(0, 5, 'NORTH')).toThrow();
    });

    it('Won\'t allow an impossible facing direction', () => {
      expect(() => testRobot.place(0, 0, 'UP')).toThrow();
      expect(() => testRobot.place(0, 0, 'WEAST')).toThrow();
    });
  });

  describe('move()', () => {
    it('Raises y-coordinate if faced NORTH', () => {
      testRobot.place(2, 2, 'NORTH');
      testRobot.move();
      expect(testRobot.yPosition).toBe(3);
    });

    it('Raises x-coordinate if faced EAST', () => {
      testRobot.place(2, 2, 'EAST');
      testRobot.move();
      expect(testRobot.xPosition).toBe(3);
    });

    it('Lowers y-coordinate if faced SOUTH', () => {
      testRobot.place(2, 2, 'SOUTH');
      testRobot.move();
      expect(testRobot.yPosition).toBe(1);
    });

    it('Lowers x-coordinate if faced WEST', () => {
      testRobot.place(2, 2, 'WEST');
      testRobot.move();
      expect(testRobot.xPosition).toBe(1);
    });

    it('Won\'t allow to run if robot isn\'t placed on the board', () => {
      expect(() => testRobot.move()).toThrow();
    });

    it('Won\'t allow moving if robot goes out of bounds', () => {
      testRobot.place(4, 4, 'NORTH');
      expect(() => testRobot.move()).toThrow();
      expect(testRobot.yPosition).toBe(4);

      testRobot.place(4, 4, 'EAST');
      expect(() => testRobot.move()).toThrow();
      expect(testRobot.yPosition).toBe(4);

      testRobot.place(0, 0, 'SOUTH');
      expect(() => testRobot.move()).toThrow();
      expect(testRobot.yPosition).toBe(0);

      testRobot.place(0, 0, 'WEST');
      expect(() => testRobot.move()).toThrow();
      expect(testRobot.yPosition).toBe(0);
    });
  });

  describe('left()', () => {
    it('Changes direction 90 degrees to the left on a compass', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.left();
      expect(testRobot.direction).toBe('WEST');
    });

    it('4 changes of direction lead to the initial direction', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.left();
      expect(testRobot.direction).toBe('WEST');
      testRobot.left();
      expect(testRobot.direction).toBe('SOUTH');
      testRobot.left();
      expect(testRobot.direction).toBe('EAST');
      testRobot.left();
      expect(testRobot.direction).toBe('NORTH');
    });

    it('Won\'t allow to run if robot isn\'t placed on the board', () => {
      expect(() => testRobot.left()).toThrow();
    });
  });

  describe('right()', () => {
    it('Changes direction 90 degrees to the right on a compass', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.right();
      expect(testRobot.direction).toBe('EAST');
    });

    it('4 changes of direction lead to the initial direction', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.right();
      expect(testRobot.direction).toBe('EAST');
      testRobot.right();
      expect(testRobot.direction).toBe('SOUTH');
      testRobot.right();
      expect(testRobot.direction).toBe('WEST');
      testRobot.right();
      expect(testRobot.direction).toBe('NORTH');
    });

    it('Won\'t allow to run if robot isn\'t placed on the board', () => {
      expect(() => testRobot.right()).toThrow();
    });
  });

  describe('report()', () => {
    it('Reports it\'s correct position', () => {
      testRobot.place(0, 0, 'NORTH');

      const reportedPosition = testRobot.report();
      expect(reportedPosition).toMatchObject({
        xPosition: 0,
        yPosition: 0,
        direction: 'NORTH',
      });
      expect(reportedPosition.toString()).toBe('0, 0, NORTH');
    });

    it('Won\'t allow to run if robot isn\'t placed on the board', () => {
      expect(() => testRobot.report()).toThrow();
    });
  });

  describe('combined actions', () => {
    it('Placing it on 0,0,NORTH and moving reports correctly', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.move();
      
      const reportedPosition = testRobot.report();
      expect(reportedPosition).toMatchObject({
        xPosition: 0,
        yPosition: 1,
        direction: 'NORTH',
      });
      expect(reportedPosition.toString()).toBe('0, 1, NORTH');
    });

    it('Placing it on 0,0,NORTH and turning left reports correctly', () => {
      testRobot.place(0, 0, 'NORTH');
      testRobot.left();

      const reportedPosition = testRobot.report();
      expect(reportedPosition).toMatchObject({
        xPosition: 0,
        yPosition: 0,
        direction: 'WEST',
      });
      expect(reportedPosition.toString()).toBe('0, 0, WEST');
    });

    it('Placing it on 1,2,EAST; moving twice; turning left and moving again reports correctly', () => {
      testRobot.place(1, 2, 'EAST');
      testRobot.move();
      testRobot.move();
      testRobot.left();
      testRobot.move();

      const reportedPosition = testRobot.report();
      expect(reportedPosition).toMatchObject({
        xPosition: 3,
        yPosition: 3,
        direction: 'NORTH',
      });
      expect(reportedPosition.toString()).toBe('3, 3, NORTH');
    });
  });
});