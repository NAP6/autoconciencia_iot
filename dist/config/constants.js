"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    "db-url": process.env.DB_URL,
    "db-port": parseInt(process.env.DB_PORT),
    "db-user": process.env.DB_USER,
    "db-password": process.env.DB_PASSWORD,
    "db-schema": process.env.DB_SCHEMA,
    "server-port": parseInt(process.env.SERVER_PORT),
};
