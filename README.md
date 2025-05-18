# CareMonitorDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Breakdown of the reasoning behind the key folders:
- **`src/app`**: We've structured it to clearly distinguish between different types of code:
    - **`core`**: This directory houses essential, application-wide services (like our `AuthService` and `MockApiService`), guards (`AuthGuard`)
    
    - **`features`**: This is where we organize our application based on its different functionalities or sections (like `dashboard`, `items`, and `login`). Each feature has its own dedicated folder, containing its components, any specific services it might need, and its own state management if it's more complex (like the `items.store.ts`).
    
    - **`shared`**: This directory contains components (`error-banner`, `spinner`) and layout elements (`header`, `sidenav`) that are used across multiple features. 
    By centralizing these reusable pieces, we ensure consistency in our UI and avoid code duplication.
    
    - The root level of `app` contains the main `AppComponent` and the application-wide routing (`app.routes.ts`).
- **`src/assets`**: This directory is dedicated to storing **static assets** that are part of our application.
    - **`styles`**: This directory contains global or application-wide styling rules and utilities.
    - Organizing global styles into dedicated files like `_mixins.scss` and `_variable.scss` promotes better style management, reusability, and maintainability across the application.
