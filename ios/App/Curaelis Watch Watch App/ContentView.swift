import Foundation
import SwiftUI
import Combine
import WatchConnectivity

struct WatchMedication: Identifiable, Sendable {
    let id = UUID()
    let name: String
    let dosage: String
    let intakeTimes: [String]
}

struct WatchHealthEntry: Identifiable, Sendable {
    let id = UUID()
    let type: String
    let value: String
    let secondaryValue: String
    let unit: String
    let measuredAt: String
}

final class WatchConnectivityManager: NSObject, ObservableObject, WCSessionDelegate {
    @Published private(set) var medications: [WatchMedication] = []
    @Published private(set) var healthEntries: [WatchHealthEntry] = []
    @Published private(set) var bloodGroup = ""
    @Published private(set) var allergies = ""
    @Published private(set) var conditions = ""
    @Published private(set) var lastUpdate: Date?

    override init() {
        super.init()

        guard WCSession.isSupported() else {
            return
        }

        let session = WCSession.default
        session.delegate = self
        session.activate()
    }

    func session(
        _ session: WCSession,
        activationDidCompleteWith activationState: WCSessionActivationState,
        error: Error?
    ) {
        if let error = error {
            print("WatchConnectivity-Fehler: \(error.localizedDescription)")
        }
    }

    func session(
        _ session: WCSession,
        didReceiveApplicationContext applicationContext: [String: Any]
    ) {
        let receivedMedications = (
            applicationContext["medications"] as? [[String: Any]] ?? []
        ).map { medication in
            WatchMedication(
                name: Self.stringValue(medication["name"]),
                dosage: Self.stringValue(medication["dosage"]),
                intakeTimes: medication["intakeTimes"] as? [String] ?? []
            )
        }

        let receivedHealthEntries = (
            applicationContext["healthEntries"] as? [[String: Any]] ?? []
        ).map { entry in
            WatchHealthEntry(
                type: Self.stringValue(entry["type"]),
                value: Self.stringValue(entry["value"]),
                secondaryValue: Self.stringValue(entry["secondaryValue"]),
                unit: Self.stringValue(entry["unit"]),
                measuredAt: Self.stringValue(entry["measuredAt"])
            )
        }

        let profile =
            applicationContext["emergencyProfile"] as? [String: Any] ?? [:]

        DispatchQueue.main.async { [weak self] in
            guard let self = self else {
                return
            }

            self.medications = receivedMedications
            self.healthEntries = receivedHealthEntries
            self.bloodGroup = Self.stringValue(profile["bloodGroup"])
            self.allergies = Self.stringValue(profile["allergies"])
            self.conditions = Self.stringValue(profile["conditions"])
            self.lastUpdate = Date()
        }
    }

    private static func stringValue(_ value: Any?) -> String {
        if let value = value as? String {
            return value
        }

        if let value = value as? NSNumber {
            return value.stringValue
        }

        return ""
    }
}

struct ContentView: View {
    @StateObject private var connectivity = WatchConnectivityManager()
    @Environment(\.openURL) private var openURL
    @State private var showEmergencyConfirmation = false

    var body: some View {
        NavigationStack {
            List {
                Section("Notruf") {
                    Button {
                        showEmergencyConfirmation = true
                    } label: {
                        Label("Notruf 112", systemImage: "phone.fill")
                    }
                    .tint(.red)
                }

                Section("Meine Medikamente") {
                    if connectivity.medications.isEmpty {
                        Text("Noch keine Medikamente vom iPhone empfangen.")
                            .font(.caption)
                    } else {
                        ForEach(connectivity.medications) { medication in
                            VStack(alignment: .leading, spacing: 3) {
                                Text(medication.name)
                                    .font(.headline)

                                Text(medication.dosage)
                                    .font(.caption)

                                if !medication.intakeTimes.isEmpty {
                                    Text(
                                        "Einnahme: "
                                            + medication.intakeTimes.joined(
                                                separator: ", "
                                            )
                                    )
                                    .font(.caption2)
                                }
                            }
                        }
                    }
                }

                Section("Letzte Gesundheitswerte") {
                    if connectivity.healthEntries.isEmpty {
                        Text("Noch keine Gesundheitswerte empfangen.")
                            .font(.caption)
                    } else {
                        ForEach(connectivity.healthEntries) { entry in
                            VStack(alignment: .leading, spacing: 3) {
                                Text(healthLabel(for: entry.type))
                                    .font(.headline)

                                Text(healthValue(for: entry))
                                    .font(.caption)

                                if !entry.measuredAt.isEmpty {
                                    Text(formatDate(entry.measuredAt))
                                        .font(.caption2)
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                    }
                }

                Section("Notfallpass") {
                    if connectivity.bloodGroup.isEmpty
                        && connectivity.allergies.isEmpty
                        && connectivity.conditions.isEmpty
                    {
                        Text("Noch keine Notfallpass-Daten empfangen.")
                            .font(.caption)
                    } else {
                        if !connectivity.bloodGroup.isEmpty {
                            Text("Blutgruppe: \(connectivity.bloodGroup)")
                        }

                        if !connectivity.allergies.isEmpty {
                            Text("Allergien: \(connectivity.allergies)")
                        }

                        if !connectivity.conditions.isEmpty {
                            Text("Erkrankungen: \(connectivity.conditions)")
                        }
                    }
                }

                if let lastUpdate = connectivity.lastUpdate {
                    Text(
                        "Zuletzt aktualisiert: "
                            + lastUpdate.formatted(
                                date: .omitted,
                                time: .shortened
                            )
                    )
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                } else {
                    Text("Noch keine Daten vom iPhone empfangen.")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
            }
            .navigationTitle("Curaelis")
            .alert(
                "Notruf starten?",
                isPresented: $showEmergencyConfirmation
            ) {
                Button("112 anrufen", role: .destructive) {
                    if let url = URL(string: "tel://112") {
                        openURL(url)
                    }
                }

                Button("Abbrechen", role: .cancel) {}
            } message: {
                Text("Möchtest du wirklich den Rettungsdienst anrufen?")
            }
        }
    }

    private func healthLabel(for type: String) -> String {
        switch type {
        case "bloodPressure":
            return "Blutdruck"
        case "bloodSugar":
            return "Blutzucker"
        case "pulse":
            return "Puls"
        case "weight":
            return "Gewicht"
        case "oxygen":
            return "Sauerstoffsättigung"
        case "temperature":
            return "Körpertemperatur"
        case "symptom":
            return "Beschwerde"
        default:
            return "Gesundheitswert"
        }
    }

    private func healthValue(for entry: WatchHealthEntry) -> String {
        if entry.type == "bloodPressure" {
            return "\(entry.value) / \(entry.secondaryValue) \(entry.unit)"
        }

        return "\(entry.value) \(entry.unit)"
    }

    private func formatDate(_ isoDate: String) -> String {
        guard let date = ISO8601DateFormatter().date(from: isoDate) else {
            return isoDate
        }

        return date.formatted(
            date: .abbreviated,
            time: .shortened
        )
    }
}

#Preview {
    ContentView()
}

