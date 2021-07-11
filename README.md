# socialschool-app
The app for a social media platform for students.
## Deployment
### Note: Before you can use the app, you will have to deploy the server [socialschool-server](https://github.com/karastift/socialschool-server.git).
(Optional) I would recommend to store the app and the server in the same folder:
```bash
    mkdir socialschool && cd socialschool/
```
Clone the forked repository from GitHub:
```bash
    git clone https://github.com/{your username}/socialschool-app.git app
```
Install the dependencies:
```bash
    cd app/ && yarn
```
Add the needed configurations:
```bash
    mkdir config && cd config && touch SERVER_URL.ts
```
SERVER_URL.ts:
```typescript
    export default 'http://your_endpoint:4000/graphql';
```
You should be ready to run the app with expo now:
```bash
    yarn start
```
