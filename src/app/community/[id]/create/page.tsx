'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/app/api/db';
import { uuid } from 'uuidv4';

import type { Tables } from '@/types/supabase';

export default function page() {
  const [post, setPost] = useState<Tables<'post'>[]>();
  const [content, setContent] = useState<string>('');
  const [postPic, setPostPic] = useState<string[]>([]);
  const [inputHashTag, setInputHashTag] = useState<string>('');
  const [hashTags, setHashTags] = useState<string[]>([]);

  // const router = useRouter();
  const postId = uuid();

  // post 테이블에서 option 가져오는거
  async function fetchPostData() {
    const { data: post } = await supabase.from('post').select('*');
    if (post) {
      setPost(post);
    }
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  function handleChangeInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
  }

  // 캠핑장 이미지 업로드
  function handleChangeInputImageFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setPostPic((prev) => [...prev, URL.createObjectURL(file)]);
    }
  }
  // 버튼 클릭시 이미지 삭제
  const handleDeleteCampImg = (index: number) => {
    setPostPic(
      (prev) =>
        prev?.filter((_, idx) => {
          return index !== idx;
        }),
    );
  };

  // 해시태그
  const isEmptyValue = (value: string | any[]) => {
    if (!value.length) {
      return true;
    }
    return false;
  };

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (isEmptyValue(e.currentTarget.value.trim())) {
      return setInputHashTag('');
    }

    let newHashTag = e.currentTarget.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag)) return;

    setHashTags((prevHashTags) => {
      // return [...new Set([...prevHashTags, newHashTag])];
      const uniqueHashTags = new Set([...prevHashTags, newHashTag]);
      return Array.from(uniqueHashTags);
    });

    setInputHashTag('');
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) {
      setInputHashTag('');
    }
  };

  const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTag(e.target.value);
  };

  const handleDeleteHashtag = (hashTag: string) => {
    setHashTags(
      hashTags.filter((item) => {
        return item !== hashTag;
      }),
    );
  };

  // 이미지 업로드 및 supabase에 저장
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Supabase에 게시물 등록
      const { data: post } = await supabase
        .from('post')
        .insert({ id: postId, content })
        .select();

      // 여러개 사진 table에 올리는 로직
      for (const item of postPic) {
        const blob = await fetch(item).then((r) => r.blob());
        const { data, error } = await supabase.storage
          .from('post_pic')
          .upload(window.URL.createObjectURL(blob), blob);

        if (error) {
          console.error('이미지 업로드 중 에러 발생:', error);
          return;
        }

        // Supabase 테이블에 이미지 정보 저장
        const BASE_URL =
          'https://kuxaffboxknwphgulogp.supabase.co/storage/v1/object/public/post_pic/';
        await supabase
          .from('post_pic')
          .insert({ post_id: postId, photo_url: BASE_URL + data?.path })
          .select();
      }

      // Supabase 테이블에 해시태그 정보 저장
      const { data: post_hashtag } = await supabase
        .from('post_hashtag')
        .insert(
          hashTags.map((item) => {
            return { post_id: postId, tag: item };
          }),
        )
        .select();

      if (post && post_hashtag) {
        alert('등록되었습니다');
        // router.push('/community');
      }
    } catch (error) {
      console.error('폼 제출 중 에러 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => handleChangeInput(e)}
          required
        />
      </label>

      <label>
        Image:
        <input
          type='file'
          accept='image/*'
          onChange={handleChangeInputImageFile}
        />
      </label>
      {/* 이미지 미리보기 및 삭제 버튼 */}
      {postPic.map((item, index) => (
        <div key={index}>
          <img
            src={item}
            alt={`이미지 ${index + 1}`}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
          <button type='button' onClick={() => handleDeleteCampImg(index)}>
            삭제
          </button>
        </div>
      ))}

      <label>
        해시태그 :
        <input
          id='hashTagInput'
          value={inputHashTag}
          onChange={(e) => changeHashTagInput(e)}
          onKeyUp={(e) => addHashTag(e)}
          onKeyDown={(e) => keyDownHandler(e)}
          placeholder='#해시태그를 등록해보세요. (최대 10개)'
          className='hashTagInput'
        />
      </label>

      {hashTags.length > 0 &&
        hashTags.map((item) => {
          return (
            <div key={item}>
              <div className='tag'>{'#' + item}</div>
              <button type='button' onClick={() => handleDeleteHashtag(item)}>
                삭제
              </button>
            </div>
          );
        })}

      <button type='submit'>등록</button>
    </form>
  );
}
