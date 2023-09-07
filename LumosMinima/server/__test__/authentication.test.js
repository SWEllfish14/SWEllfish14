const supertest = require('supertest')
const areaService = require("../services/areaService");
const areaController = require("../controllers/areaController");
const lampioniService = require("../services/lampioneService");
const sensoriService = require("../services/sensoreService");
const guastiService = require("../services/guastoService");
const areaRoutes = require("../routes/areaRoutes");
const authenticationService = require("../services/authenticationService")
const createServer= require("../server");
const { lampioni } = require('../models');
const app = createServer()
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple')

describe('login', () => {
  it('should return a token when given valid username and password', async () => {
    // Arrange
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';
    const mockAmministratore = {
      nome_utente: mockUsername,
      password: 'hashedPassword', // Replace with a hashed password
    };

    Amministratori.findOne = jest.fn();
    bcrypt.compare = jest.fn();

    jwt.encode = jest.fn();
    // Mock Amministratori.findOne to return the mockAmministratore
    Amministratori.findOne.mockResolvedValue(mockAmministratore);
    
    // Mock bcrypt.compare to return true for password matching
    bcrypt.compare.mockResolvedValue(true);

   
    // Mock jwt.encode to return a token
    jwt.encode.mockReturnValue('mockToken');

    // Act
    const result = await authenticationService.login(mockUsername, mockPassword);

    // Assert
    expect(result).toBe('mockToken');
    expect(Amministratori.findOne).toHaveBeenCalledWith({
      where: {
        nome_utente: mockUsername,
      },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockAmministratore.password);
    expect(jwt.encode).toHaveBeenCalledWith(
      {
        username: mockUsername,
        expire: '1h',
      },
      'abracadabra'
    );
  });

  it('should return an error message when given invalid username or password', async () => {
    // Arrange
    const mockUsername = 'invaliduser';
    const mockPassword = 'invalidpassword';

    Amministratori.findOne = jest.fn();
    bcrypt.compare = jest.fn();

    jwt.encode = jest.fn();

    // Mock Amministratori.findOne to return null (no user found)
    Amministratori.findOne.mockResolvedValue(null);

    // Act
    const result = await authenticationService.login(mockUsername, mockPassword);

    // Assert
    expect(result).toBe('Nome utente o password invalidi');
    expect(Amministratori.findOne).toHaveBeenCalledWith({
      where: {
        nome_utente: mockUsername,
      },
    });
  });

  it('should return an error message when password does not match', async () => {
    // Arrange
    const mockUsername = 'testuser';
    const mockPassword = 'wrongpassword';
    const mockAmministratore = {
      nome_utente: mockUsername,
      password: 'hashedPassword', // Replace with a hashed password
    };
    Amministratori.findOne = jest.fn();
    bcrypt.compare = jest.fn();

    jwt.encode = jest.fn();

    // Mock Amministratori.findOne to return the mockAmministratore
    Amministratori.findOne.mockResolvedValue(mockAmministratore);

    // Mock bcrypt.compare to return false for password mismatch
    bcrypt.compare.mockResolvedValue(false);

    // Act
    const result = await authenticationService.login(mockUsername, mockPassword);

    // Assert
    expect(result).toBe('Nome utente o password invalidi');
    expect(Amministratori.findOne).toHaveBeenCalledWith({
      where: {
        nome_utente: mockUsername,
      },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockAmministratore.password);
  });

  it('should return an error message when an error occurs during login', async () => {
    // Arrange
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';

    Amministratori.findOne = jest.fn();
    bcrypt.compare = jest.fn();

    jwt.encode = jest.fn();

    // Mock Amministratori.findOne to throw an error
    Amministratori.findOne.mockRejectedValue(new Error('Database error'));

    // Act
    const result = await authenticationService.login(mockUsername, mockPassword);

    // Assert
    expect(result).toBe('errore');
    expect(Amministratori.findOne).toHaveBeenCalledWith({
      where: {
        nome_utente: mockUsername,
      },
    });
  });
});