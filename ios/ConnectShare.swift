//
//  ConnectShare.swift
//  VPNGATE
//
//  Created by mohamad on 6/4/23.
//


import Foundation
import UIKit
import React
 

@objc(ConnectShare)
class ConnectShare : NSObject {
  
  private let vpn = OpenVPNController(ovpnContent: "")

  @objc static func requiresMainQueueSetup() -> Bool {
      return false
  }


  @objc func removeConnection() -> Void {
    self._uninstall()
  }
  
  // Reference to use main thread
  @objc func stablishConnection(_ options: NSDictionary) -> Void {
    self._stablishConnection(options: options)

  }

  @objc func connect(_ options: NSDictionary) -> Void {
   
    DispatchQueue.main.async {
      self._connect(options: options)
    }
  }
  
  @objc func disconnect() -> Void {
   
    DispatchQueue.main.async {
      self._disconnect()
    }
  }
  
  @objc func disable() -> Void {
   
    DispatchQueue.main.async {
      self._disable()
    }
  }
  
  @objc func getCurrentState() -> Void {
   
    DispatchQueue.main.async {
      self._getCurrentState()
    }
  }
  
 
  
 
  func _stablishConnection(options: NSDictionary) -> Void {
    var items = [String]()
    let message = RCTConvert.nsString(options["message"])

    if message != "" {
      items.append(message!)
    }

    if items.count == 0 {
      print("No `message` to share!")
      return
    }

    // print(items[0])
    vpn.install(ovpnContent: items[0])

 
  }
  
  
  
  func _connect(options: NSDictionary) -> Void {
    
  
    var items = [String]()
    let message = RCTConvert.nsString(options["message"])

    if message != "" {
      items.append(message!)
    }

    if items.count == 0 {
      print("No `message` to share!")
      return
    }
//    print("profile : ",items[0])
    vpn.connect(ovpnContent: items[0])


  }
  
  func _disconnect( ) -> Void {
    vpn.disconnect()
  }
  
  
  func _disable( ) -> Void {
    vpn.disable()
  }
  
  func _uninstall( ) -> Void {
    vpn.uninstall()
  }
  func _getCurrentState( ) -> Void {
    ConnectionStatusEmitter.emitter.sendEvent(withName: "onChange", body: "\(vpn.vpnStatus)")
  }
  
}

@objc(ConnectionStatusEmitter)
open class ConnectionStatusEmitter: RCTEventEmitter {
  @objc public override static func requiresMainQueueSetup() -> Bool {
      return false
  }

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    ConnectionStatusEmitter.emitter = self
 

  }

  open override func supportedEvents() -> [String] {
    ["onChange", "onFailure"]      // etc.
  }
}

