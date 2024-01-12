'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ReservationForm.module.css';
import { NAME_REGEX, PHONE_REGEX } from '@/app/utils/regex';
import { supabase } from '@/app/api/db';
import { Reservation } from '@/types/reservation';
import { useState } from 'react';

type UserInfo = { name: string; phone: string };
const ReservationForm = ({ reservation }: { reservation: Reservation }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInfo>({
    defaultValues: { name: '', phone: '' },
    mode: 'onChange',
  });
  const methods = ['카카오페이', '휴대폰', '카드', '실시간 계좌이체'];
  const [isActive, setIsActive] = useState<number | null>(null);
  const toggleActive = (selectMethod: number) => {
    if (isActive == selectMethod) setIsActive(null);
    else setIsActive(selectMethod);
  };

  const { fee, people, check_in_date, check_out_date } = reservation?.[0];
  const { id } = reservation?.[0].camp_area!;
  const onSubmit: SubmitHandler<UserInfo> = async (userInfo) => {
    console.log(userInfo);
    const { data, error } = await supabase
      .from('reservation')
      .insert({
        //임의의 id로 추가 (나중에 미래님꺼 받으면 uuid로 변경할 예정)
        id: 'c1c3be3d-5274-4a6c-94f2-bd8e3c7cc06a',
        client_name: userInfo.name,
        client_phone: userInfo.phone,
        fee,
        //나중에 로그인한 사용자 유저 아이디로 변경 예정
        user_id: '3a0a96f1-ea9b-480c-9ad4-c4d8756697d6',
        check_in_date,
        check_out_date,
        people,
        camp_area_id: id,
        payment_method: methods[isActive!],
      })
      .select();
    if (data) console.log('데이터 등록 완료!');
    if (error) console.log('error', error);
  };
  return (
    <>
      <h3 className={styles.h3}>결제 정보</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor='userName'>예약자 명</label>
        <input
          type='text'
          id='userName'
          {...register('name', {
            required: '예약자 명을 입력해주세요',
            pattern: {
              value: NAME_REGEX,
              message: '예약자 이름은 2자이상 16자 이하만 가능합니다.',
            },
          })}
          placeholder='이름을 입력해주세요'
        />
        {errors.name && (
          <div className={styles.errors}>
            <p>{errors.name.message}</p>
          </div>
        )}
        <label htmlFor='phone'>연락처</label>
        <input
          type='text'
          id='phone'
          {...register('phone', {
            required: '휴대폰번호를 입력해주세요.',
            pattern: {
              value: PHONE_REGEX,
              message: '010-1234-5678 형식으로 입력해주세요',
            },
          })}
          placeholder='예시) 010-1234-5678'
        />
        {errors.phone && (
          <div className={styles.errors}>
            <p>{errors.phone.message}</p>
          </div>
        )}
        <div>
          <p>결제 수단</p>
          <ul className={styles.ul}>
            {methods.map((method, idx) => (
              <li
                key={idx}
                className={isActive == idx ? styles.selected : styles.li}
                onClick={() => toggleActive(idx)}
              >
                {method}
              </li>
            ))}
          </ul>
          <button
            className={styles.button}
            disabled={!isValid || isActive === null}
          >
            결제하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
