import {useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import {auth} from './stores'

export default function WithAuth({children}: any){
    const navigate = useNavigate()
    const _auth: any = useRecoilValue(auth)

    useEffect(()=>{
        if(!_auth.token) navigate('/login')
    }, [])

    return <>{children}</>
}