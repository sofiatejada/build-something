import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Book from '../lib/models/Book.js';

const kafka = {
  name: 'Kafka on the Shore',
  author: 'Haruki Murakami',
  genre: 'Magical realism',
  completed: false,
};

const siddhartha = {
  name: 'Siddhartha',
  author: 'Hermann Hesse',
  genre: 'Philosophical fiction',
  completed: false,
};

const handmaid = {
  name: 'The Handmaid\'s Tale',
  author: 'Margaret Atwood',
  genre: 'Dystopian novel',
  completed: false,
};

const pain = {
  name: 'The Problem of Pain',
  author: 'C.S. Lewis',
  genre: 'Religious',
  completed: false,
};

const dune = {
  name: 'Dune',
  author: 'Frank Herbert',
  genre: 'Science fiction',
  completed: false,
};

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send(kafka);

    expect(res.body).toEqual({
      id: '1',
      ...kafka
    });
  });

});
