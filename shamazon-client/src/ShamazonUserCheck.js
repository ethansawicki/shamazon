import { useEffect, useState } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";


export const ShamazonUserCheck = ({app}) => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const auth = getAuth(app);


    
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((token) => {sessionStorage.setItem("__SESSION", token)})
        setLoggedInUser(true)
        } else {
        setLoggedInUser(false)
        }
    })
  },[auth])
  
  if (loggedInUser === true) {
    return <ShamazonLoggedInView
      auth={auth}
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
    />
  } else {
    return <ShamazonVisitorView
      auth={auth}
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
    />
  }
}
