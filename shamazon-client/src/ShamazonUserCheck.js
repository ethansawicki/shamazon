import { useEffect, useState } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const ShamazonUserCheck = ({app}) => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const firebaseUser = sessionStorage.getItem("firebase:authUser:AIzaSyCfw6KDeAsXygQFh5Nsx_T3u9asA1Jjdx4:[DEFAULT]")
  const auth = getAuth();

  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(true)
      const uid = auth.currentUser.uid
      } else {
      setLoggedInUser(false)
      }
  })
  

  if (loggedInUser === true) {
    return <ShamazonLoggedInView setLoggedInUser={setLoggedInUser} />
  } else {
    return  <ShamazonVisitorView setLoggedInUser={setLoggedInUser} />
  }
}
