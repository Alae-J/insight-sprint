# 🧠 InsightSprint

**InsightSprint** is a lightweight SaaS-style workspace that transforms raw meeting notes and scattered ideas into structured, actionable insights using local AI models. It helps teams summarize discussions, extract action items, tag ideas, and decide next steps — all in one collaborative environment.

---

## 🚀 Features

- ✍️ **Live Markdown Notepad** with real-time collaboration  
- 🤖 **AI-Powered Summaries** of meetings: Concise summaries, action items, and risk flags  
- 🧹 **Decision Assistant**: LLM suggests next steps for your project  
- 🏷 **Auto-Tagger**: Ideas are instantly categorized with AI-generated labels  
- 🔍 **Knowledge Search (RAG)**: Ask questions and get answers from past meetings  
- 🔐 **Multi-tenant Auth** with JWT & RBAC

---

## 👩‍💻 Tech Stack

| Layer       | Tools |
|-------------|-------|
| **Frontend** | React (TypeScript), Vite, Tailwind CSS, TanStack Query |
| **Backend**  | Spring Boot 3, Spring AI, Spring Security, JPA, MapStruct |
| **AI Engine** | Ollama with LLaMA 3 Instruct & Phi-3-mini |
| **Database** | PostgreSQL or MySQL |
| **DevOps**   | Docker Compose, Flyway, OpenTelemetry, Actuator |

---

## 📸 Preview

> Coming soon: screenshots and demo video.

---

## 👩‍🏫 Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Java 17+ & Maven for backend development
- Node.js + npm for frontend
- Ollama installed locally (or use via Docker)

### 1. Clone the project

```bash
git clone https://github.com/Alae-J/insight-sprint.git
cd insight-sprint
```

### 2. Spin up backend stack

```bash
cd backend
docker compose up -d
```

This starts:
- Postgres
- Ollama
- Spring Boot app

> 🧠 After containers start, pull the required model inside the Ollama container:

```bash
docker exec -it ollama ollama pull llama3

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Project Structure

```
/insight-sprint
│
├── backend/              # Spring Boot app
│   ├── src/main/java/com/insightsprint/api
│   └── Dockerfile
│
├── frontend/             # React app
│   ├── src/
│   └── tailwind.config.js
│
├── docker-compose.yml    # Dev environment
└── README.md             # This file
```

---

## 📌 Roadmap

- [ ] JWT Auth & Multi-Tenant Setup  
- [ ] AI Summarization Pipeline  
- [ ] Collaborative Notepad via WebSocket  
- [ ] Knowledge Search with pgvector  
- [ ] Admin dashboard & analytics  
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork this repository
2. Create a feature branch (`git checkout -b feat/awesome-feature`)
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/)
4. Push and create a PR

Make sure to write tests if you add a feature!

---

## 🛡 License

This project is licensed under the [MIT License](LICENSE).

---

## 📢 Contact

For questions, suggestions, or collaboration:  
📧 alaejahid8@gmail.com  
🌐 [alae-gijutsu.vercel.app](https://alae-gijutsu.vercel.app)

---

## ✨ Acknowledgements

- [Spring AI](https://spring.io/projects/spring-ai)
- [Ollama](https://ollama.com)
- [TanStack Query](https://tanstack.com/query)
- All contributors and open source maintainers!
