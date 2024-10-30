# Microgames

**Version:** 0.0.1

Microgames è un progetto frontend basato su Angular, progettato per offrire un'esperienza di gioco online interattiva e responsiva. L'applicazione sfrutta una varietà di componenti di design per offrire un'interfaccia utente intuitiva e un layout elegante. Inoltre, l'applicazione è distribuita tramite Firebase per garantire stabilità e prestazioni elevate.

## 🛠️ Getting Started

To get started with the Microgames project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Angular CLI](https://angular.io/cli) (install using `npm install -g @angular/cli`)
- [Firebase CLI](https://firebase.google.com/docs/cli) (optional, for deployment)

### Clone the Repository

1. Open your terminal.
2. Clone the repository using the following command:

   ```bash
   git clone https://github.com/your-username/microgames.git
   ```

3. Navigate into the project directory:

   ```bash
    cd microgames
   ```

4. Switch to the `front-dev` branch:

   ```bash
   git checkout front-dev
   ```

5. Install the required dependencies by running:

   ```bash
   npm install
   ```

6. Finally, you can start the application locally with the following command:

   ```bash
   ng serve
   ```

The application will be accessible at http://localhost:4200/.

## 🚀 Technologies Used

### Frontend
Microgames utilizza **Angular**, uno dei più popolari framework per applicazioni frontend, che permette di costruire interfacce reattive e ben organizzate.

- **@angular/core** - Il cuore dell'applicazione Angular, utilizzato per gestire componenti e servizi.
- **@angular/router** - Utilizzato per la gestione della navigazione e delle rotte all'interno dell'app.
- **@angular/forms** - Fornisce supporto per moduli reattivi e template-driven.

### UI Components
Per migliorare l'interfaccia utente, Microgames integra diverse librerie UI:

- **@angular/material** - Fornisce componenti UI moderni e di facile personalizzazione.
- **@ng-bootstrap/ng-bootstrap** - Una serie di componenti Bootstrap adattati per Angular.
- **ngx-bootstrap** - Libreria aggiuntiva di componenti Bootstrap.
- **material-design-icons-iconfont** - Icone basate sul Material Design di Google per uno stile visivo accattivante.

### Charting & Data Visualization
L'applicazione include grafici interattivi per rappresentare i dati di gioco in modo visivo e coinvolgente:

- **ng-apexcharts** - Libreria per visualizzare grafici e dati, che permette di creare grafici dinamici e responsivi.

### Styling
- **Bootstrap** - Utilizzato per la creazione di un layout responsivo e facile da usare.
- **@angular/cdk** - Fornisce una serie di componenti e strumenti UI avanzati per migliorare l'accessibilità e l'interattività dell'applicazione.

### Animations & Interactions
- **@angular/animations** - Utilizzato per aggiungere animazioni fluide e transizioni.
- **sweetalert2** - Libreria per notifiche e popup di avviso interattivi.

### State Management & Utilities
- **rxjs** - Libreria per la gestione delle reattività e degli stream di dati.
- **zone.js** - Gestione delle zone per mantenere Angular reattivo e aggiornato.

### Development Tools
- **Karma e Jasmine** - Utilizzati per i test unitari e di integrazione.
- **TypeScript** - Linguaggio di programmazione utilizzato per sviluppare applicazioni Angular, con un typing forte per una manutenzione del codice più semplice.

## 🌐 Deployment

L'applicazione è distribuita tramite **Firebase**, una piattaforma che offre una distribuzione rapida e affidabile per le applicazioni frontend.
