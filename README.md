# Curaelis – Code-Review-Leitfaden

Diese README ordnet die Anforderungen des Abschlussprojekts direkt den entsprechenden Stellen im Code zu. Die Links zeigen auf Dateien und – soweit sinnvoll – auf die jeweilige Zeile.

## 1. Mindestens drei Seiten und Navigation mit React Router

Zeige:

- [main.jsx (Zeile 3)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/main.jsx:3)
  Dort wird `BrowserRouter` eingebunden.
- [App.jsx (Zeile 36)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/App.jsx:36)
  Dort stehen die `Route`-Einträge.

Beispiele:

```jsx
<Route path="/medikamente" element={<MedicationsPage />} />
<Route path="/medikamente/:id" element={<MedicationDetailPage />} />
```

Das kannst du sagen:

> Mit React Router werden verschiedene URLs bestimmten React-Seiten zugeordnet. `:id` ist ein dynamischer Parameter für die Detailansicht.

Zusätzliche Seiten sind unter anderem:

- Startseite
- Medikamentenübersicht
- Medikamenten-Detailseite
- Meine Medikamente
- Gesundheitstagebuch
- Notfallhilfe
- Login und Registrierung
- Mein Konto
- Impressum und Datenschutz

## 2. Master- und Detailansicht

Masteransicht:

[MedicationsPage.jsx (Zeile 15)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/MedicationsPage.jsx:15)

Dort werden Medikamente gefiltert und als Grid angezeigt:

```jsx
{filteredMedications.map((medication) => (
  <MedicationCard
    key={medication.id}
    medication={medication}
  />
))}
```

Detailansicht:

[MedicationDetailPage.jsx (Zeile 7)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/MedicationDetailPage.jsx:7)

Dort wird die ID aus der URL gelesen:

```jsx
const { id } = useParams();
```

Das kannst du sagen:

> Die Medikamentenübersicht ist meine Masteransicht. Wenn man auf „Mehr erfahren“ klickt, wird die ID des Medikaments an die Detailseite übergeben.

## 3. Mindestens fünf wiederverwendbare Komponenten

Beispiele:

- [Header.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/Header.jsx)
- [Footer.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/Footer.jsx)
- [MedicationCard.jsx (Zeile 5)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/MedicationCard.jsx:5)
- [MedicationSearch.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/MedicationSearch.jsx)
- [MedicationCategoryFilter.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/MedicationCategoryFilter.jsx)
- [SafetyNotice.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/SafetyNotice.jsx)
- [PasswordField.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/PasswordField.jsx)
- [BackButton.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/BackButton.jsx)

Das kannst du sagen:

> Ich habe wiederverwendbare Komponenten erstellt, damit gleiche Benutzeroberflächen nicht mehrfach kopiert werden müssen. Die Komponenten erhalten ihre Daten über Props.

Beispiel:

```jsx
function MedicationCard({ medication }) {
```

## 4. Eigener Custom Hook

Wichtigste Datei:

[useUserMedications.js (Zeile 14)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useUserMedications.js:14)

Der Hook übernimmt:

- persönliche Medikamente laden
- Medikamente hinzufügen
- Medikamente bearbeiten
- Medikamente löschen
- Firebase-Verbindung
- Authentifizierung prüfen

Das kannst du sagen:

> Mein eigener Hook kapselt die komplette Logik für persönliche Medikamente. Dadurch bleibt die Seite übersichtlich und dieselbe Logik könnte wiederverwendet werden.

Weitere Hooks:

- [useHealthEntries.js](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useHealthEntries.js)
- [useEmergencyProfile.js](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useEmergencyProfile.js)
- [useMedications.js](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useMedications.js)
- [useLanguage.js](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useLanguage.js)
- [useDeleteAccount.js](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useDeleteAccount.js)

## 5. Formular mit Validierung

Datei:

[MedicationForm.jsx (Zeile 14)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/MedicationForm.jsx:14)

Die Validierung befindet sich in `handleSubmit`:

```jsx
if (
  cleanedFormData.name.length < 2 ||
  cleanedFormData.category.length < 2 ||
  cleanedFormData.description.length < 5 ||
  cleanedFormData.source.length < 5
) {
```

Das kannst du sagen:

> Vor dem Speichern werden die Eingaben bereinigt und geprüft. Zu kurze oder leere Eingaben werden abgelehnt und es wird eine Fehlermeldung angezeigt.

Auch die Seite „Meine Medikamente“ besitzt Validierung:

[MyMedicationsPage.jsx (Zeile 228)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/MyMedicationsPage.jsx:228)

Dort werden zum Beispiel Uhrzeiten und doppelte Einnahmezeiten geprüft.

## 6. useState

Beispiel:

[MedicationsPage.jsx (Zeile 19)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/MedicationsPage.jsx:19)

```jsx
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("Alle");
```

Das kannst du sagen:

> `useState` speichert veränderliche Daten innerhalb einer Komponente, zum Beispiel den Suchbegriff oder die ausgewählte Kategorie.

## 7. useEffect

Beispiel:

[MedicationProvider.jsx (Zeile 16)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/context/MedicationProvider.jsx:16)

```jsx
useEffect(() => {
  const unsubscribe = onSnapshot(...);

  return unsubscribe;
}, []);
```

Das lädt die Daten aus Firebase und reagiert auf Änderungen.

Das kannst du sagen:

> `useEffect` wird verwendet, um beim Laden der Anwendung eine Verbindung zu Firebase aufzubauen. Der Listener wird beim Verlassen der Komponente wieder beendet.

## 8. useContext

Provider:

[main.jsx (Zeile 17)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/main.jsx:17)

```jsx
<LanguageProvider>
  <MedicationProvider>
    <App />
  </MedicationProvider>
</LanguageProvider>
```

Verwendung:

[useMedications.js (Zeile 4)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useMedications.js:4)

```jsx
const context = useContext(MedicationContext);
```

Das kannst du sagen:

> Mit Context stelle ich gemeinsame Daten wie Medikamente oder Sprache für viele Komponenten bereit, ohne sie durch jede einzelne Komponente als Prop weitergeben zu müssen.

## 9. Datenpersistenz mit Firebase

Öffentliche Medikamente:

[MedicationProvider.jsx (Zeile 45)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/context/MedicationProvider.jsx:45)

```jsx
await addDoc(medicationsCollection, {
  name: newMedication.name,
  category: newMedication.category,
  description: newMedication.description,
  source: newMedication.source,
});
```

Persönliche Medikamente:

[useUserMedications.js (Zeile 70)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/hooks/useUserMedications.js:70)

Die Daten liegen pro Benutzer unter:

```text
users/{userId}/medications
```

Gesundheitswerte liegen unter:

```text
users/{userId}/healthEntries
```

Notfallpass-Angaben liegen unter:

```text
users/{userId}/emergencyProfile/main
```

Zusätzlich wird beispielsweise die Sprache lokal gespeichert:

[LanguageProvider.jsx (Zeile 9)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/context/LanguageProvider.jsx:9)

Das kannst du sagen:

> Ich verwende Firebase Firestore zur dauerhaften Speicherung. Persönliche Daten werden unter der jeweiligen Benutzer-ID gespeichert.

## 10. Sicherheitsregeln

Datei:

[firestore.rules (Zeile 78)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/firestore.rules:78)

Besonders wichtig:

```text
allow create: if isAdmin()
```

Öffentliche Medikamente dürfen nur vom Admin angelegt werden.

Persönliche Medikamente:

```text
allow read: if isOwner(userId);
```

Das bedeutet: Ein Benutzer kann nur seine eigenen Medikamente lesen.

Auch Notfallpass-Angaben werden nur für den jeweiligen Eigentümer freigegeben:

[firestore.rules (Zeile 241)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/firestore.rules:241)

Das kannst du sagen:

> Die Zugriffsprüfung findet nicht nur in der Oberfläche statt, sondern zusätzlich serverseitig über Firestore-Regeln.

## 11. Komponentenbibliothek

In [package.json (Zeile 12)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/package.json:12) steht:

```json
"@chakra-ui/react": "^3.36.1"
```

Beispielhafte Verwendung:

```jsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
```

Das kannst du sagen:

> Für das Design und die Benutzeroberfläche verwende ich die Komponentenbibliothek Chakra UI.

Tailwind wird nicht verwendet, aber Chakra UI erfüllt die Anforderung einer Komponentenbibliothek.

## 12. Deployment mit Vercel

Das Projekt ist bei Vercel veröffentlicht.

Der Produktions-Build wird mit folgendem Script erzeugt:

[package.json (Zeile 7)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/package.json:7)

```json
"build": "vite build"
```

Das kannst du sagen:

> Die Anwendung wird mit Vite gebaut und über Vercel bereitgestellt. Dadurch ist sie online erreichbar.

## 13. Gesundheitstagebuch und PDF-Arztübersicht

Zeige:

- [HealthDiaryPage.jsx (Zeile 85)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/HealthDiaryPage.jsx:85)
- [PDF-Erstellung (Zeile 405)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/HealthDiaryPage.jsx:405)
- [PDF teilen (Zeile 460)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/HealthDiaryPage.jsx:460)
- [E-Mail erstellen (Zeile 501)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/HealthDiaryPage.jsx:501)

Das Gesundheitstagebuch ermöglicht:

- Blutdruck, Blutzucker, Puls, Gewicht, Sauerstoffsättigung und Temperatur speichern
- Beschwerden als Gesundheitseintrag speichern
- Einträge bearbeiten und löschen
- Verläufe pro Bereich anzeigen
- eine Arztübersicht als PDF erzeugen
- die Daten drucken oder an die Mail-App übergeben

Das kannst du sagen:

> Das Gesundheitstagebuch speichert persönliche Messwerte dauerhaft und erzeugt daraus eine übersichtliche Zusammenfassung für eine Arztpraxis.

## 14. Notfallhilfe und privater Notfallpass

Zeige:

- [EmergencyPage.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/EmergencyPage.jsx)
- [EmergencyPass.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/EmergencyPass.jsx)
- [EmergencyContacts.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/EmergencyContacts.jsx)
- [Länder und Notrufnummern](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/data/emergencyCountries.js)

Die Notfallhilfe ist ohne Konto erreichbar. Der persönliche Notfallpass ist dagegen geschützt und zeigt nach Anmeldung:

- persönliche Medikamente
- letzte Gesundheitsmesswerte
- Notfallkontakte
- Allergien
- wichtige Erkrankungen
- Blutgruppe
- besondere Hinweise

Das kannst du sagen:

> Die allgemeine Notfallhilfe kann jeder schnell öffnen. Persönliche Gesundheitsdaten werden dagegen erst nach Anmeldung und einem bewussten Klick auf den Notfallpass angezeigt.

## 15. Barrierefreiheit und mobiles Design

Zeige:

- [AccessibilityControls.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/AccessibilityControls.jsx)
- [Header.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/Header.jsx)
- [MobileBottomNavigation.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/components/MobileBottomNavigation.jsx)
- [App.jsx – semantisches main-Element](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/App.jsx:31)

Umgesetzt sind unter anderem:

- Schriftgröße vergrößern und verkleinern
- hoher Kontrast
- Seite vorlesen
- sichtbare Tastatur-Fokusrahmen
- große, fingerfreundliche Buttons
- aktive Menümarkierung
- responsive Desktop- und Smartphone-Layouts
- automatisch schließendes mobiles Menü
- getrennte Erfolgs- und Fehlermeldungen

## 16. PWA

Zeige:

- [Manifest](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/public/manifest.webmanifest)
- [Service Worker](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/public/medibase-sw.js)
- [Registrierung in main.jsx (Zeile 31)](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/main.jsx:31)
- [Installationsseite](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/pages/InstallPage.jsx)

Das kannst du sagen:

> Die Web-App besitzt ein Manifest und einen Service Worker und kann deshalb über HTTPS zum Startbildschirm eines Smartphones hinzugefügt werden.

Die aktuelle Erinnerungsfunktion läuft, solange die Web-App aktiv ist. Zuverlässige Benachrichtigungen bei vollständig geschlossener App sowie eine Apple-Watch-Version wären spätere native oder Cloud-Erweiterungen.

## 17. Zuordnung zu den vier Projektsprints

- **W1 – Lo-Fi-Prototyp:** erste Entwürfe, Grundstruktur und Seitenaufbau
- **W2 – Navigation:** [main.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/main.jsx) und [App.jsx](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/App.jsx)
- **W3 – Datenpersistenz:** [Firebase](/Users/karstenrabeneck-ketme/Documents/abschlussprojekt-karsten-medibase/src/firebase.js), Context und eigene Hooks
- **W4 – Deployment und Präsentation:** Vite-Build, GitHub, Vercel und Code-Review

## 18. Wichtige Befehle für das Code-Review

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Das kannst du sagen:

> Mit `npm run lint` prüfe ich den Code auf typische Fehler. Mit `npm run build` prüfe ich, ob die Anwendung für die Veröffentlichung erfolgreich gebaut werden kann.

## 19. Kurze Gesamt-Erklärung

> Curaelis ist eine React-Anwendung mit mehreren Seiten und React Router. Die öffentliche Medikamentenübersicht dient als Masteransicht und führt über dynamische IDs zu Detailseiten. Persönliche Daten werden über eigene Hooks in Firebase Firestore gespeichert und durch Firestore-Regeln geschützt. Chakra UI wird für das Design verwendet. Zusätzlich bietet die Anwendung Notfallhilfe, einen privaten Notfallpass, ein Gesundheitstagebuch, PDF-Export, Barrierefreiheit, responsive Darstellung und PWA-Installation. Die Anwendung wird mit Vite gebaut und über Vercel bereitgestellt.
