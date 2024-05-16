# NBA Team Tracker

NBA Team Tracker is a personal portfolio project built using Next.js and Tailwind CSS, and it utilizes the ESPN API to fetch NBA data. This project allows users to select their favorite NBA team and view up-to-date information including the team's record, standings, and schedule.

## Features

-   **Pick Your Favorite Team**: Users can choose their favorite NBA team to track.
-   **View Team Record**: Displays the current record (wins and losses) of the selected team.
-   **Check Standings**: See how the selected team ranks in their conference and division.
-   **Upcoming Schedule**: Users can view the upcoming games for their favorite team, including dates and opponents.

## Technologies Used

-   **[Next.js](https://nextjs.org/)**: A React framework for building server-side rendering and static web applications.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.
-   **[ESPN API](https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams)**: Provides access to current NBA team and game data (Note: the ESPN API is a public hidden API; you can see more info **HERE(https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b)**).

## Prerequisites

Before you can run this project, you will need:

-   Node.js (at least v18.x)
-   npm (or yarn)

## Installation

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone git@github.com:your-username/nextjs13-sa-spurs.git
    cd nextjs13-sa-spurs

    ```

2. Install the required dependencies:

    ```bash
    npm install
    # or
    yarn install

    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

Navigate to http://localhost:3000 in your browser to see the application in action.
