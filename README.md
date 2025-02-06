# HTTP Status Quest 🎮

A modern, interactive game designed to help developers, testers, and web enthusiasts master HTTP status codes through engaging gameplay.

![HTTP Status Quest](https://status-codes.john-muinde.com/screenshots/1.png)

## 🌟 Features

- **Interactive Learning**: Learn HTTP status codes through engaging gameplay and challenges
- **Real-time Player Tracking**: See how many others are learning alongside you
- **Multiple Difficulty Levels**:
  - Normal: Basic HTTP status codes
  - Hard: Advanced scenarios and less common codes
  - Expert: Real-world scenarios and special cases

- **Progress Tracking**:
  - Score system with combo multipliers
  - Performance tracking
  - Lives system
  - Real-time progress indicators

- **Game Features**:
  - Hint system for challenging questions
  - Search functionality for status codes
  - Category-based organization
  - Mobile-responsive design

## 🚀 Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Real-time Features**: Upstash Redis
- **Deployment**: Vercel

## 🎯 Learning Categories

- 1xx (Informational): Protocol-level information
- 2xx (Success): Successful operations
- 3xx (Redirection): URL redirection
- 4xx (Client Error): Client-side errors
- 5xx (Server Error): Server-side errors

## 🎮 How to Play

1. **Choose Your Difficulty**:
   - Normal: Perfect for beginners
   - Hard: For those familiar with common status codes
   - Expert: Test your knowledge with complex scenarios

2. **Game Mechanics**:
   - Read the scenario presented
   - Choose the appropriate status code
   - Build combos for higher scores
   - Use hints when stuck (costs points)
   - Complete all levels to win

3. **Scoring System**:
   - Base points for correct answers
   - Combo multipliers for consecutive correct answers
   - Point deductions for using hints
   - High score tracking

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/john-muinde/http-status-quest.git

# Navigate to project directory
cd http-status-quest

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APP_TITLE=HTTP Status Quest
KV_REST_API_URL=your-redis-url
KV_REST_API_TOKEN=your-redis-token
```

## 📱 Mobile Support

The game is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Quick navigation between questions and answers
- Compact but readable status cards
- Optimized layout for different screen sizes

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - Mozilla Developer Network
- [Vercel](https://vercel.com/) - Deployment Platform
- [Upstash](https://upstash.com/) - Redis Provider
- Community contributors and testers

## 🔗 Links

- [Live Demo](https://status-codes.john-muinde.com/)
- [Bug Report](https://github.com/john-muinde/http-status-quest/issues)
- [Feature Request](https://github.com/john-muinde/http-status-quest/issues)

---

Made with ❤️ for the developer community