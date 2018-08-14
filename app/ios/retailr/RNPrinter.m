//
//  Printer.m
//  retailrapp
//
//  Created by Nam on 2/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNPrinter.h"
#import "React/RCTLog.h"
#import <AVFoundation/AVFoundation.h>

#define KEY_RESULT                  @"Result"
#define KEY_METHOD                  @"Method"
#define PAGE_AREA_HEIGHT    500
#define PAGE_AREA_WIDTH     500
#define FONT_A_HEIGHT       24
#define FONT_A_WIDTH        12
#define BARCODE_HEIGHT_POS  70
#define BARCODE_WIDTH_POS   110


@implementation RNPrinter

// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();

// We must explicitly expose methods otherwise JavaScript can't access anything
RCT_EXPORT_METHOD(print:(NSDictionary *) data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (![self runPrintReceiptSequence:data]) {
    resolve(@"error");
  } else {
    resolve(@"success");
  }
}


- (BOOL)runPrintReceiptSequence:(NSDictionary *) data
{
  if (![self initializeObject]) {
    return NO;
  }
  
  if (![self createReceiptData:data]) {
    [self finalizeObject];
    return NO;
  }
  
  if (![self printData:data[@"printer"]]) {
    [self finalizeObject];
    return NO;
  }
  
  return YES;
}

- (BOOL)initializeObject
{
  printer_ = [[Epos2Printer alloc] initWithPrinterSeries:EPOS2_TM_T82 lang:EPOS2_MODEL_ANK];
  
  if (printer_ == nil) {
    return NO;
  }
  
  [printer_ setReceiveEventDelegate:self];
  
  return YES;
}

- (void)finalizeObject
{
  if (printer_ == nil) {
    return;
  }
  
  [printer_ clearCommandBuffer];
  
  [printer_ setReceiveEventDelegate:nil];
  
  printer_ = nil;
}

-(BOOL)connectPrinter:(NSString *) ip
{
  int result = EPOS2_SUCCESS;
  
  if (printer_ == nil) {
    return NO;
  }
  
  result = [printer_ connect:ip timeout:EPOS2_PARAM_DEFAULT];
  if (result != EPOS2_SUCCESS) {
    return NO;
  }
  
  result = [printer_ beginTransaction];
  if (result != EPOS2_SUCCESS) {
    [printer_ disconnect];
    return NO;
  }
  
  return YES;
}

- (void)disconnectPrinter
{
  int result = EPOS2_SUCCESS;
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
  
  if (printer_ == nil) {
    return;
  }
  
  result = [printer_ endTransaction];
  if (result != EPOS2_SUCCESS) {
    [dict setObject:[NSNumber numberWithInt:result] forKey:KEY_RESULT];
    [dict setObject:@"endTransaction" forKey:KEY_METHOD];
    [self performSelectorOnMainThread:@selector(showEposErrorFromThread:) withObject:dict waitUntilDone:NO];
  }
  
  result = [printer_ disconnect];
  if (result != EPOS2_SUCCESS) {
    [dict setObject:[NSNumber numberWithInt:result] forKey:KEY_RESULT];
    [dict setObject:@"disconnect" forKey:KEY_METHOD];
    [self performSelectorOnMainThread:@selector(showEposErrorFromThread:) withObject:dict waitUntilDone:NO];
  }
  [self finalizeObject];
}

- (BOOL)createReceiptData:(NSDictionary *) data
{
    int result = EPOS2_SUCCESS;
  
    const int barcodeWidth = 2;
    const int barcodeHeight = 100;
  
    if (printer_ == nil) {
      return NO;
    }
  
    NSMutableString *textData = [[NSMutableString alloc] init];
//    UIImage *logoData = [UIImage imageNamed:@"store.png"];
//
//    if (textData == nil || logoData == nil) {
//      return NO;
//    }
  
    result = [printer_ addTextAlign:EPOS2_ALIGN_CENTER];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
//    result = [printer_ addImage:logoData x:0 y:0
//                          width:logoData.size.width
//                         height:logoData.size.height
//                          color:EPOS2_COLOR_1
//                           mode:EPOS2_MODE_MONO
//                       halftone:EPOS2_HALFTONE_DITHER
//                     brightness:EPOS2_PARAM_DEFAULT
//                       compress:EPOS2_COMPRESS_AUTO];
//
//    if (result != EPOS2_SUCCESS) {
//      return NO;
//    }
  
    // Section 1 : Store infomation
    result = [printer_ addFeedLine:1];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    if (data[@"header1"]) {
      [textData appendString:[data[@"header1"] stringByAppendingString:@"\n"]];
      
      if (data[@"header2"]) {
        [textData appendString:[data[@"header2"] stringByAppendingString:@"\n"]];
      }
      if (data[@"header3"]) {
        [textData appendString:[data[@"header3"] stringByAppendingString:@"\n"]];
      }
      if (data[@"header4"]) {
        [textData appendString:[data[@"header4"] stringByAppendingString:@"\n"]];
      }
      if (data[@"header5"]) {
        [textData appendString:[data[@"header5"] stringByAppendingString:@"\n"]];
      }
      
      [textData appendString:@"\n"];
      result = [printer_ addText:textData];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
      [textData setString:@""];
    }

    if (data[@"name"]) {
      result = [printer_ addTextSize:2 height:2];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }

      [textData appendString:[data[@"name"] stringByAppendingString:@"\n"]];
      result = [printer_ addText:textData];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
      [textData setString:@""];

      result = [printer_ addTextSize:1 height:1];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
    }
  
    [textData appendString:[data[@"order"] stringByAppendingString:@"\n"]];
    [textData appendString:@"------------------------------\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];

    for (int i = 0; i < [data[@"items"] count]; i++)
    {
      [textData appendString:[[data[@"items"] objectAtIndex:i] stringByAppendingString:@"\n"]];
    }
    [textData appendString:@"------------------------------\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];

    if (data[@"total"]) {
      [textData appendString:[data[@"subtotal"] stringByAppendingString:@"\n"]];
      [textData appendString:[data[@"discount"] stringByAppendingString:@"\n"]];
      [textData appendString:[data[@"tax"] stringByAppendingString:@"\n"]];
      result = [printer_ addText:textData];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
      [textData setString:@""];
    
      result = [printer_ addTextSize:2 height:2];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
    
      [textData appendString:[data[@"total"] stringByAppendingString:@"\n"]];
      result = [printer_ addText:textData];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
      [textData setString:@""];
    
      result = [printer_ addTextSize:1 height:1];
      if (result != EPOS2_SUCCESS) {
       return NO;
      }
    }
  
    if (data[@"cash"]) {
      [textData appendString:@"\n"];
      [textData appendString:[data[@"cash"] stringByAppendingString:@"\n"]];
      
      if (data[@"change"]) {
        [textData appendString:[data[@"change"] stringByAppendingString:@"\n"]];
      }

      result = [printer_ addText:textData];
      if (result != EPOS2_SUCCESS) {
        return NO;
      }
      [textData setString:@""];
    }
  
    if (data[@"footer1"]) {
      [textData appendString:@"\n"];
      [textData appendString:[data[@"footer1"] stringByAppendingString:@"\n"]];

      if (data[@"footer2"]) {
        [textData appendString:[data[@"footer2"] stringByAppendingString:@"\n"]];
      }
      if (data[@"footer3"]) {
        [textData appendString:[data[@"footer3"] stringByAppendingString:@"\n"]];
      }
    }

    [textData appendString:@"\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];

//    result = [printer_ addBarcode:@"01209457"
//                             type:EPOS2_BARCODE_CODE39
//                              hri:EPOS2_HRI_BELOW
//                             font:EPOS2_FONT_A
//                            width:barcodeWidth
//                           height:barcodeHeight];
//    if (result != EPOS2_SUCCESS) {
//      return NO;
//    }
  
    result = [printer_ addCut:EPOS2_CUT_FEED];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    return YES;
}

- (BOOL)printData:(NSString *) ip
{
  int result = EPOS2_SUCCESS;
  
    Epos2PrinterStatusInfo *status = nil;
  
  if (printer_ == nil) {
    return NO;
  }
  
  if (![self connectPrinter:ip]) {
    return NO;
  }
  
  status = [printer_ getStatus];

  if (![self isPrintable:status]) {
    [printer_ disconnect];
    return NO;
  }

  result = [printer_ sendData:EPOS2_PARAM_DEFAULT];
  if (result != EPOS2_SUCCESS) {
    [printer_ disconnect];
    return NO;
  }
  
  return YES;
}

- (BOOL)isPrintable:(Epos2PrinterStatusInfo *)status
{
  if (status == nil) {
    return NO;
  }
  
  if (status.connection == EPOS2_FALSE) {
    return NO;
  }
  else if (status.online == EPOS2_FALSE) {
    return NO;
  }
  else {
    ;//print available
  }
  
  return YES;
}

@end
