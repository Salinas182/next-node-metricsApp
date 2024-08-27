# next-node-metricsApp

## How to get started

### Environment variables
A '.env' file must be created inside the 'backend' and 'frontend' folders. The first one must contain values for the front-end url ('FRONT'), the port the server is going to use ('PORT'), as well as your MongoDB credentials for the database -user and password-('MONGODB_USER' and 'MONGODB_PWD'), so it should look like this:

`PORT=5000`

`FRONT=http://localhost:3000`

`MONGODB_USER=yourUserHere`

`MONGODB_PWD=yourPasswordHere`


The frontend '.env' file only must contain the back-end url ('NEXT_PUBLIC_SERVER'), so your file should be like this:

`NEXT_PUBLIC_SERVER=http://localhost:5000`

In order to have the app running, the following script must be run from both 'backend' and 'frontend' directories:

```bash
npm install
```

Installs all the necessary dependencies for the app to run correctly.

### Backend necessary scripts

Once you have installed the necessary dependencies in the previous step, you will just need to run:

```bash
npm run start
```

This will get the server up and running for you.

### Frontend necessary scripts

```bash
npm run dev
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Other frontend available scripts

```bash
npm run test
```

Runs all the existing tests.

```bash
npm run test:watch
```

Runs the existing tests in watch mode.

```bash
npm run lint
```

Runs ESLint on the project.

### Production mode

```bash
npm run install
```

Installs all the necessary dependencies for the app to run correctly.

```bash
npm run build
```

Compiles and prepares your project for production deployment, optimizing code and resources.

```bash
npm run start
```

Runs the app in production mode. You must previously build your app.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Feedback

---

### Improvement possibilities

If this project was going to grow in time, some improvements could be made, for instance: 
- Give the user the chance to register and login.
- Save metrics by user.
- Display and filter metrics by user.
- Add pagination to display the data. In this case, since we are dealing with only a few examples, there was no need but, if we were to handle hundreds of metrics, pagination would be a must.
- Create more tests, as only some were added as samples.
- Add i18n to support different languages.

### Technical decisions taken and reasons

- Since I am not familiar with Ruby -although I would like to learn it- and I did not want to take the risk and run out of time for the challenge, I have decided to use Node for the back-end.
- I decided to make use of the Adapter Pattern to encapsulate the API calls. In this way, if I wanted to use an alternative to Axios for HTTP calls, that would not be a challenge or break the app, only the adapter would need to be modified. 
- I have tried to create as many components as it made sense in order to make the app scalable and make the views have as less logic inside as possible.
- When the user saves a new metric, instead of redirecting them to the main view, I have decided to just clear the fields and put the focus on the first one, giving them the chance to keep saving more metrics. I did this since, in case they needed to save huge amounts of data, being redirected and having to go back to the "add" view would not be a pleasant experience for them at all.
- I have added the following packages: Axios -for HTTP calls- and React Hot Toast for the alerts, as I felt that would improve the user experience.
- I have added the following extras, as I thought they would add value to the final solution:
1) A spinner component to improve the user experience when data is loading.
2) Alerts to let the user know when the data has been saved or deleted.
3) Custom hooks to manage the loading times and the form fields validation -to avoid empty fields-.
4) Possibility to edit and delete existing metrics. As mistakes could be made when typing new data, I thought this would be a nice extra.
5) Filters to display averages, giving the user the chance to only display the averages they wish to see or all of it.
6) Different designs depending on the kind of device.

---

