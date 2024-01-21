'use client';
import { supabase } from '@/app/api/db';
import styles from '../_styles/ReservationModal.module.css';
import ReservationForm from './ReservationForm';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ReservationInfo } from '@/types/reservation';

const ReservationModal = () => {
  const [reservation, setReservation] = useState<ReservationInfo>();
  const params = useSearchParams();
  const campAreaId = params.get('id');
  const router = useRouter();
  useEffect(() => {
    const fetchReservation = async () => {
      const { data, error } = await supabase
        .from('camp_area')
        .select(`id,max_people,price,name,camp!inner(name,check_in,check_out)`)
        .eq('id', campAreaId!)
        .single();
      setReservation(data!);
    };
    fetchReservation();
  }, []);
  if (!reservation) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button onClick={() => router.back()} className={styles.closeBtn}>
          <svg
            width={24}
            viewBox='0 0 24 24'
            aria-hidden='true'
            className='r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03'
          >
            <g>
              <path d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'></path>
            </g>
          </svg>
        </button>
        <div className={styles.div}>
          <h1 className={styles.h1}>예약 및 결제</h1>
          <div className={styles.campInfo}>
            <h3 className={styles.h3}>예약 정보</h3>
            <p>
              캠핑장 이름 <span>{reservation.camp?.name}</span>
            </p>
            <p>
              객실 <span>{reservation.name}</span>
            </p>
          </div>
          <ReservationForm reservation={reservation} />
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
