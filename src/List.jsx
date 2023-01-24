import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function List({list,remove,edit}) {
  return (
        <div className="grocery-list">
            {
                list.map((item,index)=>{
                    const {title, id} = item
                    return <article key={index} className='grocery-item'>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button onClick={()=>edit(id)} className="edit-btn">
                                <FaEdit />
                            </button>
                            <button onClick={()=>remove(id)} className='delete-btn'>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                })
            }
        </div>
  )
}
