import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api"

export const AuthContext = createContext({});
function AuthProvider({ children }){
  const [data, setData] = useState({});
  //Funcao de autenticacao
  async function signIn({email, password}){
    try {
      const response = await api.post('/sessions', {email, password});
      const { user, token } = response.data;
      
      localStorage.setItem("@rocketnoes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnoes:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setData({user, token});


    } catch (error){
      if(error.response){
        alert(error.response.data.message)
      }
     else {
      alert("Nao foi possivel entrar")
      }
    }
  }

  function signOut(){
    const token = localStorage.removeItem("@rocketnoes:token");
    const user = localStorage.removeItem("@rocketnoes:user");

    setData({});
    //Retornando o estado vazio para refletir nas rotas que automaticamente mudando o estado e vai levar para o authroutes

  }

  async function updateProfile({user, avatarFile}){
    try {
      
      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append('avatar', avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnoes:user", JSON.stringify(user));
      setData({user, token: data.token});
      alert("Perfil atualizado com sucesso");

    } catch (error){
      if(error.response){
        alert(error.response.data.message)
      }
     else {
      alert("Nao foi possivel atualizar o perfil")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnoes:token");
    const user = localStorage.getItem("@rocketnoes:user");

    if(token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      })
    }
  },[])

  return(
    <AuthContext.Provider value={{ signIn, signOut,updateProfile, user: data.user }}>
      {children}
    </AuthContext.Provider>

  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth};