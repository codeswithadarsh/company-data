# Company Data Web Application

A web application that provides access to company data with a login mechanism, a user interface for viewing data, and backend support for data processing and storage.

## Overview

This project consists of a frontend and backend application that allows users to log in, view company data in a paginated table, and search across multiple columns. The data is stored in MongoDB and served through an Express.js server.

## Features

- **Login Page**: Allows users to log in with a username and password.
- **Home Page**: Displays company data in a table with pagination, sorting, and filtering capabilities.
- **Search Functionality**: Search across all columns in the data table.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
2. **Install Dependencies:**
   ```bash
   npm install
3. **Configure MongoDB:**
  Replace the MongoDB connection string in server.js and importData.js with your own MongoDB connection string.

### Setting Up the Database

1. **Seed the Database:**
   ```bash
   node seedUser.js
### Running the Application
1. **Start the Server:**
    ```bash
    node server.js
2. **Access the Application:**
Open your browser and go to http://localhost:3000.


