//
//  configurator.swift
//  VPNGATE
//
//  Created by mohamad on 6/4/23.
//

import Foundation
import TunnelKitCore
import TunnelKitOpenVPN

extension OpenVPN {
    enum DemoConfiguration {
        static func make(_ title: String, appGroup: String, ovpnContent: String) -> OpenVPN.ProviderConfiguration {
            var parser = try? ConfigurationParser.parsed(fromContents: ovpnContent)

            var providerConfiguration = OpenVPN.ProviderConfiguration(title, appGroup: appGroup, configuration: parser!.configuration)
            providerConfiguration.shouldDebug = true
            providerConfiguration.masksPrivateData = false
            return providerConfiguration
        }
    }
}

