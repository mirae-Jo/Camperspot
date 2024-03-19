import { supabase } from '@/app/api/db';
import useInput from '@/hooks/useInput';
import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { checkRightNumber } from '../_lib/valid';
import {
  insertFacility,
  uploadCampPicToCampTable,
  uploadLayoutToCampTable,
} from '../supabase';
import useInputValid from './useInputValid';

const useAddForm = (companyUserId: string | string[]) => {
  const [name, handleName] = useInput();
  const [content, handleContent] = useInput();
  const [address, setAddress] = useState('');
  const [isAddressModal, setAddressModal] = useState(false);
  const [phone, isRightNumber, handlePhone] = useInputValid(checkRightNumber);

  const [check_in, handleCheck_in] = useState<string>('');
  const [check_out, handleCheck_out] = useState<string>('');
  const [facility, setFacility] = useState<Tables<'facility'>[]>([]);
  const [checkedFacility, setCheckedFacility] = useState<number[]>([]);
  const [campLayout, setCampLayout] = useState<string>('');
  const [campPicture, setCampPicture] = useState<string[]>([]);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  const regionSplit = address.split(' ');
  const regionDoGun = regionSplit[0] + ' ' + regionSplit[1];

  // Form Submit
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (campPicture.length < 5) {
      // todo : campPicture가 없을 때 로직 처리해야함
      toast.error('캠핑장 이미지 다섯 장 이상 등록');
      return;
    }
    const campId = uuid();
    createCamp(campId);

    // supabase에 체크된 시설정보만 등록하는 로직
    const { data: camp_facility } = await insertFacility(
      campId,
      checkedFacility,
    );

    uploadLayoutToCampTable(campId)(campLayout);

    // 여러개 사진 table에 올리는 로직
    campPicture.forEach((campPic) => uploadCampPicToCampTable(campId)(campPic));

    const { data: hashtagData } = await supabase
      .from('hashtag')
      .insert(
        hashTags.map((item) => {
          return { camp_id: campId, tag: item };
        }),
      )
      .select();

    if (error) {
      console.log(error);
      toast.error('에러 발생');
    } else {
      toast.success('등록 완료!');
      return { camp_facility, hashtagData };
    }
  };

  const {
    mutate: createCamp,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (campId: string) => {
      const { data, error } = await supabase
        .from('camp')
        .insert({
          id: campId,
          name,
          content,
          company_id: companyUserId as string,
          address,
          region: regionDoGun,
          phone,
          check_in,
          check_out,
          layout: campLayout,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['camp_id'] });
      router.push(
        `/company/${companyUserId}/manage_camp/${data[0].id}/manage_camp_area`,
      );
    },
  });

  return {
    isError,
    isPending,
    handleForm,
    handleName,
    name,
    setAddressModal,
    address,
    facility,
    setFacility,
    checkedFacility,
    setCheckedFacility,
    check_in,
    handleCheck_in,
    check_out,
    handleCheck_out,
    phone,
    checkRightNumber,
    isRightNumber,
    campLayout,
    setCampLayout,
    campPicture,
    setCampPicture,
    hashTags,
    setHashTags,
    inputHashTag,
    setInputHashTag,
    setAddress,
    isAddressModal,
    handlePhone,
    content,
    handleContent,
  };
};

export default useAddForm;
