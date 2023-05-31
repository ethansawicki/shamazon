import { useEffect, useState } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

export const ShamazonUserCheck = ({app}) => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [firebaseUser, setFirebaseUser] = useState({})
  useEffect(
    () => {
      firebaseUser ? setLoggedInUser(true) : setLoggedInUser(false)
    },
    []
  )

  const auth = getAuth(app);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(true)
      setFirebaseUser(user)
      } else {
      setLoggedInUser(false)
      setFirebaseUser({})
      }
  })

  if (loggedInUser === true) {
    return <ShamazonLoggedInView auth={auth} setLoggedInUser={setLoggedInUser} />
  } else {
    return  <ShamazonVisitorView setLoggedInUser={setLoggedInUser} />
  }
}
