import { useState, useEffect } from "react";
import { GetProfile } from "../../services/servicesPost";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import styles from './Profille.module.css';

export const Profile = () => {

    type TypeUser = {
        name: string,
        avatar: string,
    }

    const navigate = useNavigate();

    const [user, setUser] = useState <TypeUser> ({
        name: '',
        avatar: '',
    });

    const id = localStorage.getItem('id') || '';

    const LogOut = () => {
      const confirmation = confirm('Are you sure you want to log out');

      if(!confirmation) {
       return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/login');
    alert('Logged out');
        
    }

    useEffect(() => {
        GetProfile(id).then((response) => {
            console.log(response);
            setUser(response.user);
        })
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <Link to='/user'> 
                <img style={{width: '66px', height: '55px',  borderRadius: '100%'}}  src={user.avatar} alt="User Avatar" /> 
            </Link>
            <span className={styles.span}  onClick={() => LogOut()}> <RiLogoutBoxRLine /> </span>
        </div>
    )

}

