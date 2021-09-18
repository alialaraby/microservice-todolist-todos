const express = require('express');
const app = express();

const userRouter = require('../routers/user');
app.use('/users', userRouter);

const userModel = require('../models/user.js');
const mongoose = require('mongoose');
const config = require('config');
const supertest = require('supertest');

beforeEach(() => {
    mongoose.connect(
        config.get('db_connectionString'), 
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
});
afterAll(() => {
    mongoose.connection.close();
});
describe('GET users/getAllUsers', () => {
    it('should return status code 200/204 object with array of users and message', async () => {
        const user = await userModel.create({fullName: 'ali', username: 'alialaraby', password: '123aaAA23**', email: 'alisakr@grmd.com'});
        await supertest(app).get('/users/getAllUsers')
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.length).toBeTruthy();
            expect(response.body).toHaveProperty('message');
        });
    });
})