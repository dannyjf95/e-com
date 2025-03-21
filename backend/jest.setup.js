const sequelize = require("./config/db");

// Disable Sequelize logging

global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

sequelize.options.logging = true;
