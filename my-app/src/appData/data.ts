interface Data {
    name: string;
    course:string
    score:number
  }
  export interface formObj{
    name?:string
    type:string
    placeholder?:string
    value?:string
  }
export  const arr:Data[]=[
    {
      name:'Afraz',
      course:"BSC",
      score:90
    },
    {
      name:'Ali',
      course:"BSC",
      score:9
    },
    {
      name:'Musa',
      course:"BSC",
      score:100
    },
  ]
  export const formData:formObj[] = [
    {
      name:"username",
      type:"text",
      placeholder:"Enter Username"
    },
    {
      name:"password",
      type:"password",
      placeholder:"Enter Passord"
    },
    {
      name:"email",
      type:"email",
      placeholder:"Enter Email Address"
    },
    {
      
      type:"submit",
      value:"Submit"
    },
  ]
 