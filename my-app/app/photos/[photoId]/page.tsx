'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { Album, getPhoto } from '@/lib/photos';

export default function Photo({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  const [photo, setPhoto] = useState<Album>();
  useLayoutEffect(() => {
    (async function () {
      const data = await getPhoto(+photoId);
      setPhoto(data);
    })();
  }, [photoId]);

  // const { title, url, albumId } = await getPhoto(+photoId);
  const router = useRouter();
  const goList = () => {
    router.push('/photos');
  };

  return (
    <>
      <h1 className='text-2xl mt-5'>
        {/* #{albumId} - {title} */}#{photo?.albumId} - {photo?.title}
      </h1>
      {/* <Image
        onClick={goList}
        src={url}
        alt={title}
        width={600}
        height={600}
        loading='lazy'
        className='cursor-pointer'
      /> */}
      {photo && (
        <Image
          onClick={goList}
          src={photo.url}
          alt={photo.title}
          width={600}
          height={600}
          loading='lazy'
          className='cursor-pointer'
        />
      )}
      <h2>{photo?.title}</h2>
    </>
  );
}
