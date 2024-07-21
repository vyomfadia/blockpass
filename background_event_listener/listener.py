import web3

w3 = web3.Web3(web3.WebsocketProvider(f"ws://127.0.0.1:9944"))

CONTRACT_ADDRESS = "0x527FC4060Ac7Bf9Cd19608EDEeE8f09063A16cd4"

block = w3.eth.get_blo