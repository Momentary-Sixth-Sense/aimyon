import { getPhotoCached } from '@/cache';
import PhotoShareModal from '@/photo/PhotoShareModal';
import { FilmSimulation } from '@/simulation';
import { PATH_GALLERY } from '@/site/paths';
import { redirect } from 'next/navigation';

export default async function Share({
  params: { photoId, simulation },
}: {
  params: { photoId: string, simulation: FilmSimulation }
}) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { return redirect(PATH_GALLERY); }

  return <PhotoShareModal {...{ photo, simulation }} />;
}
