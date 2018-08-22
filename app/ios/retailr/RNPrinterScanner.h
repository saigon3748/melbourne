//
//  RNPrinterScanner.h
//  goretailr
//
//  Created by Nam on 3/10/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import "ePOS2.h"
#import "ePOSEasySelect.h"

@interface RNPrinterScanner : RCTEventEmitter <RCTBridgeModule>
{
  Epos2FilterOption *filteroption_;
}
@end
