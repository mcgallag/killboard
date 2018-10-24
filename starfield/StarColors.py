# StarColors.py - one time use script
#                 extracts HTML colors from starfield.html 
#                 exports into text data file, one per line
# Michael Gallagher <mcgallag@gmail.com>

import re
pattern = '<font color="(#[0-9a-zA-Z]+)">'

infile = open("starfield.html", "r")
outfile = open("starfield.dat", "w")

for line in infile:
  mo = re.search(pattern, line)
  if mo:
    outfile.write("{0}\n".format(mo.group(1)))

infile.close()
outfile.close()
