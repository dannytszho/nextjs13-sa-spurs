# NBA Team Tracker

NBA Team Tracker is a personal portfolio project built using Next.js and Tailwind CSS, and it utilizes the ESPN API to fetch NBA data. This project allows users to select their favorite NBA team and view up-to-date information including the team's record, standings, and schedule.

## Demo

Here is a quick look at the NBA Team Tracker in action:

![Demo of NBA Team Tracker](assets/demo.png)

## Features

-   **Pick Your Favorite Team**: Users can choose their favorite NBA team to track.
-   **View Team Record**: Displays the current record (wins and losses) of the selected team.
-   **Check Standings**: See how the selected team ranks in their conference and division.
-   **Upcoming Schedule**: Users can view the upcoming games for their favorite team, including dates and opponents.

## Technologies Used

-   **[Next.js](https://nextjs.org/)**: A React framework for building server-side rendering and static web applications.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.
-   **[ESPN API](https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams)**: Provides access to current NBA team and game data (Note: the ESPN API is a public hidden API; you can see more info **[HERE](https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b)**).

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

## Usage

After installing the project, you can use it as follows:

1. Select a Team: Use the dropdown menu to pick your favorite NBA team.
2. View Data: After selecting a team, the dashboard will update to show the team's record, standings, and upcoming schedule.

Here is a brief overview of the main parts of the application:

-   Homepage: Contains a team selector.
-   Team Dashboard: Displays the selected team's record, standings, and schedule.

## Contributing

Contributions are welcome, and any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

## Acknowledgments

-   **[Next.js Documentation](https://nextjs.org/docs)**
-   **[Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)**
-   **[ESPN API Info](https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b)**
