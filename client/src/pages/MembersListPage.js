import React, { useState, useEffect }  from 'react';
import MembersList from '../components/MembersList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const MembersListPage = ({ match }) => {

    const [members, setMembersList] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`/api/members`);
            const body = await result.json();
            setMembersList(body);
            console.log(body);
        }
        fetchData();
        
    }, []);

    return(
        <>
            <Container>
                <h1 className="pageHeader" >Members</h1>
                <Grid container spacing={2} >
                    <MembersList members={members}/>
                </Grid>
            </Container>
        </>
    )
}




export default MembersListPage;