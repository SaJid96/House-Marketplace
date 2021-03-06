import { doc, getDoc } from 'firebase/firestore'
import {useState,useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

function Contact() {


    const [message,setMessage]=useState('')
    const [landlord,setLandlord]=useState(null)
    const [searchParams,setSearchParams]=useSearchParams()

const params=useParams()

useEffect(()=>{

    const getLandlord = async () =>{

        const docRef =doc(db,'users',params.landlordId)

        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            setLandlord(docSnap.data())
        }
        else{
            toast.error('could not get landlord data')
        }
    }

    getLandlord()

},[params.landlordId])

const onChange=(e) => setMessage(e.target.value)

  return (
    <div className="pagecontainer">
        <header>
            <p className="pageHeader">
                Contact Landlord
            </p>
        </header>

        {landlord !== null && (
            <main>
                <div className="contactLandlord">
                    <p className="landLordName">Contact {landlord?.name}</p>
                </div>
            <form className='messageForm'>
                <div className="messageDiv">
                    <label htmlFor="message" className='messageLabel'>Message</label>
                    <textarea name="message" id="message"  className='textarea' value={message} onChange={onChange}></textarea>
                </div>
            </form>
            </main>
            
        )}
    </div>
  )
}

export default Contact