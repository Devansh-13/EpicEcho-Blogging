import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { addElipsis } from "../../../utils/commonUtils";

const Container=styled(Box)`
border:1px solid #d3cede;
border-radius:10px;
margin:10px;
height:350px;
display:flex;
align-items:center;
flex-direction:column;
& > p{
    padding:0 5px 5px 5px;

}
`

const Image=styled("img")({
    width:"100%",
    borderRadius:"10px 10px 0 0",
    objectFit:"contain",
    height:150

})

const Text=styled(Typography)`
color:#878787;
font-size:12px;
`

const Heading=styled(Typography)   `
font-size:18px;
font-weight:600;
`

const Details=styled(Typography)   `
font-size:14px;
word-break:break-word;

`

const Post=({post})=>{
    
    const url=post.picture ? post.picture:"https://th.bing.com/th/id/R.871e64298c23c6552492148fb0d74109?rik=h%2bLwFa3tRH0exg&riu=http%3a%2f%2fwww.e-rain.com%2fwp-content%2fuploads%2f2014%2f07%2fBlog-Creation-Blogging-Writing.jpg&ehk=Xm38iLEZZe8P1YyWxz%2bepuemcosboAC6V7DwVR8xHv8%3d&risl=&pid=ImgRaw&r=0"
    return (
        <Container>
            <Image src={url} alt="post"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.description,20)}</Details>

        </Container>
    )
}
export default Post;