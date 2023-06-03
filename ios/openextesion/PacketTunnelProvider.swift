//
//  PacketTunnelProvider.swift
//  openextesion
//
//  Created by mohamad on 6/4/23.
//

import Foundation
import TunnelKitOpenVPNAppExtension

class PacketTunnelProvider: OpenVPNTunnelProvider {
    override func startTunnel(options: [String: NSObject]? = nil) async throws {
        dataCountInterval = 3
        try await super.startTunnel(options: options)
    }
}

