// import { config } from "../config.env";

// export async function getToken(username, password) {

//     try {

//         const response = await fetch(config.AUTH_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: new URLSearchParams({
//                 grant_type: config.GRANT_TYPE,
//                 client_id: config.CLIENT_ID,
//                 client_secret: config.CLIENT_SECRET,
//                 username: username,
//                 password: password
//             })
//         });

//         if (!response.ok) {
//             console.log('Não foi possível obter token de acesso.');
//             return null;
//         }

//         const responseBody = await response.json();
//         const accessToken = await responseBody.access_token;
//         return accessToken;

//     } catch (error) {
//         console.error('Erro ao obter o token:', error);
//         return null;
//     }
// }