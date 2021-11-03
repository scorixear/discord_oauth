import express from 'express';
import dotenv from 'dotenv';
import fetch from 'cross-fetch';

dotenv.config();

const app = express();
app.get('/', async ({ query }, res) => {

  const { code }: {code: string} = query as {code: string};

	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.CLIENTID,
					client_secret: process.env.CLIENTSECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${process.env.PORT}`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();
			console.log(oauthData);
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

  return res.sendFile('./src/index.html', {root: '.'});
});

app.listen(process.env.PORT, ()=>console.log(`App listening at http://localhost:${process.env.PORT}`));