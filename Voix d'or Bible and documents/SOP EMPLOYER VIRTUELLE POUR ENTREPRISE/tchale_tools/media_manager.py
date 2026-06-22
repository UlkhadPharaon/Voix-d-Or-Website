import os
import shutil
import argparse

MEDIA_LIB = "media_library"

def save_media(cache_path, new_name):
    if not os.path.exists(MEDIA_LIB):
        os.makedirs(MEDIA_LIB)
    if not os.path.exists(cache_path):
        print(f"Error: {cache_path} not found.")
        return
    dest = os.path.join(MEDIA_LIB, new_name)
    shutil.copy(cache_path, dest)
    print(f"Media saved to {dest}")

def list_media():
    if not os.path.exists(MEDIA_LIB) or not os.listdir(MEDIA_LIB):
        print("Media library is empty.")
        return
    print("=== Media Library ===")
    for f in os.listdir(MEDIA_LIB):
        print(f"- {os.path.join(MEDIA_LIB, f)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["save", "list"])
    parser.add_argument("--cache_path", help="Path to cached file")
    parser.add_argument("--new_name", help="Destination file name")
    args = parser.parse_args()

    if args.action == "save" and args.cache_path and args.new_name:
        save_media(args.cache_path, args.new_name)
    elif args.action == "list":
        list_media()
