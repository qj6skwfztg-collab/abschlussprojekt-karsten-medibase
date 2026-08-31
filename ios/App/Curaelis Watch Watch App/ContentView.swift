import SwiftUI

struct ContentView: View {
    @Environment(\.openURL) private var openURL
    @State private var showEmergencyConfirmation = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 12) {
                    Image(systemName: "cross.case.fill")
                        .font(.system(size: 32))
                        .foregroundStyle(.teal)

                    Text("Curaelis")
                        .font(.headline)

                    Text("Schnellhilfe am Handgelenk")
                        .font(.caption)
                        .multilineTextAlignment(.center)

                    Button {
                        showEmergencyConfirmation = true
                    } label: {
                        Label("Notruf 112", systemImage: "phone.fill")
                            .frame(maxWidth: .infinity)
                    }
                    .tint(.red)

                    NavigationLink {
                        WatchInfoView(
                            title: "Meine Medikamente",
                            message: "Deine persönlichen Medikamente werden später mit der iPhone-App synchronisiert."
                        )
                    } label: {
                        Label("Medikamente", systemImage: "pills.fill")
                    }

                    NavigationLink {
                        WatchInfoView(
                            title: "Gesundheitstagebuch",
                            message: "Deine aktuellen Gesundheitswerte werden später auf der Watch angezeigt."
                        )
                    } label: {
                        Label("Gesundheit", systemImage: "chart.xyaxis.line")
                    }
                }
                .padding()
            }
            .navigationTitle("Curaelis")
            .alert("Notruf starten?", isPresented: $showEmergencyConfirmation) {
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
}

struct WatchInfoView: View {
    let title: String
    let message: String

    var body: some View {
        ScrollView {
            VStack(spacing: 12) {
                Text(title)
                    .font(.headline)

                Text(message)
                    .font(.caption)
                    .multilineTextAlignment(.center)
            }
            .padding()
        }
        .navigationTitle(title)
    }
}

#Preview {
    ContentView()
}
