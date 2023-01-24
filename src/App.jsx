import React, {useState,useEffect} from 'react'
import Alert from './Alert'
import reactLogo from './assets/react.svg'
import List from './List'

const getStorage = () =>{
  let list = localStorage.getItem("listData")
  if (list){
    list = JSON.parse(list)
    return list
  }    
  else{
    return []
  }
}


function App() {
  const [name,setName] = useState('')
  const [list, setList] = useState(getStorage())
  const [alert,setAlert] = useState({show: false, message:'',type: ''})
  const [isEditing,setIsEditing] = useState(false)
  const [editId,setEditId] = useState(null)

  useEffect(()=>{
    localStorage.setItem("listData",JSON.stringify(list))
  },[list])
  const showAlert = (show=false, type='',message='') =>{
      setAlert({
        show,
        message,
        type
      })
    }
    
    const removeItem = (id) =>{
    showAlert(true,'danger','item removed')
    const newList = list.filter(item=>item.id !== id)
    setList(newList)
  }

  const editItem = (id) =>{
    showAlert(true,'danger','Editting list')
    const specificItem = list.find((item) => item.id === id); 
    setIsEditing(true)
    setName(specificItem.title)
    setEditId(id)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
   if(!name){
    // Dispaly Alert
    showAlert(true, "danger", "Please Enter value")
   }
   else if (name && isEditing){
    setList(list.map((item)=>{
      if (item.id === editId){
         return ({
          ...item, title: name
         })
      }
      else {
        return item
      }
    }))
    setIsEditing(false)
   }
   else{
    const newItem = {id: new Date().getTime().toString(), title: name}
    setList([... list,newItem])
    showAlert(true, "success", "Item Added to the list")
  }
   
   setName('')
  }
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert showAlert={showAlert} isEditing={isEditing} list={list} alert={alert}/>}
        <h3>Grocery bud</h3>
        <div className='form-control'>
          <input 
            type="text" 
            className="grocery" 
            placeholder="e.g egges"
            value= {name}
            onChange={(e)=>{setName(e.target.value)}}
            />
          <button type="submit" className="submit-btn">{isEditing? "edit" : "submit"}</button>
        </div>
      </form>
        {
          list.length > 0
          ? (
          <div className='grocery-container'>
            <List list={list} edit={editItem} remove={removeItem}/> 
          <button type='button' className='clear-btn' onClick={()=>{setList([]);showAlert(true,'danger','Empty List')}}> 
          clear items
          </button> 
          </div>
          )
          : null        
        }
  
    </section>
  )
}
export default App