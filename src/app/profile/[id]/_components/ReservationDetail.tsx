'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserReservation } from '../_lib/getUserReservation';
import { useParams } from 'next/navigation';
import styles from '../_styles/ReservationDetail.module.css';
import ReservationList from './ReservationList';

export const ReservationDetail = () => {
  const params = useParams();
  const { id: userId } = params;
  const {
    isLoading,
    error,
    data: reservations,
  } = useQuery({
    queryKey: ['mypage', 'profile', 'reservation'],
    queryFn: () => getUserReservation(userId as string),
  });

  const plannedReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.check_in_date).getTime() >=
        new Date(new Date().setHours(0, 0, 0)).getTime() &&
      new Date(reservation.check_out_date).getTime() >
        new Date(new Date().setHours(0, 0, 0)).getTime(),
  );

  const passedReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.check_out_date).getTime() < new Date().getTime(),
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.layout}>
      <h3 className={styles.h3}>예약 현황</h3>
      <p className={styles.p}>이용 예정</p>
      <div className={styles.div}>
        <p>예약 일시</p>
        <p>캠핑장 이름</p>
        <p>캠핑존 이름</p>
        <p>체크인/아웃</p>
        <p>주소</p>
      </div>
      <div className={styles.divider}></div>
      <ul>
        <ReservationList reservations={plannedReservation!} isPlanned={true} />
      </ul>
      <p className={styles.p}>이용 후</p>
      <div className={styles.div}>
        <p>예약 일시</p>
        <p>캠핑장 이름</p>
        <p>캠핑존 이름</p>
        <p>체크인/아웃</p>
      </div>
      <div className={styles.divider}></div>
      <ul>
        <ReservationList reservations={passedReservation!} isPlanned={false} />
      </ul>
    </div>
  );
};