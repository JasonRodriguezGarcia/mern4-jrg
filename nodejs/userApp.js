import { getUserAddress, getUserEmail, getUserName } from "./userService.js";

for (let index = 1; index <= 5; index++) {
    const userName = await getUserName(index)
    // console.log(userName)
    
    const userEmail = await getUserEmail(index)
    // console.log(userEmail)
    
    const userAddress = JSON.parse((await getUserAddress(index)))
    // console.log(userAddress)

    console.log(`User ${index}: User Name: ${userName}, User Email: ${userEmail}`)
    
}
