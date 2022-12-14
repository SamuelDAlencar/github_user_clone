import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Repository from '../../components/Repository';
import UserContext from '../../contexts/UserContext';
import fetchRepos from '../../utils/fetchRepos';
import fetchUser from '../../utils/fetchUser';
import './index.css';

export default function User() {
  const { user, setUser } = useContext(UserContext);

  const [repositories, setRepositories] = useState();
  const [userName] = useState(
    window.location.pathname.split('/')[2]
  );

  const navigate = useNavigate();

  const getUser = async () => {
    // Verifica se o usuário entrou na página do perfil diretamente pela URL da página
    if (!user) {
      const user = await fetchUser(userName);

      // Caso este perfil não exista, o usuário é redirecionado a tela inicial para pesquisar um perfil válido
      if (!user) {
        navigate('/');
      }

      setUser(user.data);
    }
  };

  const getRepos = async () => {
    const repositories = await fetchRepos(userName);

    setRepositories(repositories.data);
  };

  useEffect(() => {
    getUser();
    getRepos();
  }, []);

  return (
    // Somente renderiza as informações quando todo o conteúdo do perfil for carregado
    user && (
      <main className='user_main' data-testid='user_main_page'>
        <header className='user_header' data-testid='user_header'>
          <h3 className='user_header_h3' data-testid='user_header_h3'>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="user_header_svg">
              <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
            </svg>
            Repositories
          </h3>
        </header>

        <section className='user_profile_section' data-testid='user_profile_section'>
          <img
            alt='Profile_thumb'
            src={user.avatar_url}
            className='user_thumb_img'
            data-testid='user_profile_thumb'
          />
          <h1 className='user_name_h1' data-testid='user_profile_name'>{user.name}</h1>
          <p className='user_username_p' data-testid='user_profile_login'>{user.login}</p>
          <button className='user_follow_button'>Follow</button>
          <p className='user_bio_p' data-testid='user_profile_bio'>{user.bio}</p>
          <section className='user_follow_section'>
            {/*
            -> TODOS os SVGs utilizados nesta página foram retirados diretamente do Github
          */}
            <svg className='user_profile_svg' text="muted" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
              <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
            </svg>
            <p
              className='user_follow_p'
              data-testid='user_profile_followers'
            >
              <b>{user.followers}</b> followers
            </p>
            <span>&nbsp;·&nbsp;</span>
            <p
              className='user_follow_p'
              data-testid='user_profile_following'
            >
              <b>{user.following}</b> following
            </p>
          </section>
          {user.blog && (
            <section className='user_blog_section'>
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="user_profile_svg">
                <path fillRule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
              </svg>
              <a href={user.blog} className='user_blog_p'>
                {user.blog}
              </a>
            </section>
          )}
          {user.company && (
            <section className='user_blog_section'>
              <svg className="user_profile_svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path></svg>
              <a href={user.company} className='user_blog_p'>
                {user.company}
              </a>
            </section>)}
          {user.location && (
            <section className='user_blog_section'>
              <svg className="user_profile_svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
              <a href={user.location} className='user_blog_p'>
                {user.location}
              </a>
            </section>)}
          {user.email && (
            <section className='user_blog_section'>
              <svg className="user_profile_svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg>
              <a href={user.email} className='user_blog_p'>
                {user.email}
              </a>
            </section>)}
        </section>

        <section 
          className='user_reps_section'
          data-testid='user_reps_section'
        >
          {repositories
            && repositories.map((repository) => {
              return <Repository
                key={repository.id}
                repository={repository}
              />;
            })}
        </section>
      </main>
    )
  );
}
