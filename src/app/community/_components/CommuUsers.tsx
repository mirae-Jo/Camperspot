import React, { useState } from 'react';
import { supabase } from '@/app/api/db';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import styles from '../_styles/CommuUser.module.css';
import MoreSvg from '../_svg/MoreSvg';

type Props = {
  user: {
    id: string;
    nickname: string;
    profile_url: string;
  } | null;
  postId: string;
};

export default function CommuUser({ user, postId }: Props) {
  const [isMorBtn, setIsMoreBtn] = useState(false);

  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (user) {
        await supabase
          .from('post')
          .delete()
          .eq('user_id', userId)
          .match({ id: postId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });

  const handleOnClick = () => {
    if (user?.id === userId) {
      setIsMoreBtn(!isMorBtn);
    }
  };

  const handleDeletedBtn = () => {
    try {
      if (user?.id === userId) {
        deleteMutation.mutate();
      } else {
        console.warn('삭제할 수 있는 권한이 없습니다.');
      }
    } catch (error) {
      console.error('커뮤니티게시글 삭제 중 오류 발생', error);
    }
  };

  return (
    <div className={styles.userWrap}>
      <div className={styles.user}>
        <Image src={user!.profile_url} alt='' width={32} height={32} />
        <p>{user?.nickname}</p>
      </div>
      <div>
        <button onClick={handleOnClick}>
          <MoreSvg />
        </button>
        {isMorBtn ? <button onClick={handleDeletedBtn}>삭제</button> : ''}
      </div>
    </div>
  );
}
