
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Banner = styled(Box)`
    background-image: url(https://wallpapercave.com/wp/wp9364145.png);
    height:50vh;
    
    background-size: contain;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Devansh Kumar</Typography>
                <Text variant="h5">As a Developer, I specialize in crafting captivating user interfaces that leave a lasting impression. If you're curious, feel free to explore some of my favorite projects <br />
                Dive in and see the magic firsthand.
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Devansh-13" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Wanna connect with me....
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/devansh-kumar-a19477266/" color="inherit" target="_blank">
                            <LinkedInIcon />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:devansh15091970@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;