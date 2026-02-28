# README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start the app

1. Clone the repository
2. In the project directory, run:

    #### `npm install`

    to download the dependencies
3. Set the `.env` file variables
4. Run: 

    #### `npm start`

    to run the app in the development mode
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

## Features

### Login

You can login with email and password:

![Login with email](./site/login_email.png)

or with Google:
![Login with Google](./site/login_google1.png)
![Login with Google](./site/login_google2.png)

### Home page
Here, you can see a catalog of songs uploaded on the site:
![Home page](./site/home.png)

When you click on a song, it'll take you to a page filled with similar songs recommended by other users. Let's click on "Your Melody" by Piana.

### Song page
On this page, you can like, dislike, or star other users' song recommendations. The recommendations appear based on the number of likes.

![Song page](./site/song_page.png)

#### Post a song recommendation

Here, you can recommend songs that you think are similar:
<br><br>
<b>Before</b>
<br>
![Recommend song: before](./site/song_rec1.png)

<b>After</b>
<br>
![Recommend song: after](./site/song_rec2.png)

#### Delete a song recommendation
Of course, you can also delete posts you've created:
<br><br>
<b>Before</b>
<br>
![Delete post: before](./site/song_rec2.png)

<b>After deleting "Heartbreaker" by Lily May</b>
<br>
![Delete post: after](./site/delete_post.png)

### Profile
On your profile, you can view the songs you've

#### Posted:
![Posts](./site/posts.png)

#### Liked:
![Likes](./site/likes.png)

#### Starred:
![Stars](./site/stars.png)
