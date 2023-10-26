# Beavs.ai - Backend

## About

This is the backend for the Beavs.ai project. This is where the backend services and api will be.

## Getting Started

### Prerequisites

- [Node.js with npm](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/try/download/community) 
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download) (recommended, but not required)

### Installation

1. Clone the repo

```sh
git clone https://github.com/OSU-App-Club/beavsAI-backend.git
```

2. Change directory into the project
```sh 
cd beavsAI-backend
```

3. Install required dependencies
```sh
npm install
```

4. Get the environment variables

Create a `.env` file in the `/config/` directory under `.env.local` and add the following variables:
```sh
PORT=8080
MONGODB_ACESS=YOUR_MONGODB_ACCESS_STRING
```
*To get the MongoDB access string, direct message @nyumat on the App Development Club Discord!*

Although, you **can** work locally by using mongosh, MongoDB's shell. 

## Usage

### Running the server

```sh
npm run dev
```

Navigate to [http://localhost:8080](http://localhost:8080) (or whatever port is listed in terminal) to see the server running.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

This project is being developed by the [Oregon State University App Development Club](https://osuapp.club)