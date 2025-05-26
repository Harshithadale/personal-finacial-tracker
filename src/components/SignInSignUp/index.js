import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { db, auth, provider, doc, setDoc,getDoc } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
function SignInSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm,setLoginForm] = useState(false)
  const navigate = useNavigate()
  function signupWithEmail() {
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    if (name !== "" && email !=="" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // ...
            toast.success("User Created");
            createDoc(user)
            setLoading(false);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            navigate("/dashboard")

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            // ..
            setLoading(false);
          });
      }
      else{
        toast.error("Password and Confirm Password don't Match")
        setLoading(false)

      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  function loginWithEmail(){
    if(email != "" && password != ""){
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      toast.success("User Logged In")
      setLoading(false)
      setEmail("")
      setPassword("")
      navigate("/dashboard")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      setLoading(false)
    });
  }
  else{
    toast.error("All fields are Mandatory")
  }
  }
  async function createDoc(user) {
    if(!user) return;
    const userRef = doc(db,"users",user.uid)
    const userData = await getDoc(userRef)
    if(!userData.exists()){
    try{
    await setDoc(doc(db, "users", user.uid), {
      name:user.displayName?user.displayName:name,
      email:user.email,
      photoURL:user.photoURL?user.photoURL:"",
    createdAt: new Date()});
    //toast.success("Doc created")
    } 
    catch(e){
      toast.error(e.message)
    }
  }else{
    //toast.error("Doc already exists")
  }
  }
  function googleAuth(){
    setLoading(true)
    try{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setLoading(false)
    createDoc(user)
    toast.success("User Authenticated!")
    navigate("/dashboard")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    setLoading(false)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    toast.error(errorMessage)
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}catch(e){
  setLoading(false)
  toast.error(e.message)
}


  }
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>financely</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
              type={"password"}
            />

            <Button
              text={loading ? "loading..." : "Login using Email and Password"}
              blue={false}
              onClick={loginWithEmail}
              disabled={loading}
            />
            <p className="p-or">or</p>
            <Button text={loading ? "loading..." : "Login using Google"} blue={true} onClick={googleAuth} />
            <p className="p-or" onClick={()=>setLoginForm(!loginForm)}>
              Or Don't Have an account?click here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>financely</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
              type={"text"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
              type={"password"}
            />
            <Input
              label={"confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
              type={"password"}
            />
            <Button
              text={loading ? "loading..." : "Signup using Email and Password"}
              blue={false}
              onClick={signupWithEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center", margin: "0px" }}>or</p>
            <Button text={loading ? "loading..." : "Signup using Google"} blue={true} onClick={googleAuth}/>
            <p className="p-or" onClick={()=>setLoginForm(!loginForm)}>
              Or Have an account Already?click here
            </p>
          </form>
        </div>
      )}
    </>
  );

}

export default SignInSignUp;
