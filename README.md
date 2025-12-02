<img width="1407" height="735" alt="image" src="https://github.com/user-attachments/assets/4d8fc060-0158-4d12-94d5-5af20e551405" />


# Game Prices Scrapper
A lightweight web application that gathers, updates, and displays game data through automated scraping — built for players, collectors, and curious wanderers of digital worlds.

## What Problem Does It Solve?

Keeping game information updated manually is slow, repetitive, and a little soul-draining.  
This project removes that burden by fetching fresh data automatically, turning chaos into calm.
It grew from a simple frustration — the PSN wishlist limit — and became a personal tool to track my own games without restrictions.

## Project Goal

Provide a simple interface and a dependable backend that scrapes data, stores it, and exposes it cleanly.  
One click, one breath, and the world updates itself.

## Technologies

**Front-end:** ![HTML](https://img.shields.io/badge/HTML-%20?style=for-the-badge&color=orange) ![CSS](https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css&logoColor=white&color=%23214CE5) ![JavaScript](https://img.shields.io/badge/JAVASCRIPT-%20?style=for-the-badge&logo=javascript&logoColor=black&color=%23EFD81E)  
**Back-end:** ![Static Badge](https://img.shields.io/badge/node-%23417E38?style=for-the-badge&logo=node&logoColor=white) ![Static Badge](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white)

## Lessons Learned & Challenges

The journey stitched together patience, debugging, and the quiet poetry of asynchronous code.  
I learned how to orchestrate scraping delays safely, how to keep the UI honest with the user, and how to shape a small but reliable full-stack flow.
I ran into all kinds of obstacles — from connecting the database properly in VS Code to shaping a card layout on the front-end that felt acceptable.
Each issue arrived with its own little storm, but I tackled them one at a time, without panicking (well… almost), and managed to untangle every knot as best as I could.

### Requirements

- Node.js (v18+)
- Make sure the database name and collection used in the code match the ones in your MongoDB setup.
- You must also populate the collection with your own game documents. Each document must include at least a `url` field pointing to the PSN store page of the game.
- An environment variable `MONGO_URI` pointing to your MongoDB connection string

## How to Use

1. Install dependencies on both client and server:

   ```bash
   npm install
   ```
2. Start the development environment:
   ```bash
   npm run dev
   ```

3. Open the app in your browser.

4. Click Update to trigger the scraping process — data updates automatically once everything settles.

---
A web version of this project is hosted on [Render](https://psn-personal-wishlist.onrender.com/).   


## License
![MIT license](https://img.shields.io/badge/License-MIT-%20?link=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fmit%2F)
