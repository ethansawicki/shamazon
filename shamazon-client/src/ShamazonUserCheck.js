import { useEffect, useState, useCallback } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUserProfileById } from "./components/fetchcalls/fetchCalls";
import { ShoppingCart } from "./components/cart/Cart";


export const ShamazonUserCheck = ({app}) => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [userUpdate, setUserUpdate] = useState(0)
  const auth = getAuth(app);
  const navigate = useNavigate();

  const fetchUser = useCallback(async (token, uid) => {
      const userData = await getUserProfileById(token, uid);
    setUserInfo(userData)
    setLoggedInUser(true)
  },[])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const uid = auth.currentUser.uid
        fetchUser(token, uid)
      } else {
        setLoggedInUser(false)
        setUserInfo({})
        navigate("/")
      }
    })
  },[fetchUser, auth, userUpdate])

  if (loggedInUser === true) {
    return  <ShamazonLoggedInView
              auth={auth}
              userUpdate={userUpdate}
              setUserUpdate={setUserUpdate}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              navigate={navigate}
            />
  } else {
    return <ShamazonVisitorView
        auth={auth}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    
  }
}
