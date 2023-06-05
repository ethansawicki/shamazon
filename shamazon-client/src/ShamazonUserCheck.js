import { useEffect, useState, useCallback } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ifUserInSessionGetUser } from "./components/fetchcalls/fetchCalls";


export const ShamazonUserCheck = ({app}) => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const auth = getAuth(app);
  const navigate = useNavigate();
  const displayName = userInfo.displayName

  const fetchUser = useCallback(async () => {
    const userData = await ifUserInSessionGetUser();
    setUserInfo(userData)
  },[])

  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        getIdToken(user).then((token) => { sessionStorage.setItem("__SESSION", token) })
        setLoggedInUser(true)
        fetchUser()
        navigate("/")
        } else {
        setLoggedInUser(false)
        setUserInfo({})
        navigate("/")
        }
    })
  },[auth, fetchUser])
  
  if (loggedInUser === true) {
    return <ShamazonLoggedInView
      auth={auth}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      displayName={displayName}
      navigate={navigate}
    />
  } else {
    return <ShamazonVisitorView
      auth={auth}
      setUserInfo={setUserInfo}
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
    />
  }
}
