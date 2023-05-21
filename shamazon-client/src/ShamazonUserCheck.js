import { useEffect, useState } from "react";
import { ShamazonLoggedInView } from "./ShamazonLoggedInView";
import { ShamazonVisitorView } from "./ShamazonVisitorView";

export const ShamazonUserCheck = () => {
  const userStorage = sessionStorage.getItem('Shamazon_User')
  const userCreds = JSON.parse(userStorage)
  const [loggedInUser, setLoggedInUser] = useState(false)

  useEffect(
    () => {
      userCreds ? setLoggedInUser(true) : setLoggedInUser(false)
    },
    []
  )
  if (loggedInUser === true) {
    return <ShamazonLoggedInView setLoggedInUser={setLoggedInUser} />
  } else {
    return  <ShamazonVisitorView setLoggedInUser={setLoggedInUser} />
  }
}
