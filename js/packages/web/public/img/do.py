import os
import shutil
import random
import json
count = 0
for root, dirs, files in os.walk(".", topdown=False):
   
   for name in files:
      if ('png' in name):
          shutil.move(os.path.join(root, name), str(count) + '.png')
          ran1 = random.randint(0,100) - 50
          ran2 = random.randint(0,100) - 50
          ran3 = random.randint(0,100) - 50
          
          ajson = """{  "name": "CatMarketCap",  "symbol": "CMC",
      "description": "Hi :)    You remember #bloot #bloots,..?Introducing #CatMarketCaps:1. Visit https://endgamify.ar2. Press the button. Or refresh3. There's a price, 0-1 $SOL * the number of days since launch 4. There's % royalties, 0-100%.5. You get a % creator share, 0-100%.6. The NFT has random stats. Click 'Wat?' in the navbar.","seller_fee_basis_points": 0,"image": "image.png", "attributes": [{"trait_type": "Cat’s Longevities","value": \"""" + str(ran1) + """\" },{"trait_type": "Market Charms","value": \"""" + str(ran2) + """\"},{"trait_type": "Capital Efficiencies","value": \"""" + str(ran3) + """\"    }],"collection": {"name": "CatMarketCap","family": "reg3" },"properties": {"category": "loot"}}"""
          with open(str(count) + '.json', 'w') as f:
             f.write((ajson))
          count = count + 1