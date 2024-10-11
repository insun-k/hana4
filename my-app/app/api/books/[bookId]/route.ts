import { getBook, save } from '@/actions/books';
import { Book, books } from '../bookdata';

type Params = {
  params: { bookId: string };
};

export function GET(req: Request, { params: { bookId } }: Params) {
  const book = getBook(+bookId);
  return Response.json(book);
}

export async function PATCH(req: Request, { params: { bookId } }: Params) {
  const { title, writer } = (await req.json()) as Book;

  //   const book = books.find((book) => book.id === +bookId);
  //   if (!book) return Response.json({ code: 404, message: 'Not Found' });

  //   book.title = title;
  //   book.writer = writer;

  const book = save(+bookId, title, writer);

  return Response.json(book);
}

export function DELETE(req: Request, { params: { bookId } }: Params) {
  const idx = books.findIndex((book) => book.id === +bookId);
  if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });

  books.splice(idx, 1);

  return Response.json({ message: 'ok', code: 200 });
}
