import sendSms from '../utils/twilio';
import Book from '../models/Book';

export default class BookService {
  static async bookWasRead(id, bookObj) {
    const currentBook = await Book.getById(id);
    await sendSms(
      process.env.CLIENT_NUMBER,
      `${currentBook.name} was read.`
    );

    const updatedBook = await Book.updateById(id, bookObj);
    return updatedBook;
  }
}

