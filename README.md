# payroll
Bitcoin payroll app

## Installation
```git clone https://github.com/hitsnorth/ChainPayroll
cd ChainPayroll
npm install
```
Modify file payroll.json which contains all your payroll information and looks like this:
```
{
  "payee": [
    {
      "name": "",
      "wallet": "",
      "amount": 10
    },
    {
      "name": "",
      "wallet": "",
      "amount": 10
    }
  ],
  "payor": {
    "address": "",
    "wif": ""
  },
  "webhookUrl": "",
  "channel": "#general",
  "username": "chaintellerbot"
}

```



## To Use
```node index.js```



## Tests

```
npm test
```

