import pool from '../utils/pool';

export default class Book {
id;
name;
author;
genre;
completed;

constructor(row) {
  this.id = row.id;
  this.name = row.name;
  this.author = row.author;
  this.genre = row.genre;
  this.completed - row.completed;
}

static async insert({ name, author, genre, completed }) {
  const { rows } = await pool.query('INSERT INTO books (name, author, genre, completed) VALUES ($1, $2, $3) RETURNING *', [name, author, genre, completed]);
}




}


