import Image from 'next/image';
import Modal from '@/components/Modal';
import { getPhoto } from '@/lib/photos';

export default async function PhotoInterceptor({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  const { title, url } = await getPhoto(+photoId);
  return (
    <>
      <Modal>
        <div className='flex flex-col items-center'>
          <Image src={url} alt={title} width={400} height={400} priority />
          <h2>{title}</h2>
        </div>
      </Modal>
    </>
  );
}
