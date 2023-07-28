from ultralytics import YOLO

if __name__ == "__main__":
    mymodel = YOLO("yolov8n.pt")

    img = "https://c-ssl.duitang.com/uploads/item/201706/21/20170621175242_izPHJ.jpeg"

    results = mymodel.predict(
        project="result",
        source=img,
        conf=0.7,
        imgsz=640,
        save=True,
        boxes=True,
    )
