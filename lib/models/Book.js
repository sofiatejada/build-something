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

  return new Book(rows[0]);
}

static async getById(id) {
  const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);

  return new Book(rows[0]);
}

static async getAll() {
  const { rows } = await pool.query('SELECT * FROM books');

  return rows.map((row) => new Book(row));
}

static async updateById(id, { name, author, genre, completed }) {
  const existing = await Book.getById(id);

  const newName = name ?? existing.name;
  const newAuthor = author ?? existing.author;
  const newGenre = genre ?? existing.genre;
  const newCompleted = !existing.completed;

  const { rows } = await pool.query('UPDATE books SET name=$1, author=$2, genre=$3, completed=$4 WHERE id=$4 RETURNING *', [newName, newAuthor, newGenre, newCompleted, id]);

  return new Book(rows[0]);
}

static async delteById(id) {
  const { rows } = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [id]);

  return new Book(rows[0]);
}


}


