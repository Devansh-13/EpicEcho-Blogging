import { useState , useContext} from "react";
import {API} from "../../service/api.js"
import { DataContext } from "../../context/DataProvider.jsx";
import {useNavigate} from "react-router-dom";


import {Box,styled,TextField,Button,Typography} from "@mui/material";

const Component=styled(Box)`
  width:400px;
  margin:auto;
  box-shadow:2px 4px 4px 1px #878787;
  display:flex;
  flex-direction:column;
` 
const Image=styled("img")({
  height:200,
  width:200,
  margin:"0px auto 0 auto",
 
  display:"block"

})


const Wrapper =styled(Box)`
  display:flex;
  padding:30px 35px;
  display:flex;
  flex-direction:column;
  text-align:center;
  & > div,& > button,& > p{
    margin-top:20px;
  }
`
const LoginButton=styled(Button)`
  text-transform:none;
  height:40px;
  box-shadow:0 2px 4px 0 #878787
`
const SignUpButton = styled(Button)`
  text-transform:none;
  height:40px;
  border-radius:2px;
  box-shadow:0 2px 4px 0 #878787
`

const Error=styled(Typography)`
font-size:10px;
color:red;
line-height:0;
margin-top:10px;
font-weight:bold;
`
const Text=styled(Typography)`
  color:#878787;
  font-size:15px;
`

const signupInitials={
  name:"",
  username:"",
  password:""
}
const loginInitials={
  username:"",
  password:""
}

const Login=( {isUserAuthenticated })=>{
    
    const imgUrl="https://th.bing.com/th/id/R.871e64298c23c6552492148fb0d74109?rik=h%2bLwFa3tRH0exg&riu=http%3a%2f%2fwww.e-rain.com%2fwp-content%2fuploads%2f2014%2f07%2fBlog-Creation-Blogging-Writing.jpg&ehk=Xm38iLEZZe8P1YyWxz%2bepuemcosboAC6V7DwVR8xHv8%3d&risl=&pid=ImgRaw&r=0"

    const [account,toggleAccount]=useState("login");
    const [signup,setSignup]=useState(signupInitials);
    const [login,setLogin]=useState(loginInitials);
    const [error,setError]=useState("");

    const {setAccount} = useContext(DataContext);
    const navigate=useNavigate();//customHook

    const toggleSignup=()=>{
        account==="login" ? toggleAccount("signup") :  toggleAccount("login");
    }

    const onInputChange=(e)=>{
      setSignup({...signup,[e.target.name]:e.target.value});
    }
    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }

    const signupUser= async ()=>{
      let response = await API.userSignup(signup);
      
      if(response.isSuccess){
        setSignup(signupInitials);
        toggleAccount("login");
      }
      else{
        setError("Something went wrong! Please try again later ")
      }
    }


    const loginUser=async ()=>{
      let res=await API.userLogin(login);
      if(res.isSuccess){
        setError('');
        sessionStorage.setItem('accesstoken',`Bearer ${res.data.accessToken}`);
        sessionStorage.setItem('refreshtoken',`Bearer ${res.data.refreshToken}`);
        //contextAPI react is used to store the name and username as they are to be used evrywhere globally
        // name
        // username
        setAccount({username:res.data.username , name:res.data.name})

        isUserAuthenticated(true);

        navigate('/');
      }
      else{
        setError("Something went wrong! Please try again later ")
      }

    }
    return (
    
    <Component>
        <Box>
          <Image
            src={imgUrl}
            alt=""
          />
          {
            account==="login" ?
            <Wrapper>
                <TextField onChange={(e)=>onValueChange(e)} value={login.username} name="username" label="Enter Username" variant="standard" />
                <TextField  onChange={(e)=>onValueChange(e)} value={login.password} name="password" label="Enter Password" variant="standard" />
                {error && <Error>{error}</Error>}
                <LoginButton onClick={()=>{loginUser()}} variant="contained" >Login</LoginButton>
                <Text>OR</Text>
                <SignUpButton onClick={()=>toggleSignup()} variant="text">Create an account</SignUpButton>
            </Wrapper> 
            :
            <Wrapper>
                <TextField name="name" label="Enter Name" onChange={(e)=>{
                  onInputChange(e);
                }} variant="standard" />
                <TextField name="username" label="Enter Username" onChange={(e)=>{
                  onInputChange(e);
                }} variant="standard" />
                <TextField name="password" label="Enter Password" onChange={(e)=>{
                  onInputChange(e);
                }} variant="standard" />

                {error && <Error>{error}</Error>}
                <SignUpButton onClick={()=>signupUser()} variant="text">Signup</SignUpButton>
                <Text>OR</Text>
                <LoginButton onClick={()=>toggleSignup()} variant="contained">Already have an account</LoginButton>
            </Wrapper>
            }
        </Box>
       </Component>
   
  );
}

export default Login;
