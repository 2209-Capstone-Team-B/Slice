import React, {useEffect} from 'react';
import { useRouter} from 'next/router'
import {fetchEcosystem} from '../../Store'
import { useDispatch, useSelector } from 'react-redux';

export default function ecosystem() {
const router = useRouter()
const {id} = router.query
const dispatch = useDispatch()
const singleEcosystem = useSelector(state=> state.singleEcosystem)
useEffect(() => {
  const unsubscribe = dispatch(fetchEcosystem(id));
  return () => {
    unsubscribe();
  };
}, []);
  return <div>{singleEcosystem.orgName}</div>;
}
