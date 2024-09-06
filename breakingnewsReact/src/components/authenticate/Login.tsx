import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import styles from './loginStyle.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";



// Definindo o esquema de validação com Zod
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha deve ter pelo menos 1 caractere e não pode ser nula'),
});

type FormInputs = z.infer<typeof schema>;

export function Login() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler <FormInputs> = async (data) => {

    try {
      const response = await axios.post('https://api-breakingnews-s97m.onrender.com/auth/login', data);
      alert(response.data.message);

      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('id', response.data.user.id);
      navigate('/home');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao enviar dados:', error.response?.data);
      } else {
        console.error('Erro inesperado:', error);
      }
    }
  };

  return (
    <main className={styles.appContent}>

        <div className={styles.btnComponentBack} >
            <Link to='/home'> <IoArrowBack /> </Link>
        </div>

        <h1> LOGIN </h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.FormContent}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className={styles.error}> {errors.email.message} </p>}
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <p className={styles.error}> {errors.password.message} </p>}
        <button type="submit"> Enviar </button>
        
        <div className={styles.RegisterContent} >
            <p> Já tem uma conta? </p>
            <Link className={styles.regis} to="/register"> Registre-se </Link>
        </div>

      </form>
    </main>
  );
}
