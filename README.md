# Musivo - A Collaborative Music SaaS Platform  

[![Musivo Banner](https://github.com/user-attachments/assets/c9f63d07-3635-4831-836c-3b50d7639d2d)](https://musivo.builtforthis.tech)  

##  Context
- Music plays a key role in social venues - from cafes to pubs - but current systems lack democratic, collaborative music control. 
- Usually, music is controlled by a DJ or a single device, limiting engagement and often ignoring audience preferences. 
- There is an obvious demand for an open, real-time solution that facilitates crowd-driven playlist management. 

## Overview  
Musivo transforms venues into interactive music spaces where crowds democratically control playlists via real-time voting. Hosts create Spotify-powered rooms, guests vote on songs, and the highest-rated tracks play automatically through the host's sound system.  

## Host Requirements
- **Spotify Premium Account Required**  
> To enable music playback through the venue's sound system, the **host/DJ must connect their Spotify Premium account**. This is required by Spotify's terms for public/commercial streaming.

- **Guest Access**  
> Participants only need a smartphone to join the room - **no Spotify account or subscription required**.

## Features

### For Hosts:
- Create music rooms with one-click Spotify integration
- View and manage current queue
- Moderate room and end session anytime
- Real-time sync across participants

### For Participants:
- Join via room code – no login required
- Add your favorite tracks to the queue
- Vote for tracks to decide what plays next
- See song rankings stats, and more

## Screenshots & Live Walkthrough
<p align="center">
  <img src="https://github.com/user-attachments/assets/c9f63d07-3635-4831-836c-3b50d7639d2d" width="700"/>
  <br/>
  <strong>Fig 1: Landing Page – Join or Host</strong>
  
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f923ee77-4936-49a6-9ec7-c05df0daf889" width="700"/>
  <br/>
  <strong>Fig 2: Room Creatiom</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0e423f39-e526-4883-9424-22ef6697d2b2" width="700"/>
  <br/>
  <strong>Fig 3: Spotify - Auth</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f9bf9827-e207-4b45-a27c-2cde4b05d7a2" width="700"/>
  <br/>
  <strong>Fig 4: Spotify Connected</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/41e3e172-1df4-4401-a7e9-ec2ac9485696" width="700"/>
  <br/>
  <strong>Fig 5: Room is Succesfully created & Can be shared to the participants now</strong>
</p>


<p align="center">
  <img src="https://github.com/user-attachments/assets/6aefe278-c7e4-48f4-9a8c-dcc24dc3e071" width="700"/>
  <br/>
  <strong>Fig 6:QR Code of Created Room can be downloaded and is to displayed at the entry of current venue</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/559ab51f-3d0f-4da0-8598-29d64fc14ae9" width="700"/>
  <br/>
  <strong>Fig 7: Adding Songs to Queue using Spotify Integrated Search Bar</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3e9d7a30-be61-46d3-9d54-877e21b12762" width="700"/>
  <br/>
  <strong>Fig 8: Voting feature & Host Controls</strong>
</p>

## How It Works – Event Flow

i. The event **host visits the Musivo platform** and creates a new music room.

ii. A unique **Room ID** and corresponding **QR code** are generated for that session.

iii. The host shares this code at the venue entrance, allowing guests to **scan and join** easily.

iv. Guests use their phones to either **scan the QR code** or **manually enter the Room ID** to access the session.

v. Once inside, all participants are connected in real-time using **WebSockets**, ensuring **live updates** across devices.

vi. Users can **search for songs** by typing keywords like the song **title or artist**, powered by Spotify’s integrated search.

vii. Selected tracks are **added to the shared playlist queue**, which is visible to all members in the room.

viii. Each user can **vote (like) songs** in the queue to express their preference.

ix. The song with the **highest number of votes** is played next through the **host’s Spotify-connected device**.

x. Hosts retain full **playback control** and can also **skip songs** or **clear the queue** if needed.


## Tech Stack

### Frontend
- Next.js (React framework)
- TailwindCSS + ShadCN UI
- TypeScript

### Backend
- WebSocket(Real-time interaction)
- Spotify Web API (Search, metadata, preview links)
- Spotify Web Playback SDK (In-browser music playback)

### Architecture & Worflow
![Architecture](https://github.com/user-attachments/assets/529a27eb-4fd9-40fb-a696-1de6e97ebcc8)
![Workflow](https://github.com/user-attachments/assets/a113601e-f7cd-4d94-902a-347f6bb2193e)


## Local Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/saivaraprasadmandala/Musivo.git
   cd musivo
   cd musivo-backend
   ```

2. **Set up environment variables**:
   - Create `.env` files in both `musivo/` and `musivo-backend/` directories
   - Example `.env` for musivo:
     ```
     NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
     SPOTIFY_CLIENT_SECRET=your_spotify_secret
     NEXT_PUBLIC_WS_URL=ws://localhost:8080
     NEXT_PUBLIC_APP_URL=https://localhost:3000
     NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/callback
     PORT=3000
     ```
   - Example `.env` for musivo-backend:
     ```ini
     NEXT_PUBLIC_WS_URL=ws://localhost:8080
     # Server Configuration
     PORT=3001
     NODE_ENV=development

     # Optional: CORS Configuration
     ALLOWED_ORIGINS=http://localhost:3000,https://localhost:3000
     ```
3. **Install dependencies and start servers**:
   ```bash
   # In one terminal (musivo)
   cd musivo
   npm install
   npm run dev

   # In another terminal (musivo-backend)
   cd musivo-backend
   npm install
   npm run dev
   ```
   
## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

**GitHub Repository**: [https://github.com/saivaraprasadmandala/Musivo](https://github.com/saivaraprasadmandala/Musivo)

⭐ If you found this project useful, consider giving it a star on GitHub!




