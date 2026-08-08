import React, { useEffect, useState } from 'react'
import { readData } from '../../superbase/supabase';

const Staff = () => {
    const [staffs, setstaffs] = useState("");
    useEffect(()=>{
        await readData("")
    })
  return (
    <div>
        <select name="" id="">
            <option value="teaching">Teaching Staff</option>
            <option value="nonTeaching">Non-Teaching Staff</option>
            </select>        
    </div>

  )
}

export default Staff