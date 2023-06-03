//
//  connectController.swift
//  VPNGATE
//
//  Created by mohamad on 6/4/23.
//


import TunnelKitCore
import TunnelKitManager
import TunnelKitOpenVPN
import UIKit

private let appGroup = "group.ios.theta.vpn.app"

private let tunnelIdentifier = "ios.theta.vpn.app.thetaextension"

class OpenVPNController {


   private let vpn = NetworkExtensionVPN()

   public var vpnStatus: VPNStatus = .disconnected


   private var cfg: OpenVPN.ProviderConfiguration?

 private var ovpnContent : String

 
 init(ovpnContent:String ) {

   self.ovpnContent = ovpnContent

       NotificationCenter.default.addObserver(
           self,
           selector: #selector(VPNStatusDidChange(notification:)),
           name: VPNNotification.didChangeStatus,
           object: nil
       )
       NotificationCenter.default.addObserver(
           self,
           selector: #selector(VPNDidFail(notification:)),
           name: VPNNotification.didFail,
           object: nil
       )


       Task {
           await vpn.prepare()
       }
   }
 


   func connect(ovpnContent:String) {
     self.ovpnContent = ovpnContent
       cfg = OpenVPN.DemoConfiguration.make(
           "ThetaVPN",
           appGroup: appGroup,
           ovpnContent: ovpnContent
       )


     
       Task {
         let extra = NetworkExtensionExtra()
           try await vpn.reconnect(
               tunnelIdentifier,
               configuration: cfg!,
               extra: extra,
               after: .seconds(1)
           )
      
         
       }
   }

   func disconnect() {
       Task {
           await vpn.disconnect()
       }
   }
 
 func disable() {
     Task {
       let extra = NetworkExtensionExtra()
       cfg = OpenVPN.DemoConfiguration.make(
         "ThetaVPN",
           appGroup: "not.allowed",
           ovpnContent: self.ovpnContent
       )
       try await vpn.install (
         tunnelIdentifier,
             configuration: cfg!,
             extra: extra

         )
     }
 }

 func install(ovpnContent:String) {
   self.ovpnContent = ovpnContent


     Task {
       let extra = NetworkExtensionExtra()
       cfg = OpenVPN.DemoConfiguration.make(
         "ThetaVPN",
           appGroup: appGroup,
           ovpnContent: self.ovpnContent
       )
       try await vpn.install (
         tunnelIdentifier,
             configuration: cfg!,
             extra: extra

         )
     }
 }
 
 func uninstall( ) {
     Task {
        await vpn.uninstall()
     }
 }
 


   @objc private func VPNStatusDidChange(notification: Notification) {
       vpnStatus = notification.vpnStatus
       print("VPNStatusDidChange: \(vpnStatus)")
     ConnectionStatusEmitter.emitter.sendEvent(withName: "onChange", body: "\(vpnStatus)")

   }

   @objc private func VPNDidFail(notification: Notification) {
       print("VPNStatusDidFail: \(notification.vpnError.localizedDescription)")
     ConnectionStatusEmitter.emitter.sendEvent(withName: "onFailure", body: notification.vpnError.localizedDescription)

   }
}

