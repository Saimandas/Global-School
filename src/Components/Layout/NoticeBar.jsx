import React, { useEffect, useState } from 'react'
import Container from '../ui/Container';
import { readData } from '../../superbase/supabase';
const NoticeBar = () => {
  const [notices, setnotices] = useState([])
  useEffect(()=>{
    async function getData() {
     const data= await readData("Imp_Notices")
     console.log(data);
     
     setnotices(data)
    }
     getData()
  },[])
  return (
    <aside className=' bg-primary text-primary-foreground h-6'>
      <Container>
        <div className=' overflow-hidden'>
          <div className="flex w-max items-center gap-10 animate-marquee">
            {
                notices.map((e,i)=>(
                    <a key={i} href={e.file} className="flex items-center gap-2 whitespace-nowrap" >
                        <span>📄</span>
                        <span>{e.title}</span>
                    </a>
                ))
            }
        </div>
        </div>
      </Container>
    </aside>
  )
}

export default NoticeBar