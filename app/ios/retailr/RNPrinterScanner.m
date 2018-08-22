//
//  RNPrinterScanner.m
//  goretailr
//
//  Created by Nam on 3/10/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNPrinterScanner.h"

@interface RNPrinterScanner()<RCTBridgeModule, Epos2DiscoveryDelegate>
@end

@implementation RNPrinterScanner

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(scan,
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
  int result = EPOS2_SUCCESS;
  
  filteroption_  = [[Epos2FilterOption alloc] init];
  [filteroption_ setDeviceType:EPOS2_TYPE_PRINTER];
  
  result = [Epos2Discovery start:filteroption_ delegate:self];
  if (result != EPOS2_SUCCESS) {
    resolve(@"error");
  } else {
    resolve(@"success");
  }
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventPrinterFound"];
}

-(void)stopObserving
{
  [Epos2Discovery stop];
//  while (YES) {
//    result = [Epos2Discovery stop];
//
//    if (result != EPOS2_ERR_PROCESSING) {
//      if (result == EPOS2_SUCCESS) {
//        [printers_ setObject:@"name" forKey:@"target"];
//        resolve(printers_);
//        break;
//      }
//      else {
//        resolve(@"error");
//        return;
//      }
//    }
//  }
}

- (void) onDiscovery:(Epos2DeviceInfo *)deviceInfo
{
  NSString *name = [deviceInfo getDeviceName];
  NSString *target = [deviceInfo getTarget];
  [self sendEventWithName:@"EventPrinterFound" body:@{@"name": name, @"target": target}];
}

@end