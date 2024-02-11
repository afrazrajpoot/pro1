import Template from "@/animation/Template"
import Header from "@/components/Header"
import Signup from "@/components/Signup"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <>
    <Template>

      <Header title="signup page" content="this is signup page" />
    <main className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <Signup />
    </main> 
    </Template>
    </>
  )
}

export default page
