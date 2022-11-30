import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import qs from "qs";
import { Navigate, useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://finances-env.eba-mejtkmtj.sa-east-1.elasticbeanstalk.com",
});

export async function signIn(username: any, password: any) {
  try {
    const response = await api.post(
      "/oauth/token",

      qs.stringify({ grant_type: "password", username, password }),

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: "admin",
          password: "admin",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    setCookie(undefined, "authorization_token", access_token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "refresh_token", refresh_token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return;
  } catch (err) {
    destroyCookie(undefined, "authorization_token");
    destroyCookie(undefined, "refresh_token");
    console.log(err);
  }
}

export async function userRegister(username, password) {
  try {
    const response = await api.post("/users", {
      username,
      password,
    });
    alert("Sucesso ao registrar o usuário !");
  } catch (err) {
    alert("Não foi possível registrar o usuário !");
    return console.log(err);
  }
}

export async function valueRegister(identificator, value, expend) {
  const cookie = parseCookies(undefined, "authorization_token");

  const response = await api.post(
    "/financials",
    { identificator, value, expend },
    {
      headers: { Authorization: `Bearer ${cookie.authorization_token}` },
    }
  );
}

