export type Album = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const BaseURL = 'https://jsonplaceholder.typicode.com';

export const getPhotos = async (albumId: number = 1) => {
  const data = await fetch(`${BaseURL}/albums/${albumId}/photos`, {
    next: { revalidate: 10 }, //ISR
  }).then((res) => res.json());
  return data as Album[];
};

export const getPhoto = async (id: number = 1) => {
  const data = await fetch(`${BaseURL}/photos/${id}`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  return data as Album;
};
