import { Records } from '@/contents';
import { formatDateFromOrientalString } from '@/utility/date';
import clsx from 'clsx';
import Image from 'next/image';
import ViewMore from './ViewMore';

export type NewReleaseProps = {
  record: Records
}

export default function NewRelease({ record }: NewReleaseProps) {
  return (
    <section id="new-release" className={'font-glacial max-w-7xl'}>
      <div className="flex flex-col gap-4">
        <h1 className="text-title">NEW RELEASE</h1>
        <div className={clsx(
          'pl-8 justify-start gap-4 font-yakuhan',
          'grid grid-cols-1 lg:grid-cols-2'
        )}>
          <div>
            <Image
              src={record.image}
              alt="あのね"
              width={500}
              height={500}
            />
          </div>
          <article className="text-xl">
            <p className="font-glacial">{record.type}</p>
            <h3 className={clsx(
              'text-[32px] font-[800]', 
              'leading-[3rem] tracking-wider mb-2')}
            >{record.title}</h3>
            <p className="text-2xl font-glacial">
              {formatDateFromOrientalString(record.release_at)} RELEASE
            </p>
            <RecordDetail
              price={record.price}
              catalogueNo={record.catalogue_no}
              tracks={record.track}
            />
            {
              record.description && (
                <div
                  dangerouslySetInnerHTML={{__html: record.description}}
                  className="text-sm"
                />
              )
            }
            <ViewMore />
          </article>
        </div>
      </div>
    </section>
  );
}

type RecordDetailProps = {
  price: Records['price'];
  catalogueNo: Records['catalogue_no']
  tracks: Records['track'];
}

function RecordDetail({ price, catalogueNo, tracks }: RecordDetailProps) {
  const priceFormat =
    ['ja-JP', { style: 'currency', currency: 'JPY' }] as const;

  return (
    <>
      <div className={clsx(
        'flex items-center gap-2',
        'text-neutral-400 text-base pt-4')}
      >
        <p>{
          new Intl.NumberFormat(...priceFormat).format(
            price,
          )
        }(税込)</p>
        <p>/</p>
        <p>{catalogueNo}</p>
      </div>
      <div id="tracks" className="py-8 flex flex-col gap-1.5">
        {tracks?.map((track, index) => (
          <div key={index}>
            <p className="flex items-center gap-2">
              <span>{index + 1}.</span>
              {track.title}
            </p>
          </div>))}
      </div>
    </>
  );
}