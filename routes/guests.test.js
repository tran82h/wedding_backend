import {
  describe
} from "joi";
import {
  Guest
} from "../models/guest";
import {
  User
} from "../models/user";
import {
  request
} from "express";

let server;

describe('/api/guests', () => {
  beforeEach(() => {
    server = require('../../index');
  })
  afterEach(async () => {
    server.close();
    await Guest.remove({});
  });

  describe('GET /:id', () => {
    it('should return a guest if valid id is passed', () => {
      const guest = new Guest({
        name: 'guest1'
      });
      await guest.save();

      const res = await request(server).get('/api/guests/' + guest._id)

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', guests.name);
    });
    it('should return 404 if invalid id is passed', () => {
      const guest = new Guest({
        name: 'guest1'
      });
      await guest.save();

      const res = await request(server).get('/api/guests/1')

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('name', guests.name);
    });
  });
  describe('POST /', () => {
    let token;

    const exec = async () => {
      return await request(server)
        .post('/api/guests')
        .set('x-auth-token', token)
        .send({
          name: 'guest1'
        });
    }

    beforeEach(() => {
      const token = new User().generateAuthToken();
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {

      const token = new User().generateAuthToken();

      const name = new Array(52).join('a');

      const res = await request(server)
        .post('/api/guests')
        .set('x-auth-token', token)
        .send({
          name: name
        });

      expect(res.status).toBe(400);
    });
    it('should save the genre if it is valid', async () => {
      const token = new User().generateAuthToken();

      await exec();

      const res = await request(server)
        .post('/api/guests')
        .set('x-auth-token', token)
        .send({
          name: 'guest1'
        });

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'guest1');
    });
  })
});