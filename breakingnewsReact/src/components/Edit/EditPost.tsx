import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import styles from '../authenticate/loginStyle.module.css';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";



// Definindo o esquema de validação com Zod
const schema = z.object({
  title: z.string().min(0, 'Titulo n pode esta em branco'),
  text: z.string().min(0, 'Não pode enviar em branco'),
  banner: z.string().min(0, 'Envie seu banner'),
});

type FormInputs = z.infer<typeof schema>;

export function EditPost() {


  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });


  const {id} = useParams();

  const onSubmit: SubmitHandler <FormInputs> = async (data) => {

    try {
      const response = await axios.patch(`https://api-breakingnews-s97m.onrender.com/news/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Post editado');
      console.log(response.data);
      return response.data;
      

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
          <label htmlFor="email"> Titulo: </label>
          <input
            type="text"
            id="email"
            {...register('title')}
          />

          {errors.title && <p className={styles.error}> {errors.title.message} </p>}
          <label htmlFor="password"> text:</label>
          <textarea
            id="password"
            cols={30}
            rows={20}
            {...register('text')}
          />
          {errors.banner && <p className={styles.error}> {errors.banner.message} </p>}


          <label htmlFor="email"> Banner: </label>
          <input
            type="text"
            id="email"
            {...register('banner')}
          />
          
          {errors.banner && <p className={styles.error}> {errors.banner.message} </p>}


        <button type="submit"> Salvar </button>

      </form>
    </main>
  );
}
