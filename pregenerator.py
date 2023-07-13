import os
import json


def get_files_in_directory(directory, ignore_dirs=[]):
    file_dict = {}

    # Iterate over all items in the directory
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)

        # Check if the item is a directory
        if os.path.isdir(item_path):
            # Skip ignored directories
            if item in ignore_dirs:
                continue

            # Recursively call the function for subdirectories
            subdirectory_files = get_files_in_directory(item_path, ignore_dirs)
            if subdirectory_files:
                file_dict.update(subdirectory_files)
        else:
            # Store the file name with the parent directory as the key
            parent_directory = os.path.dirname(item_path)
            relative_path = os.path.relpath(parent_directory, root_directory)
            if relative_path in file_dict:
                file_dict[relative_path].append(item)
            else:
                file_dict[relative_path] = [item]

    return file_dict


# Get the root directory relative to the script's location
root_directory = os.path.dirname(os.path.abspath(__file__))

# List of directories to ignore during traversal
ignore_directories = [".idea", ".git", "venv"]

# Get all files in the root directory, excluding ignored directories
file_data = get_files_in_directory(root_directory, ignore_directories)

# Serialize the dictionary to JSON
json_data = json.dumps(file_data, indent=4)

# Write the JSON data to a file
with open('file_data.json', 'w') as json_file:
    json_file.write(json_data)
