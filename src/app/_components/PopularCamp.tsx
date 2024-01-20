import { supabase } from '../api/db';
import styles from '../_styles/CampCard.module.css';
import CampCarousel from './CampCarousel';
import Link from 'next/link';

const PopularCamp = async () => {
  const { data: camp, error } = await supabase
    .from('camp')
    .select(
      `
    id,
    name,
    address,
    camp_area(price),
    camp_pic(id,photo_url)
    `,
    )
    .range(0, 9);
  // console.log(camp);
  const a = 'red';
  /* <p className={`${a === 'blue' ? styles.blue : styles.red}`}>text</p> */
  return (
    <div className={styles.wrap}>
      <div className={styles.popular}>
        <div className={styles.popularIntro}>
          <p>인기캠핑장</p>
          <p>현재 가장 인기있는 캠핑장이에요</p>
        </div>
        <Link href={`/camp?sort=인기순&page=1`}>더보기</Link>
      </div>

      <CampCarousel camp={camp} />
    </div>
  );
};

export default PopularCamp;
