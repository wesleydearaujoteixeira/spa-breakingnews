import styled from 'styled-components';



export const ContainerTop = styled.div `
    margin: auto;
    display: flex;
    justify-content: center;
    text-align: center;


    & h1 {
        font-size: 2.5rem;
    }

    & p {
        font-size: 2rem;
        color: #0bade3;
        margin-left: 1rem;
    }

    & img {
        width: 80%;
    }



`

export const LikesComments = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
`