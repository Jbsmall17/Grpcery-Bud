import React,{useEffect} from 'react'

export default function Alert({alert,list,showAlert,isEditing}) {
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            showAlert(false,'','')
        },3000)
        return ()=>{
            clearInterval(timeOut)
        }        
    },[list,isEditing])
    const {show,message,type} = alert
  return (
    <p className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`}>
        {message}
    </p>
  )
}
