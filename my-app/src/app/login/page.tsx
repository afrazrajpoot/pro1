import Header from "@/components/Header"
import LoginForm from "@/components/LoginForm"


const page = () => {
  return (
    <main className="h-[100vh] w-[100vw] flex justify-center items-center  relative">
     <Header title="login page" content="this is login page" />
    <LoginForm />
    </main>
  )
}

export default page
