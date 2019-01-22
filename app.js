var Web3 = require('web3');
var web3 = new Web3(ethereum);

var customerContract = new web3.eth.Contract(abi, contractAddress);
ethereum.enable();
initialize();

function initialize() {
  web3.eth.getAccounts().then(response => {
    web3.eth.defaultAccount = response[0];
    isUser();
    isAdmin();
    addEventListeners();
    populateLogs();
  });
}

function addEventListeners() {
  document.getElementById('registration').addEventListener('click', event => {
    event.preventDefault();
    createCustomer();
  });

  document.getElementById('getById').addEventListener('click', event => {
    event.preventDefault();
    getCustomer();
  });
}

function createCustomer() {
  var id = document.getElementById('id').value;
  var name = document.getElementById('name').value;
  var social = document.getElementById('social').value;

  var dob = document.getElementById('dob').value;
  dob = dob.split("-");
  dob = dob[1] + "/" + dob[2] + "/" + dob[0];
  dob = new Date(dob).getTime();

  var txn = customerContract.methods.createCustomer(id, name, dob, social);
  txn.send({from: web3.eth.defaultAccount})
}

function getCustomer() {
  var id = document.getElementById('customerId').value;
  var txn = customerContract.methods.getCustomerById(id);

  txn.call().then(response => {
    document.getElementById('customer-id').innerHTML = 'ID: '
    document.getElementById('customer-id-val').innerHTML = response.idRet
    document.getElementById('customer-name').innerHTML = 'Name: '
    document.getElementById('customer-name-val').innerHTML = response.name
    document.getElementById('customer-dob').innerHTML = 'DOB: '
    document.getElementById('customer-dob-val').innerHTML = new Date(parseInt(response.dateOfBirth.substring(0,10)))
    document.getElementById('customer-social').innerHTML = 'SSN: '
    document.getElementById('customer-social-val').innerHTML = response.social
  });
}

function populateLogs() {
  customerContract.getPastEvents('allEvents', response => {
    document.getElementsByClassName('logs')[0].innerHTML = response;
  });
}

function isUser() {
  customerContract.methods.isUser(web3.eth.defaultAccount, 'genAccess')
    .call({from: web3.eth.defaultAccount})
    .then(response => {
      if (response) {
        document.getElementsByClassName('user')[0].style.display = 'block';
      }
    });
}

function isAdmin() {
  customerContract.methods.isOwner()
    .call({from: web3.eth.defaultAccount})
    .then(response => {
      if (response) {
        document.getElementsByClassName('admin')[0].style.display = 'block';
      }
    });
}

var contractAddress = '0xff5c6bbd2e8d169f4e6cc3c090b470cfbefa4981';
var abi = [
  {
    "constant": false,
    "inputs": [],
    "name": "ACLContract",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "addUser",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "name": "social",
        "type": "uint256"
      }
    ],
    "name": "createCustomer",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "i",
        "type": "uint256"
      }
    ],
    "name": "deleteIthUser",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "candidate",
        "type": "address"
      },
      {
        "name": "method",
        "type": "string"
      }
    ],
    "name": "isUser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "updateCustomer",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "status",
        "type": "uint256"
      }
    ],
    "name": "updateCustomerStatus",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "by",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "accessTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "method",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "desc",
        "type": "string"
      }
    ],
    "name": "LogAccess",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getCustomer",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "name": "social",
        "type": "uint256"
      },
      {
        "name": "status",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getCustomerById",
    "outputs": [
      {
        "name": "idRet",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dateOfBirth",
        "type": "uint256"
      },
      {
        "name": "social",
        "type": "uint256"
      },
      {
        "name": "status",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "i",
        "type": "uint256"
      }
    ],
    "name": "getIthUser",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUserCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  }
];
