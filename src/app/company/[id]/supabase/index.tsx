import { supabase } from '@/app/api/db';

export const insertFacility = async (
  campId: string,
  checkedFacility: number[],
) =>
  supabase
    .from('camp_facility')
    .insert(
      checkedFacility.map((item) => {
        return { camp_id: campId, facility_id: item };
      }),
    )
    .select();

export const uploadStorage = (storageName: string) => {
  return async (blob: Blob | File) => {
    return await supabase.storage
      .from(storageName)
      .upload(window.URL.createObjectURL(blob), blob);
  };
};

// 등록 눌렀을 시 storage에 캠핑장 배치 이미지 업로드
export const uploadStorageLayoutData = async (blob: Blob | File) => {
  return await uploadStorage('camp_layout')(blob);
};

// 등록 눌렀을 시 캠핑장 이미지 업로드
export const uploadStorageCampPicData = async (blob: Blob | File) => {
  return await uploadStorage('camp_pic')(blob);
};

const uploadImageAndGetUrl = async (
  imageItem: string,
  upload: (blob: Blob | File) => UploadStorage,
  storageName: string,
) => {
  const blob = await fetch(imageItem).then((r) => r.blob());
  const { data, error } = await upload(blob);
  if (error) return null;

  const BASE_URL =
    'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/';

  return BASE_URL + storageName + '/' + data?.path;
};

// 배치 이미지 table에 올리는 로직
// curring
export const uploadLayoutToCampTable = (campId: string) => {
  return async (campLayout: string) => {
    const url = await uploadImageAndGetUrl(
      campLayout,
      uploadStorageLayoutData,
      'camp_layout',
    );

    // 에러 발생
    if (!url) return;

    // supabase camp table의 layout에 넣는 로직
    return await supabase.from('camp').update({ layout: url }).eq('id', campId);
  };
};

export const uploadCampPicToCampTable = (campId: string) => {
  return async (campPic: string) => {
    const url = await uploadImageAndGetUrl(
      campPic,
      uploadStorageCampPicData,
      'camp_pic',
    );

    if (!url) return;

    return await supabase
      .from('camp_pic')
      .insert({ camp_id: campId, photo_url: url })
      .select();
  };
};

type UploadStorage = ReturnType<
  typeof uploadStorageLayoutData | typeof uploadStorageCampPicData
>;
