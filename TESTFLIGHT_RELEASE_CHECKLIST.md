# Curaelis – TestFlight- und Veröffentlichungscheckliste

## Aktueller Stand

- Web-Build: erfolgreich geprüft
- ESLint: erfolgreich geprüft
- Medikamentenkatalog: 100 kuratierte Einträge
- Firebase Authentication und Cloud Firestore: integriert
- Firestore-Regeln: persönliche Daten sind auf den jeweiligen Nutzer beschränkt
- Öffentliche Vorschau: Registrierung und echte Telefonanrufe bleiben deaktiviert
- iOS-Release-Build: Registrierung und Notruffunktion werden nur über den eigenen Release-Befehl aktiviert

## Vor dem Upload auf ein echtes iPhone prüfen

1. Mit einem Testkonto anmelden und E-Mail-Adresse bestätigen.
2. Medikament anlegen, Einnahmezeit speichern und Erinnerung erlauben.
3. App schließen und die Testbenachrichtigung abwarten.
4. Notfallprofil und bis zu drei Kontakte speichern.
5. Notruffunktion nur mit ausdrücklicher Bestätigung testen; keinen echten Notruf auslösen.
6. Prüfen, dass die Kontakt-Nachricht nur vorbereitet wird und manuell gesendet werden muss.
7. Gesundheitswert speichern, PDF erzeugen und E-Mail-Entwurf öffnen.
8. Abmelden, wieder anmelden und prüfen, ob die eigenen Daten erneut geladen werden.

## Befehle für einen iOS-Release-Build

```text
npm run lint
npm run build:ios:release
npm run open:ios
```

In Xcode anschließend das iOS-Gerät beziehungsweise das „Any iOS Device“-Ziel wählen, das Team für die Signierung prüfen und den Build über **Product → Archive** an App Store Connect hochladen. Danach zuerst über TestFlight testen und erst anschließend zur App-Prüfung einreichen.

## Noch nicht Bestandteil dieses Release-Builds

- Apple-In-App-Käufe für eine kostenlose Version mit einmaligem Pro-Freischaltpreis
- automatische VoIP-Anrufe an Angehörige
- automatische SMS ohne manuelle Bestätigung

Wenn Curaelis als kostenlose App mit Pro-Freischaltung erscheinen soll, muss die StoreKit-/Entitlement-Funktion vor der Einreichung separat implementiert und getestet werden. Eine vollständig kostenpflichtige App benötigt dafür keinen In-App-Kauf innerhalb der App.
