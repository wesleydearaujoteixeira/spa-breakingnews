import styled from 'styled-components';


export const CardSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background-color: white;
    box-shadow: 2px 2px 3px rgba(0,0, 0, 0.9);
    padding: 2rem;
    border-radius: 8px;
`;


export const CardBody = styled.article `
    display: flex;
    justify-content: center;
    align-items: center;


    img {
        width: 15rem;
        height: auto;
        object-fit: cover;
        border-radius: 0.3rem;
    }

`