## Overview

The script reads users from the file `users.json` and finds all possible related emails from the file `sample_data.json`.

### Functions

- **`loadJson(filePath)`**: 
  - Loads and parses JSON data from a specified file path.

- **`saveJson(data, filePath)`**: 
  - Converts data to JSON format with indentation and saves it to a specified file path.

- **`getNameParts(name)`**: 
  - Splits a user's name into lowercase parts based on spaces.

- **`isRelatedEmail(nameParts, email)`**: 
  - Checks if an email is related to a user’s name parts using regular expressions to allow for variations in the email.
  - **Regular expression pattern in this function**:
    - `part.split('').join('.*')`: Creates a search pattern where each letter of the name is separated by `.*`, allowing for characters to appear between the letters. For example, `"michael"` is transformed into `"m.*i.*c.*h.*a.*e.*l"`.
    - `new RegExp(..., 'i')`: Creates a regular expression with the `i` flag, which makes the search case-insensitive.

### Results

The results of finding emails are saved in the `output.json` file. The number of emails found for each user is as follows:

- **Michael Scott**: 71
- **Dwight Schrute**: 61
- **Jim Halpert**: 62
- **Pam Beesly**: 67
- **Stanley Hudson**: 63
- **Rayan Govard**: 74

Additionally, the number of not recognized emails is:

- **Not Recognized**: 102
