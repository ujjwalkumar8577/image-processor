# Image Processing System (Node.js + MongoDB)

## Overview
This project is a backend system that processes image data from CSV files asynchronously. The system:
✅ Accepts a CSV file containing product names and image URLs.
✅ Validates and stores the data in **MongoDB**.
✅ Processes images by compressing them **by 50%**.
✅ Saves processed images and their URLs.
✅ Provides an **API to check processing status**.
✅ Supports **webhook notifications** when processing is complete.

---

## Tech Stack
**Backend:** Node.js, Express
**Database:** MongoDB
**Image Processing:** Sharp
**File Handling:** Multer
**Make HTTP Requests:** Axios
**CSV Parsing:** csv-parser
**API Testing:** Postman

---

## Visual Diagram
![Visual Diagram](visual_diagram.png)
