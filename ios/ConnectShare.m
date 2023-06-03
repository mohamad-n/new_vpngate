//
//  ConnectShare.m
//  VPNGATE
//
//  Created by mohamad on 6/4/23.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ConnectShare, NSObject)

RCT_EXTERN_METHOD(stablishConnection:(NSDictionary *)options)
RCT_EXTERN_METHOD(connect:(NSDictionary *)options)
RCT_EXTERN_METHOD(disconnect )
RCT_EXTERN_METHOD(disable )
RCT_EXTERN_METHOD(getCurrentState )
RCT_EXTERN_METHOD(removeConnection )


@end

@interface RCT_EXTERN_MODULE(ConnectionStatusEmitter, RCTEventEmitter)
  RCT_EXTERN_METHOD(supportedEvents)
@end
