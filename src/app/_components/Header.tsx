'use client';
import logOut from '@/asset/logOut.png';
import logo from '@/asset/logo.png';
import CommunitySvg from '@/components/CommunitySvg';
import MyProfileSvg from '@/components/MyProfileSvg';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../_styles/Header.module.css';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import ProfileDivider from './ProfileDivider';
const Header = () => {
  const pathname = usePathname();
  const conditions = pathname.startsWith('/auth');
  const { data: session } = useSession();

  if (conditions) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <header className={styles.header}>
            <Link href={'/'}>
              <figure className={styles.img}>
                <Image src={logo} alt='' />
              </figure>
            </Link>
            <SearchBar />
            <div className={styles.navBox}>
              <Link href={'/community'}>
                <CommunitySvg />
                <p>커뮤니티</p>
              </Link>
              {session ? (
                <>
                  <ProfileDivider session={session} />
                  <button
                    onClick={() => signOut()}
                    className={styles.logOutBtn}
                  >
                    <Image src={logOut} alt='' width={30} height={30} />
                  </button>
                </>
              ) : (
                <>
                  <Link href={'/auth/signin'} className={styles.my}>
                    <MyProfileSvg />
                    <p>로그인</p>
                  </Link>
                </>
              )}
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
