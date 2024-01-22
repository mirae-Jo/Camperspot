'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { supabase } from '@/app/api/db';
import { useMutation, useQuery } from '@tanstack/react-query';
import HeartSvg from '@/app/camp/detail/[id]/_svg/HeartSvg';

import styles from '@/app/camp/detail/[id]/_styles/Like.module.css';

type Props = {
  postId: string;
};

export default function CommuLikeBtn({ postId }: Props) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const params = useParams() as { id: string };

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['like'],
    queryFn: async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select('id, like(user_id)')
          .eq('id', postId)
          .single();

        return post;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (user_id: string) => {
      await supabase.from('like').delete().match({ user_id, post_id: postId });
    },
    onSuccess: () => {
      setLikeCount((prev) => prev - 1);
    },
    onError: (error) => {
      console.error('뮤테이션 에러:', error);
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      try {
        await supabase.from('like').insert({
          user_id: userId,
          post_id: postId,
        });
      } catch (error) {
        console.error('좋아요 추가 중 에러 발생:', error);
      }
    },
    onSuccess: () => {
      setLikeCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (data) {
      const result = data.like?.some((item) => item.user_id === userId);
      setLiked(!!result);
      setLikeCount(data.like?.length);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const handleLikeBtn = async () => {
    try {
      if (liked) {
        // 이미 좋아요를 눌렀다면 취소
        deleteMutation.mutate(userId);
      } else {
        // 좋아요를 누르지 않았다면 추가
        addMutation.mutate();
      }
      setLiked((prevLiked) => !prevLiked);

      // 좋아요 상태 변경 후, 캠프 정보 다시 불러오기
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 중 오류 발생', error);
    }
  };

  return (
    <div className={styles.commuWrap}>
      <button className={styles.btn} onClick={handleLikeBtn}>
        <HeartSvg isLiked={liked} />
      </button>
      <p key={data?.id}>좋아요 {likeCount}개</p>
    </div>
  );
}