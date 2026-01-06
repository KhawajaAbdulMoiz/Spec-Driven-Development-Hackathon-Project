# 📘 **Humanoid Robotics & Physical AI — Interactive Textbook**

*A modern, open-source, interactive textbook built with Docusaurus, Speckit, and RAG AI.*

---

## 🚀 **Overview**

This project is an interactive textbook on **Humanoid Robotics** and **Physical AI**, designed for learners, developers, students, and researchers.

It explores robotics concepts such as:

* 🤖 Humanoid robot architecture
* 🧠 Physical AI, perception, and intelligence
* 🔧 Actuation & locomotion
* ⚙️ Control theory & dynamics
* 🔋 Sensors, motors, joints, and hardware
* 🛠️ Real-world robotic systems & applications
* 💬 Integrated RAG AI assistant for learning support

All content is built using **Docusaurus 3**, enhanced with **custom UI components, floating animations**, and a clean, modern landing page.

---

## 🎯 **Key Features**

### 📚 **Interactive Textbook**

* Full documentation-style learning experience
* Beautiful landing page
* Easy navigation & sidebar structure
* Clean typography & modern UI

### 🤖 **RAG Chatbot Built Into the Website**

* Users can ask questions about the textbook
* Uses Qdrant + Cohere embeddings
* Powered by a custom RAG pipeline
* Chat history support

  
### 🔧 **Spec-Driven Development (Speckit)**

* Each feature implemented with `sp.implement`
* Prompts tracked in `history/`
* Auto-generated documentation for RAG, UI, and layout changes

---

## 📂 **Project Structure**

```
📦 Humanoid Robotics Textbook
├── docusaurus.config.js        # Main configuration
├── src/
│   ├── components/
│   │   └── HomepageFeatures/  # Landing page UI
│   ├── css/                   # Global styles
│   └── pages/                 # Custom pages
├── static/
│   └── img/                   # SVG icons, robot favicon
├── docs/                      # Textbook chapters
├── blog/                      # Blog posts & updates
├── history/                   # Speckit prompt history
├── RAG_ENDPOINT_FIX_SUMMARY.md
├── RAG_CHATBOT_SUMMARY.md
├── SERVER_RUNNING.md
├── PROJECT_SUMMARY.md
└── README.md
```

---

## 🗂️ **Tech Stack**

| Area               | Tech                                    |
| ------------------ | --------------------------------------- |
| UI / Framework     | **Docusaurus 3**, React                 |
| AI / RAG           | Qdrant, Cohere, Python                  |
| Style              | CSS Modules, Custom Components          |
| Dev Workflow       | **Speckit** (spec-driven development)   |
| Package Management | **uv** (Python), node/yarn (Docusaurus) |

---

## ⚙️ **Installation & Setup**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/KhawajaAbdulMoiz/Spec-Driven-Development-Hackathon-Project
cd Spec-Driven-Development-Hackathon-Project
```

### 2️⃣ Install Node dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the development server

```bash
npm run start
```

Your site will be live at:

```
http://localhost:3000/
```

---

## 🤖 **Setting Up the RAG Chatbot**

### 1️⃣ Install Python dependencies using uv

```bash
uv add trafilatura qdrant-client cohere
```

### 2️⃣ Run your RAG server

(Example — your actual server file may differ)

```bash
uv run app.py
```

### 3️⃣ Add the endpoint in `config.js`

```js
customFields: {
  ragEndpoint: "http://localhost:8000/query",
},
```

---

## 🖼️ **Screenshots**

<img width="3440" height="1328" alt="image" src="https://github.com/user-attachments/assets/aa4993af-f69a-4a37-b887-ea8989f96ea9" />
<img width="414" height="659" alt="image" src="https://github.com/user-attachments/assets/3c004213-09cb-4c9b-95ee-94d324be4278" />
<img width="3424" height="1319" alt="image" src="https://github.com/user-attachments/assets/248a7469-1313-4c52-a94d-51dd825ee099" />
<img width="3433" height="1325" alt="image" src="https://github.com/user-attachments/assets/6064624c-ccd0-4bed-9d73-ad988591db3f" />





## 🧩 **Contributing**

We welcome contributions!

### 📝 How to contribute:

1. Fork the repo
2. Create a new branch
3. Add or update content
4. Submit a pull request

You can contribute:

* New chapters
* Diagrams & visuals
* Code examples
* UI improvements
* RAG enhancements

---

## 👤 **Author**

**Khawaja Abdul Moiz**
Creator of the Humanoid Robotics & Physical AI Textbook

📌 Socials

* GitHub: [https://github.com/KhawajaAbdulMoiz](https://github.com/KhawajaAbdulMoiz)
* LinkedIn: [https://www.linkedin.com/in/khawaja-abdul-moiz/](https://www.linkedin.com/in/khawaja-abdul-moiz/)

---

## 📄 License

This project is open-source under the **MIT License**.
You are free to use, modify, and distribute it.

---

## ⭐ Support

If you find this project helpful, star the repo!

⭐ github.com/KhawajaAbdulMoiz

If you want, I can also generate:

✅ A professional **repository banner**
✅ A **project logo**
❇️ A **contributors.md**
📘 A **docs/overview** chapter

Just ask!
