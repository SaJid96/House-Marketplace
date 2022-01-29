import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc,doc,serverTimestamp } from 'firebase/firestore';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { toast } from 'react-toastify';



function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password,name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };


  const onSubmit = async (e) =>{

    e.preventDefault()

    try {
      const auth=getAuth()


      const userCredential= await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

      updateProfile(auth.currentUser,{
        displayName:name
      })

      const formDataCopy ={...formData}

      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db,'users',user.uid),formDataCopy)

      navigate('/')

    } catch (error) {

      toast.error('Something Went Wrong with Registration')
    }

  }


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              value={name}
              onChange={onChange}
              id="name"
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={onChange}
              id="email"
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                className="passwordInput"
                id="password"
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="singUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* Google oAuth */}
          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
