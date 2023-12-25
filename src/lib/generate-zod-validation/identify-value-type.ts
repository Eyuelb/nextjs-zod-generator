export function identifyValueType(value: any): string {
    if (typeof value === 'string') {
      if (/^\d{10}$/.test(value)) {
        return 'PhoneNumber';
      } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        return 'Email';
      } else if (/^\d+(\.\d{1,2})?$/.test(value)) {
        return 'Money';
      } else if (/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(value)) {
        return 'Uid';
      } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
        return 'Url';
      }
      else if (value === '') {
        return 'EmptyString';
      } else {
        return 'UnknownString';
      }
    } else if (typeof value === 'number') {
      return 'Number';
    } else if (typeof value === 'boolean') {
      return 'Boolean';
    } else if (Array.isArray(value)) {
      return 'Array';
    } else if (typeof value === 'object') {
      return 'Object';
    } else {
      return 'UnknownType';
    }
  }
  
//   // Example usage
//   const phoneNumber = '1234567890';
//   const email = 'user@example.com';
//   const moneyValue = '123.45';
//   const uidValue = 'abc12345-1234-abcd-5678-abcd12345678';
//   const age = 25;
//   const isActive = true;
//   const dataObject = { key: 'value' };
//   const unknownValue = new Date();
  
//   console.log(identifyValueType(phoneNumber)); // Output: PhoneNumber
//   console.log(identifyValueType(email)); // Output: Email
//   console.log(identifyValueType(moneyValue)); // Output: Money
//   console.log(identifyValueType(uidValue)); // Output: Uid
//   console.log(identifyValueType(age)); // Output: Number
//   console.log(identifyValueType(isActive)); // Output: Boolean
//   console.log(identifyValueType(dataObject)); // Output: Object
//   console.log(identifyValueType(unknownValue)); // Output: UnknownType
  