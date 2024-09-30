# File List Table Component

This project is a reusable list table component that displays file data with options to select files and view them in a modal. It's built with a focus on accessibility, reusability, and testing.

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Installation](#installation)
5. [Running the Project](#running-the-project)
6. [Running Tests](#running-tests)
7. [Running Storybook](#running-storybook)
8. [Technologies Used](#technologies-used)
9. [What's Done](#whats-done)
10. [Accessibility](#accessibility)

## Overview

This project allows users to:

- View a list of files in a table with checkboxes to select them.
- Open a modal to display the selected files.
- Use a "Download Selected" button, which is enabled only when available files are selected.

The table is built as a reusable component, making it flexible enough to use with different data sets. It's designed with accessibility and testing in mind.

## Project Structure

The project is organized like this:
```
src/
├── components/ # Main UI components
│   ├── file-list.tsx # The FileList component using the reusable table
│   ├── modal.tsx # Reusable modal component
│   └── table.tsx # Reusable table component
├── styles/ # SCSS styles
│   ├── \_colors.scss # Color variables
│   ├── \_global.scss # Global styles
│   ├── \_modal.scss # Modal styles
│   ├── \_reset.scss # Normalize styles
│   ├── \_table.scss # Table-specific styles
│   └── custom.scss # Table-specific styles
├── types/ # TypeScript types
│   ├── file-details.ts # FileDetails type
│   └── table.ts # Table columns and props type
├── utils/ # Utility functions
│   └── unique-key-utils.ts # Utility for generating unique row keys
├── tests/ # Unit and accessibility tests
│   ├── accessibility.spec.tsx # Accessibility tests using jest-axe
│   ├── file-list.spec.tsx # Unit tests for FileList component
│   └── table.spec.tsx # Unit tests for Table component
├── app.tsx # Main app file
├── main.tsx # App entry point
└── setupTests.ts # Testing setup (Jest, Testing Library)
└── vite-env.d.ts # TypeScript environment for Vite
```
## Features

- **Reusable Table Component**: A flexible table component that works with various data.
- **Modal for Selected Files**: A modal displays selected files with accessible features.
- **File Selection and Download**: The "Download Selected" button is conditionally enabled based on file availability.
- **Accessibility**: The project follows accessibility best practices.
- **Testing**: Thorough unit tests and accessibility checks are included.
- **Storybook** for interactive component development and documentation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrewstepanets/file-list.git
   ```

2. Move into the project directory:

   ```bash
   cd file-list-table
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

To run the project locally, use:

    ```bash
    npm run dev
    ```

This will start a local development server, and you can view the project at `http://localhost:8080/`.

## Running Tests

This project includes unit tests and accessibility tests. To run the tests:

1. Run all tests using Vitest:

   ```bash
   npm run test
   ```

2. Accessibility tests use `jest-axe`, which can be found in `src/tests/accessibility.spec.tsx`.
   ```bash
   npm run test src/tests/accessibility.spec.tsx
   ```

## Running Storybook

Storybook is used for visualizing and testing individual components in isolation.

1. To run Storybook:

   ```bash
   npm run storybook
   ```

2. Open Storybook at `http://localhost:6006`.

## Technologies Used

The project uses the following technologies:

- **React**: For building the UI components.
- **TypeScript**: For type-safe JavaScript code.
- **Vite**: As a fast build tool and development server.
- **SCSS**: For styling with modular and reusable styles.
- **React Testing Library**: For testing React components.
- **Vitest**: For running unit tests.
- **jest-axe**: For accessibility testing.
- **Storybook**: For component development and documentation
- **ESLint**: For code linting and formatting.

## What's Done

In this project:

- **Reusable Components:**: The table and modal components are designed to be reused. The table is flexible enough to handle various data types.
- **Accessibility:**: Best practices for accessibility were followed, such as using ARIA roles and ensuring the modal is accessible. This was verified with `jest-axe`.
- **Testing:**: Tests cover the table, modal, and file list components, along with accessibility checks.
- **Code Optimization:**: The utility `generateRowKey` is used to create unique row keys, ensuring good performance and avoiding React key warnings.

## Accessibility

This project prioritizes accessibility:

- **ARIA Roles:**: Used for the modal and other interactive elements to ensure screen reader compatibility.
- **Accessible Labels:**: Checkboxes and buttons have clear, screen-reader-friendly labels.
- **Automated Testing:**: Accessibility is tested with jest-axe to ensure compliance with best practices.
