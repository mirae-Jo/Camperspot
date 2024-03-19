'use client';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';
import useAddForm from '../../../_hooks/useAddForm';
import styles from '../_styles/CampForm.module.css';
import CampPicture from './CampPicture';
import CheckInOut from './CheckInOut';
import Facility from './Facility';
import Hashtag from './Hashtag';
import Layout from './Layout';
import SearchAddress from './SearchAddress';

const AddForm = () => {
  const params = useParams();

  const companyUserId = params.id;

  const {
    address,
    campLayout,
    campPicture,
    handlePhone,
    check_in,
    check_out,
    checkedFacility,
    facility,
    handleCheck_in,
    handleCheck_out,
    handleForm,
    handleName,
    hashTags,
    inputHashTag,
    isAddressModal,
    isError,
    isPending,
    isRightNumber,
    name,
    phone,
    setAddress,
    setAddressModal,
    setCampLayout,
    setCampPicture,
    setCheckedFacility,
    setFacility,
    setHashTags,
    setInputHashTag,
    content,
    handleContent,
  } = useAddForm(companyUserId);

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      {isPending ? (
        <div className={styles.isPending}>
          <Loading />
        </div>
      ) : (
        <div>
          <form onSubmit={handleForm} className={styles.formLayout}>
            <div className={styles.campNameWrap}>
              <h3>캠핑장 명</h3>
              <input
                value={name}
                onChange={handleName}
                placeholder='캠핑장 이름을 입력해주세요'
                required
                className={styles.campNameInput}
              />
            </div>
            <div className={styles.campAddressWrap}>
              <h3>주소</h3>
              <div className={styles.addressSearchWrap}>
                <div>
                  <button
                    onClick={() => {
                      setAddressModal(true);
                      document.body.style.overflow = 'hidden';
                    }}
                    type='button'
                    className={styles.addressSearchBtn}
                  >
                    주소 검색하기
                  </button>
                </div>
                <input
                  defaultValue={address}
                  placeholder='주소검색하기를 클릭해주세요'
                  className={styles.addressSearchInput}
                />
              </div>
            </div>
            <div className={styles.campContentWrap}>
              <h3>캠핑장 소개</h3>
              <textarea
                value={content}
                onChange={handleContent}
                placeholder='캠핑장을 소개해주세요'
                required
              ></textarea>
            </div>
            <Facility
              facility={facility}
              setFacility={setFacility}
              checkedFacility={checkedFacility}
              setCheckedFacility={setCheckedFacility}
            />
            <CheckInOut
              check_in={check_in}
              handleCheck_in={handleCheck_in}
              check_out={check_out}
              handleCheck_out={handleCheck_out}
            />
            <div className={styles.requestCallWrap}>
              <h3>문의전화</h3>
              <input
                value={phone}
                onChange={handlePhone}
                type='tel'
                placeholder='예) 02-000-0000 / 063-000-0000'
                pattern='[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}'
                maxLength={13}
                required
                className={styles.requestCallInput}
              />
              {!isRightNumber && (
                <p className={styles.isRightNumber}>형식을 맞춰주세요</p>
              )}
            </div>
            <Layout campLayout={campLayout} setCampLayout={setCampLayout} />
            <CampPicture
              campPicture={campPicture}
              setCampPicture={setCampPicture}
            />
            <Hashtag
              hashTags={hashTags}
              setHashTags={setHashTags}
              inputHashTag={inputHashTag}
              setInputHashTag={setInputHashTag}
            />
            <div className={styles.btns}>
              <button type='submit' className={styles.addCampBtn}>
                등록하기
              </button>
            </div>
          </form>
          <SearchAddress
            setAddress={setAddress}
            isAddressModal={isAddressModal}
            setAddressModal={setAddressModal}
          />
        </div>
      )}
    </>
  );
};

export default AddForm;
