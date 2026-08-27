# Curaelis

Curaelis ist eine barrierearme React-Webanwendung für verständliche, allgemeine Informationen über Medikamente und für die persönliche Gesundheitsorganisation.

Die Anwendung dient ausschließlich der allgemeinen Orientierung. Sie ersetzt weder die Packungsbeilage noch die Beratung durch medizinisches Fachpersonal.

## Funktionen

- öffentliche Medikamentenübersicht mit Kategorien und Detailseiten
- Suche nach Medikamentennamen mit Verweis auf die offizielle BfArM-Arzneimitteldatenbank
- persönliche Medikamente mit Einnahmezeiten, Notizen und Erinnerungen
- Anmeldung und Registrierung mit Firebase Authentication
- persönliche Notfallkontakte
- Notfallhilfe mit länderabhängigen Notrufnummern
- privater Curaelis-Notfallpass für angemeldete, verifizierte Benutzer
- persönliche Notfallpass-Angaben: Allergien, wichtige Erkrankungen, Blutgruppe und besondere Hinweise
- Gesundheitstagebuch für Blutdruck, Blutzucker, Puls, Gewicht, Sauerstoffsättigung, Temperatur und Beschwerden
- Verlauf der Messwerte sowie Bearbeiten und Löschen eigener Einträge
- Arztübersicht als PDF, Drucken und Übergabe an die Mail-App
- Sprachumschaltung Deutsch/Englisch und Barrierefreiheitsfunktionen
- responsive Oberfläche für Desktop und Smartphone
- installierbare PWA mit Web-App-Manifest und Service Worker

## Technologien

- React und JavaScript/JSX
- Vite
- React Router DOM
- Chakra UI
- Firebase Authentication und Cloud Firestore
- jsPDF
- Git, GitHub und Vercel

## Projektstruktur

```text
src/
├── components/   Wiederverwendbare UI-Komponenten
├── context/      Globale Zustände, zum Beispiel Sprache und Medikamente
├── data/         Statische Daten, zum Beispiel Länder und Medikamente
├── hooks/        Eigene React Hooks für Firebase und Logik
├── pages/        Seiten der Anwendung
├── App.jsx       Routing und Seitenaufbau
└── main.jsx      React-Einstiegspunkt und PWA-Registrierung
public/
├── manifest.webmanifest
└── medibase-sw.js
firestore.rules  Sicherheitsregeln für Firestore
```

## Voraussetzungen

- Node.js 20 oder neuer
- ein Firebase-Projekt
- optional: Firebase CLI für die Veröffentlichung der Firestore-Regeln

## Projekt lokal starten

```bash
npm install
cp .env.example .env.local
npm run dev
```

Danach ist die lokale Anwendung normalerweise unter `http://localhost:5173` erreichbar.

## Umgebungsvariablen

Die Firebase-Konfiguration wird in `.env.local` eingetragen. Die Datei enthält private Projektkonfiguration und wird nicht in GitHub veröffentlicht.

Benötigte Variablen:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_RECAPTCHA_ENTERPRISE_SITE_KEY=
```

Die Werte kommen aus den Firebase-Projekteinstellungen. Der App-Check-Schlüssel ist optional, wenn App Check im Projekt nicht verwendet wird.

## Firebase einrichten

1. In Firebase Authentication mindestens die benötigten Anmeldeanbieter aktivieren.
2. Eine Firestore-Datenbank anlegen.
3. Die Datei `firestore.rules` verwenden. Öffentliche Medikamente dürfen nur vom festgelegten Administratorkonto angelegt werden; persönliche Daten sind auf den jeweiligen Benutzer beschränkt.
4. Regeln veröffentlichen:

```bash
npx --yes firebase-tools login
npx --yes firebase-tools deploy --only firestore:rules --project medibase-karsten
```

Der Notfallpass und das Gesundheitstagebuch sind private Benutzerdaten. Die Konto-Löschung entfernt die persönlichen Medikamente, Notfallkontakte, Gesundheitseinträge und Notfallpass-Angaben.

## Verfügbare npm-Skripte

```bash
npm run dev      # Entwicklungsserver starten
npm run lint     # Code prüfen
npm run build    # Produktions-Build erstellen
npm run preview  # Produktions-Build lokal ansehen
```

## Deployment mit Vercel

Das GitHub-Repository kann in Vercel importiert werden. In Vercel müssen die gleichen `VITE_...`-Variablen wie in `.env.local` hinterlegt werden. Danach wird bei einem Push auf den verbundenen Branch automatisch neu gebaut.

Alternativ kann die aktuelle Version manuell veröffentlicht werden:

```bash
npx --yes vercel --prod
```

## PWA und Installation

Das Manifest liegt unter `public/manifest.webmanifest`, der Service Worker unter `public/medibase-sw.js`. Über eine HTTPS-Adresse wie die Vercel-App kann die Anwendung im Browser als Web-App zum Startbildschirm hinzugefügt werden.

Die derzeitige Erinnerungsfunktion läuft innerhalb der Web-App. Zuverlässige Benachrichtigungen bei vollständig geschlossener App sowie eine native Apple-Watch-/Android-Watch-Anbindung würden später zusätzliche native oder Cloud-Dienste erfordern.

## Anforderungen des Kurses

- mehrere Seiten und Navigation mit `react-router-dom`
- Masteransichten mit Listen/Grid und Detailansichten
- wiederverwendbare Komponenten in `src/components`
- eigene Hooks, unter anderem `useUserMedications`, `useHealthEntries` und `useEmergencyProfile`
- Formulare mit Validierung
- Verwendung von `useState`, `useEffect` und `useContext`
- Persistenz mit Firebase Firestore und `localStorage`
- Komponentenbibliothek Chakra UI
- Hosting der Anwendung über Vercel
