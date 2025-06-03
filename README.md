# Information Retrieval System – Front-end

This is the frontend of an Information Retrieval (IR) system built for IF4042 Information Retrieval course. This project provides an interface for users to interactively run queries, view retrieval results, explore inverted files, and evaluate performance.

## 📸 Interface
![Information Retrieval Result for Interactive Query](https://github.com/arleenchr/IR-System-FE/blob/master/images/screenshot1.png)

![Information Retrieval Result for Batch Query](https://github.com/arleenchr/IR-System-FE/blob/master/images/screenshot2.png)

___

## 🚀 Getting Started

### 1. Cloning the repository

```
git clone https://github.com/arleenchr/IR-System-FE
cd IR-System-FE
```

### 2. Installing dependencies

```
npm install
```

### 3. Setting environment variables

Create an .env file in the root of the project with the back-end API URL:

```
VITE_BACKEND_URL=http://localhost:8080/api
```

### 4. Running the development server

```
npm run dev
```

### 5. Accessing the web app

Open http://localhost:3000 in your browser.
___

## 📦 Backend Repository

You can find the backend implementation here:<br>
🔗 [Backend Repository](https://github.com/AustinPardosi/IR-System-BE)

Make sure the backend is running at the URL specified in your .env file (VITE_BACKEND_URL).

___

## 📄 Documentation

Technical documentation and user manual can be accessed through the full documentation here: [`doc/documentation.pdf`](https://github.com/arleenchr/IR-System-FE/blob/master/doc/documentation.pdf)

___

## 🛠️ Tech Stack

-   NextJS
-   Tailwind CSS
-   TypeScript
-   ShadCN UI
