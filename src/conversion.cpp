#include <node.h>
#include <v8.h>
#include <map>
#include <string>
#include "flexinput.h"

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Array;
using v8::Context;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.Length() < 2) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
    return;
  }

  if (!args[0]->IsObject() || !args[1]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Arguments must be an object and a string").ToLocalChecked()));
    return;
  }

  Local<Object> obj = args[0]->ToObject(context).ToLocalChecked();
  Local<Array> propertyNames = obj->GetOwnPropertyNames(context).ToLocalChecked();

  std::map<std::string, std::string> input_data;

  for (unsigned int i = 0; i < propertyNames->Length(); i++) {
    Local<Value> key = propertyNames->Get(context, i).ToLocalChecked();
    Local<Value> value = obj->Get(context, key).ToLocalChecked();

    if (!value->IsString()) {
      isolate->ThrowException(Exception::TypeError(
          String::NewFromUtf8(isolate, "All properties must be strings").ToLocalChecked()));
      return;
    }

    v8::String::Utf8Value keyStr(isolate, key);
    v8::String::Utf8Value valueStr(isolate, value);

    std::string cppKey(*keyStr);
    std::string cppValue(*valueStr);

    input_data[cppKey] = cppValue;
  }

  Local<Value> additionalStrVal = args[1];
  v8::String::Utf8Value additionalStr(isolate, additionalStrVal);
  std::string cppAdditionalStr(*additionalStr);

  // Call function
  std::string result = process_input(input_data, cppAdditionalStr);

  args.GetReturnValue().Set(String::NewFromUtf8(isolate, result.c_str()).ToLocalChecked());
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "map", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo
