import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`
;

export const InputSpace = styled.div`

    position: relative;
    width: 250px;
    margin-left: 5px;
    display: flex;
    align-items: center;

    input {
        outline: none;
        font-size: 1rem;
        padding: 0.6rem;
        background-color: #f5f5f5;
        border: none;
        width: 100%;
        border-radius: 0.3rem;

        &:focus {
            border: 1px solid #0bade3;
        }
    }

`



export const ImageLogo = styled.img `
    width: 8rem;
    height: 3.5rem;
    object-fit: cover;
    cursor: pointer;
`


export const Button = styled.button`
    background-color: #0bade3;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    color: #fff;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 0.3rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 120px;
    font-weight: 500;
    letter-spacing: 0.1rem;

  &:hover {
    background: #0786cc;
  }`;
