//
//  Printer.h
//  retailrapp
//
//  Created by Nam on 2/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "ePOS2.h"
#import "ePOSEasySelect.h"

@interface RNPrinter : NSObject <RCTBridgeModule>
{
  Epos2Printer *printer_;
}
@end
