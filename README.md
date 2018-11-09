# Super Rentals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

## Website:
# https://runionow1.azurewebsites.net

## Documentation:
# https://runionow1-doc.azurewebsites.net

# Build Sequence 

## 1. Build artifacts for application, documentation, API

### 1.1 Build application
    > ng build --prod

### 1.2 Generate Documentation
    > npm run compodoc

### 1.4 Run All commands
    > npm run prep-build

# Docker Sequence

## 2. Build Images

### 2.1 Build App Image
    > docker build -f App.Dockerfile -t ren365/rms-app:latest .

### 2.2 Documentation Image
    > docker build -f Docu.Dockerfile -t ren365/rms-doc:latest .

### 2.3 API Image
    > docker build -f API.Dockerfile -t ren365/rms-api:latest .


# (Todo: configure below)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
