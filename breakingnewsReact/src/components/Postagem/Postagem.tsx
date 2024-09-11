import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import styles from '../authenticate/loginStyle.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

// Definindo o esquema de validação com Zod
const schema = z.object({
  title: z.string().min(1, 'Precisa pelo menos um caractere'),
  text: z.string().min(1, 'Digite algo'),
  banner: z.string().min(1, 'Envie seu banner')
});

type FormInputs = z.infer<typeof schema>;

export function Postagem() {
  const navigate = useNavigate();
  const id = localStorage.getItem('id') || '';

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Supondo que você tenha o token armazenado em uma variável ou contexto
      const token = localStorage.getItem('token') || ''; // Substitua por como você obtém o token
  
      const response = await axios.post(
        `https://api-breakingnews-s97m.onrender.com/news/post/${id}`, 
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // Dependendo do tipo de dados que você está enviando
          }
        }
      );
  
      console.log('Resposta da API:', response.data);
      alert('sucesso');
      navigate('/home');
      // Redireciona para a página principal após enviar os dados
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao enviar dados:', error.response?.data);
        alert(`Erro ao enviar dados: ${error.response?.data.message}`);
      } else {
        console.error('Erro inesperado:', error);
        alert('Erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <main className={styles.appContent}>
      <div className={styles.btnComponentBack}>
        <Link to='/home'> <IoArrowBack /> </Link>
      </div>

      <h1>Publique algo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.FormContent}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          {...register('title')}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <label htmlFor="text">Texto:</label>
        <textarea
        
          id="text"
          cols={60}
          rows={30}
          {...register('text')}
        />
        {errors.text && <p className={styles.error}>{errors.text.message}</p>}

        <label htmlFor="banner">Banner:</label>
        <input
          type="text"
          id="banner"
          {...register('banner')}
        />
        {errors.banner && <p className={styles.error}>{errors.banner.message}</p>}

        <button type="submit"> Postar </button>
      </form>
    </main>
  );
}
