import { save } from '@/actions/books';
import { Label } from '@radix-ui/react-label';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditBook({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  async function saveBook(formData: FormData) {
    'use server';
    const title = formData.get('title');
    const writer = formData.get('writer');

    console.log('save.formDate>>', title, writer);

    if (!title || !writer) return alert('Input title & writer, plz');
    save(+bookId, String(title), String(writer));
    redirect(`/books/${bookId}`);
  }
  return (
    <form action={saveBook} className='space-y-2'>
      <Label>Title</Label>
      <Input type='text' name='title' />
      <Label>Writer</Label>
      <Input type='text' name='writer' />

      <Button type='submit'>Edit</Button>
    </form>
  );
}
