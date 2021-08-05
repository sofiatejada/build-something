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

  it('gets all books', async () => {
    await Book.insert(kafka);
    await Book.insert(siddhartha);
    await Book.insert(handmaid);
    await Book.insert(pain);
    await Book.insert(dune);

    return request(app)
      .get('/api/v1/books')
      .then((res) => {
        expect(res.body).toEqual([{ id: '1', ...kafka }, { id: '2', ...siddhartha }, { id:'3', ...handmaid }, { id: '4', ...pain }, { id: '5', ...dune }]);
      });
  });

  it('updates book', async () => {
    const sent = await Book.insert(kafka);
    const res = await request(app)
      .put(`/api/v1/books/${sent.id}`)
      .send({ completed: true });
    console.log(res.body);

    expect(res.body).toEqual({ ...sent, completed: true });
  });
});
