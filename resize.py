import logging
import threading
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Process
import cv2
import os


def is_vertical(h, w):
    if h / w >= 1:
        return True
    return False


def writework(param):
    height = 1600
    direntry = os.scandir(param)
    print("start ",param)
    for d in direntry:
        td = os.scandir(d)
        for f in td:
            print("读取", os.path.join(os.getcwd(), param, d.name, f.name))
            img = cv2.imread(os.path.join(os.getcwd(), param, d.name, f.name), cv2.IMREAD_UNCHANGED)
            print('读取尺寸', img.shape, is_vertical(img.shape[0], img.shape[1]))
            if is_vertical(img.shape[0], img.shape[1]):
                width = int(height / img.shape[0] * img.shape[1])
                resized = cv2.resize(img, (width, height), interpolation=cv2.INTER_AREA)
                print('修改后', resized.shape)
                cv2.imwrite(os.path.join(os.getcwd(), param, d.name, f.name), resized)
            else:
                width = int(height / img.shape[1] * img.shape[0])
                resized = cv2.resize(img, (height, width), interpolation=cv2.INTER_AREA)
                print('修改后', resized.shape)
                cv2.imwrite(os.path.join(os.getcwd(), param, d.name, f.name), resized)


if __name__ == "__main__":
    leaf = "leaf/"
    tree = "tree/"
    fruit = "fruit/"
    flower = "flower/"

    with ThreadPoolExecutor() as pool:
        results = pool.map(writework, (os.path.join(leaf, "test"), os.path.join(leaf, "val"), os.path.join(leaf, "train"),
                                       os.path.join(tree, "test"),os.path.join(tree, "val"),os.path.join(tree, "train"),
                                       os.path.join(fruit, "test"),os.path.join(fruit, "val"),os.path.join(fruit, "train"),
                                       os.path.join(flower, "test"),os.path.join(flower, "val"),os.path.join(flower, "train")))
        for r in results:
            print(r)


    # cv2.imwrite("new_" + f, resized)
    # cv2.imshow("Resized image",resized)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
